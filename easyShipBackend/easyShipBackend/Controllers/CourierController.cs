using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using easyShipBackend.Models;

namespace easyShipBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourierController : ControllerBase
    {
        private readonly ApiContext _apiContext;

        public CourierController(ApiContext apiContext)
        {
            _apiContext = apiContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourierDetails>>> GetCouriers()
        {
            var couriers = await _apiContext.CourierDetails.ToListAsync();
            if (couriers == null || couriers.Count == 0)
            {
                return NotFound(); // or appropriate response if no data found
            }

            return couriers;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CourierDetails>> GetCourier(int id)
        {
            var courier = await _apiContext.CourierDetails.FindAsync(id);
            if (courier == null)
            {
                return NotFound();
            }
            return courier;
        }

        [HttpPost]
        public async Task<ActionResult<CourierDetails>> PostCourier(CourierDetails courier)
        {
            // Check if the same courier name exists for the same destination and pickup city combination
            var existingCourier = await _apiContext.CourierDetails
                .FirstOrDefaultAsync(c => c.Courier == courier.Courier && c.DestinationCity == courier.DestinationCity && c.PickupCity == courier.PickupCity);

            if (existingCourier != null)
            {
                // Return a conflict response indicating that the same courier for the same destination and pickup city already exists
                return Conflict("The same courier name for the same destination and pickup city already exists.");
            }

            _apiContext.CourierDetails.Add(courier);
            await _apiContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCourier), new { id = courier.Id }, courier);
        }

        // Other methods (HttpPut, HttpDelete) remain unchanged
        [HttpPut("{id}")]
        public async Task<ActionResult> PutCourier(int id, CourierDetails courier)
        {
            if (id != courier.Id)
            {
                return BadRequest();
            }
            _apiContext.Entry(courier).State = EntityState.Modified;
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
        public async Task<ActionResult> DeleteCourier(int id)
        {
            var courier = await _apiContext.CourierDetails.FindAsync(id);
            if (courier == null)
            {
                return NotFound();
            }
            _apiContext.Remove(courier);
            await _apiContext.SaveChangesAsync();
            return Ok();
        }
        [HttpGet("CalculateShipping")]
        public async Task<ActionResult<float>> CalculateShippingCharges(string fromCity, string toCity)
        {
            var courier = await _apiContext.CourierDetails.FirstOrDefaultAsync(c => c.PickupCity == fromCity && c.DestinationCity == toCity);
            if (courier == null)
            {
                return NotFound("No courier available for the specified cities.");
            }
            return Ok(courier.ShippingCharges);
        }
    }
}
