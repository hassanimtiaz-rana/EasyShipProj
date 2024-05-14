using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using easyShipBackend.Models;
using System.Globalization;

namespace easyShipBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApiContext _apiContext;

        public UserController(ApiContext apiContext)
        {
            _apiContext = apiContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _apiContext.User.ToListAsync();
            if (users == null || users.Count == 0)
            {
                return NotFound(); // or appropriate response if no data found
            }

            return users;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _apiContext.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            // Check if the same username exists
            var existingUser = await _apiContext.User.FirstOrDefaultAsync(u => u.Username == user.Username);


            if (existingUser != null)
            {
                // Return a conflict response indicating that the username already exists
                return Conflict("The username already exists.");
            }
            string formattedDate = DateTime.UtcNow.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
            user.CreateAT = DateTime.ParseExact(formattedDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
            _apiContext.User.Add(user);
            await _apiContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }
        [HttpPut("UpdateRole")]
        public async Task<IActionResult> UpdateRole([FromBody] UpdateRole request)
        {
            var product = await _apiContext.User.FindAsync(request.Id);
            if (product == null)
            {
                return NotFound();
            }

            // Ensure quantity is non-negative
            if (request.Role == "")
            {
                return BadRequest("User can't be a Null");
            }

         

            product.Role = request.Role; // Subtract the quantity

            try
            {
                await _apiContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500); // Handle concurrency exception appropriately
            }

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            _apiContext.Entry(user).State = EntityState.Modified;
            try
            {
                await _apiContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }

       

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _apiContext.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _apiContext.Remove(user);
            await _apiContext.SaveChangesAsync();
            return Ok();
        }
    }
}
