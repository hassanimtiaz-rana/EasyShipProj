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
    public class OrderController : ControllerBase
    {
        private readonly ApiContext _apiContext;

        public OrderController(ApiContext apiContext)
        {
            _apiContext = apiContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders = await _apiContext.Orders.ToListAsync();
            if (orders == null || orders.Count == 0)
            {
                return NotFound(); // or appropriate response if no data found
            }

            return orders;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _apiContext.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            return order;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _apiContext.Orders.Add(order);
            await _apiContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetOrder), new { id = order.ID }, order);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutOrder(int id, Order order)
        {
            if (id != order.ID)
            {
                return BadRequest();
            }
            _apiContext.Entry(order).State = EntityState.Modified;
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
        public async Task<ActionResult> DeleteOrder(int id)
        {
            var order = await _apiContext.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            _apiContext.Remove(order);
            await _apiContext.SaveChangesAsync();
            return Ok();
        }

        // Additional methods for order handling can be added as needed
    }
}
