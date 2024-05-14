using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Net.Mail;
using easyShipBackend.Models;

namespace easyShipBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelpRequestController : ControllerBase
    {
        private readonly ApiContext _apiContext;

        public HelpRequestController(ApiContext apiContext)
        {
            _apiContext = apiContext;
        }

        [HttpPost("submit")]
        public ActionResult SubmitHelpRequest(HelpRequest helpRequest)
        {
            try
            {
                helpRequest.Time = DateTime.Now;
                helpRequest.Status = "Pending"; // Set initial status

                _apiContext.HelpRequest.Add(helpRequest);
                _apiContext.SaveChanges();

                // Send email to admin
                SendHelpRequestEmail(helpRequest);

                return Ok("Help request submitted successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error submitting help request: " + ex.Message);
                return StatusCode(500, "Error occurred while submitting help request");
            }
        }

        private void SendHelpRequestEmail(HelpRequest helpRequest)
        {
            // Set up the email message
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("hassanrana72b@gmail.com"); // Replace with your admin email
            mail.To.Add("hassanrana72b@gmail.com"); // Replace with your admin email
            mail.Subject = "New Help Request";
            mail.IsBodyHtml = true;
            mail.Body = $"<html><body><h1>New Help Request</h1><p>Username: {helpRequest.Username}</p><p>Email: {helpRequest.Email}</p><p>Message: {helpRequest.Message}</p><p>Storename: {helpRequest.Storename}</p><p>Status: {helpRequest.Status}</p><p>Time: {helpRequest.Time}</p></body></html>";

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
                Console.WriteLine("Help request email sent to admin successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending help request email to admin: " + ex.Message);
            }
        }
        [HttpGet("all")]
        public ActionResult GetAllHelpRequests()
        {
            try
            {
                var helpRequests = _apiContext.HelpRequest.ToList();
                return Ok(helpRequests);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error retrieving help requests: " + ex.Message);
                return StatusCode(500, "Error occurred while retrieving help requests");
            }
        }
        [HttpPut("updateStatus/{id}")]
        public IActionResult UpdateStatus(int id, [FromBody] UpdateStatusRequest request)
        {
            var helpRequest = _apiContext.HelpRequest.Find(id);
            if (helpRequest == null)
            {
                return NotFound();
            }

            helpRequest.Status = request.Status;

            try
            {
                _apiContext.SaveChanges();

                // Send email to the user
                SendUserEmail(helpRequest);

                return Ok(helpRequest);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error updating help request status: " + ex.Message);
                return StatusCode(500, "Error occurred while updating help request status");
            }
        }

        private void SendUserEmail(HelpRequest helpRequest)
        {
            // Set up the email message
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("hassanrana72b@gmail.com"); // Replace with your admin email
            mail.To.Add(helpRequest.Email); // Send email to the user
            mail.Subject = "Your Help Request is Fixed";
            mail.IsBodyHtml = true;
            mail.Body = $"<html><body><h1>Your Help Request is Fixed</h1><p>Username: {helpRequest.Username}</p><p>Email: {helpRequest.Email}</p><p>Message: {helpRequest.Message}</p><p>Storename: {helpRequest.Storename}</p><p>Status: {helpRequest.Status}</p><p>Time: {helpRequest.Time}</p></body></html>";

            // Set up the SMTP client
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
            smtpClient.Port = 587;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential("hassanrana72b@gmail.com", "jtbt mimr xbzy peaq"); // Replace with your admin email credentials
            smtpClient.EnableSsl = true;

            try
            {
                // Send the email
                smtpClient.Send(mail);
                Console.WriteLine("Help request email sent to user successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending help request email to user: " + ex.Message);
            }
        }


    }
}
