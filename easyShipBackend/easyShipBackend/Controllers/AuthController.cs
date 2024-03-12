using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using easyShipBackend.Models;
using easyShipBackend.Services;
using Microsoft.EntityFrameworkCore;
using Azure.Core;

namespace easyShipBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
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
            return Ok(_userService.GetMyName());

            //var userName = User?.Identity?.Name;
            //var roleClaims = User?.FindAll(ClaimTypes.Role);
            //var roles = roleClaims?.Select(c => c.Value).ToList();
            //var roles2 = User?.Claims
            //    .Where(c => c.Type == ClaimTypes.Role)
            //    .Select(c => c.Value)
            //    .ToList();
            //return Ok(new { userName, roles, roles2 });
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
                    Email = request.Email, // Assign the Email field
                    Storename = request.Storename, // Assign the Storename field
                    Role = request.Role
                };

                _apiContext.User.Add(newUser);
                _apiContext.SaveChanges();

                return Ok(newUser);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Error occurred while registering the user");
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

                string token = CreateToken(userInDB);
                return Ok(token);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine(ex.Message);
                return StatusCode(400, "Error occurred during login.");
            }
        }

        private string CreateToken(User user)
        {
            // Create claims for username and roles
            List<Claim> claims = new List<Claim> {
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Role, "Admin"),
        new Claim(ClaimTypes.Role, "User"),
    };

            // Add custom claims for additional data (e.g., email, storename)
            claims.Add(new Claim("Email", user.Email));
            claims.Add(new Claim("Storename", user.Storename));
            claims.Add(new Claim("Username", user.Username));
            claims.Add(new Claim("Role", user.Role));



            // Get the token secret key from configuration
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            // Create signing credentials using the secret key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // Create JWT token with claims, expiration date, and signing credentials
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            // Write the token as a string
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }



    }
}
