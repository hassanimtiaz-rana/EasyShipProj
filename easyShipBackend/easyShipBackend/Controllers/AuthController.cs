using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using easyShipBackend.Models;
using easyShipBackend.Services;

namespace easyShipBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly ApiContext _apiContext;

        public AuthController(IConfiguration configuration, IUserService userService, ApiContext apiContext)
        {
            _configuration = configuration;
            _userService = userService;
            _apiContext = apiContext;
        }

        [HttpGet, Authorize]
        public ActionResult<string> GetMyName()
        {
            var userName = User?.Identity?.Name;
            var roles = User?.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            return Ok(new { userName, roles });
        }

        [HttpPost("register")]
        public ActionResult<User> Register(UserDto request)
        {
            try
            {
                var existingUser = _apiContext.User.FirstOrDefault(u => u.Username == request.Username);
                if (existingUser != null)
                {
                    return BadRequest("Username already exists");
                }

                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

                var newUser = new User
                {
                    PasswordHash = passwordHash,
                    Username = request.Username,
                    Email = request.Email,
                    Storename = request.Storename,
                    Role = request.Role,
                    Verified = false, // Set Verified to false initially
                    VerificationToken = Guid.NewGuid().ToString(), // Generate verification token
                    ResetPasswordToken = "No reset Request "
                   
                };

                _apiContext.User.Add(newUser);
                _apiContext.SaveChanges();

                // Send the registration email with verification link
                SendRegistrationEmail(newUser);

                return Ok(newUser);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error during registration: " + ex.Message);
                return StatusCode(500, "Error occurred while registering the user");
            }
        }

        private void SendRegistrationEmail(User user)
        {
            // Construct the verification link
            string verificationLink = $"{Request.Scheme}://{Request.Host}/api/auth/verify-email?token={user.VerificationToken}";

            // Set up the email message
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("hassanrana72b@gmail.com");
            mail.To.Add(user.Email);
            mail.Subject = "Welcome to Our Platform - Verify Your Email";
            mail.IsBodyHtml = true;
            mail.Body = $"<html><body><h1>Dear {user.Username},</h1><p>Your account has been successfully created.</p><p>Please click <a href=\"{verificationLink}\">here</a> to verify your email.</p></body></html>";

            // Set up the SMTP client
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
            smtpClient.Port = 587;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential("hassanrana72b@gmail.com", "jtbt mimr xbzy peaq");
            smtpClient.EnableSsl = true;

            try
            {
                // Send the email
                smtpClient.Send(mail);
                Console.WriteLine("Registration email sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending registration email: " + ex.Message);
            }
        }

        [HttpGet("verify-email")]
        public ActionResult VerifyEmail(string token)
        {
            var user = _apiContext.User.FirstOrDefault(u => u.VerificationToken == token);
            if (user == null)
            {
                return BadRequest("Invalid verification token");
            }

            if (user.Verified)
            {
                return Ok("Email already verified");
            }

            // Mark the user as verified and update the verification token
            user.Verified = true;
            user.VerificationToken = "Already Verified";

            try
            {
                _apiContext.SaveChanges();
                return Ok("Email verified successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error saving changes to the database: " + ex.Message);
                return StatusCode(500, "Error occurred during email verification");
            }
        }

        [HttpPost("login")]
        public ActionResult<User> Login(UserDto request)
        {
            try
            {
                var userInDB = _apiContext.User.SingleOrDefault(u => u.Username == request.Username);

                if (userInDB == null)
                {
                    return BadRequest("User not found.");
                }

                if (!BCrypt.Net.BCrypt.Verify(request.Password, userInDB.PasswordHash))
                {
                    return BadRequest("Wrong password.");
                }

                // Check if the user's email is verified
                if (!userInDB.Verified)
                {
                    return BadRequest("Email not verified. Please verify your email.");
                }

                string token = CreateToken(userInDB);
                return Ok(token);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error during login: " + ex.Message);
                return StatusCode(400, "Error occurred during login.");
            }
        }

        [HttpPost("forgot-password")]
        public ActionResult ForgotPassword(string email)
        {
            try
            {
                var user = _apiContext.User.FirstOrDefault(u => u.Email == email);
                if (user == null)
                {
                    return BadRequest("User not found.");
                }

                // Generate a new password reset token and set it for the user
                string resetToken = Guid.NewGuid().ToString();
                user.ResetPasswordToken = resetToken;

                _apiContext.SaveChanges();

                // Send the password reset email
                SendPasswordResetEmail(user);

                return Ok("Password reset email sent successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error during password reset: " + ex.Message);
                return StatusCode(500, "Error occurred during password reset.");
            }
        }


        [HttpPost("reset-password")]
        public ActionResult ResetPassword(string email, string newPassword, string resetToken)
        {
            try
            {
                var user = _apiContext.User.FirstOrDefault(u => u.Email == email && u.ResetPasswordToken == resetToken);
                if (user == null)
                {
                    return BadRequest("Invalid email or reset token");
                }

                // Update the user's password
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
                user.PasswordHash = passwordHash;
                user.ResetPasswordToken = "No reset Request"; // Clear the reset token

                _apiContext.SaveChanges();

                return Ok("Password reset successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error resetting password: " + ex.Message);
                return StatusCode(500, "Error occurred during password reset.");
            }
        }

        private void SendPasswordResetEmail(User user)
        {
            // Construct the password reset link for the frontend
            string frontendUrl = "http://localhost:5173"; // Update this with your actual frontend URL
            string resetLink = $"{frontendUrl}/api/auth/reset-password/{user.Email}/{user.ResetPasswordToken}";

            // Set up the email message
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("hassanrana72b@gmail.com");
            mail.To.Add(user.Email);
            mail.Subject = "Reset Your Password";
            mail.IsBodyHtml = true;
            mail.Body = $"<html><body><h1>Dear {user.Username},</h1><p>You have requested to reset your password.</p><p>Please click <a href=\"{resetLink}\">here</a> to reset your password.</p></body></html>";

            // Set up the SMTP client
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
            smtpClient.Port = 587;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential("hassanrana72b@gmail.com", "jtbt mimr xbzy peaq");
            smtpClient.EnableSsl = true;

            try
            {
                // Send the email
                smtpClient.Send(mail);
                Console.WriteLine("Password reset email sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending password reset email: " + ex.Message);
            }
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("Email", user.Email),
                new Claim("Storename", user.Storename),
                new Claim("Role", user.Role),
                new Claim("Username", user.Username),


            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AppSettings:Token"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
