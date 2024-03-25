using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using easyShipBackend.Models;
using EllipticCurve.Utils;

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

        [HttpPut]
        public async Task<ActionResult> PutOrder([FromBody] UpdateOrder updatedOrder)
        {
            if (updatedOrder == null)
            {
                return BadRequest("Invalid data provided.");
            }

            var existingOrder = await _apiContext.Orders.FindAsync(updatedOrder.ID);
            if (existingOrder == null)
            {
                return NotFound("Order not found.");
            }

            // Update only the properties that need to be modified
            existingOrder.OrderStatus = updatedOrder.OrderStatus;
            existingOrder.PaymentStatus = updatedOrder.PaymentStatus;

            try
            {
                _apiContext.Entry(existingOrder).State = EntityState.Modified;
                await _apiContext.SaveChangesAsync();
                return Ok("Order updated successfully.");
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Failed to update order.");
            }
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

        [HttpGet("ByStore/{storename}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByStore(string storename)
        {
            var ordersByStore = await _apiContext.Orders.Where(o => o.Storename == storename).ToListAsync();
            if (ordersByStore == null || ordersByStore.Count == 0)
            {
                return NotFound(); // or appropriate response if no data found
            }

            return ordersByStore;
        }

        // Additional methods for order handling can be added as needed

    }
}
