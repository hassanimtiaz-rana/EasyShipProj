using easyShipBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace easyShipBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApiContext _apiContext;

        public ProductController(ApiContext apiContext)
        {
            _apiContext = apiContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            if (_apiContext == null)
            {
                return NotFound();
            }

            var products = await _apiContext.Productss.ToListAsync();
            if (products == null || products.Count == 0)
            {
                return NotFound(); // or appropriate response if no data found
            }

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            if (_apiContext == null)
            {
                return NotFound();
            }
            var product = await _apiContext.Productss.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;



        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product prod)
        {
           

            // Check if a product with the same name and store name already exists
            var existingProduct = _apiContext.Productss.FirstOrDefault(p => p.productName == prod.productName && p.Storename == prod.Storename);

            if (existingProduct != null)
            {
                return BadRequest("Product with the same name and store name already exists.");
            }

            _apiContext.Productss.Add(prod);
            await _apiContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = prod.Id }, prod);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }
            _apiContext.Entry(product).State = EntityState.Modified;
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
        [HttpGet("ByStore/{storename}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByStore(string storename)
        {
            var productsByStore = await _apiContext.Productss.Where(p => p.Storename == storename).ToListAsync();
            if (productsByStore == null || productsByStore.Count == 0)
            {
                return NotFound(); // or appropriate response if no data found
            }

            return productsByStore;
        }

        [HttpPut("UpdateQuantity")]
        public async Task<IActionResult> UpdateQuantity([FromBody] ProductQuantityRequest request)
        {
            var product = await _apiContext.Productss.FindAsync(request.Id);
            if (product == null)
            {
                return NotFound();
            }

            // Ensure quantity is non-negative
            if (request.Quantity < 0)
            {
                return BadRequest("Quantity should be a non-negative value.");
            }

            // Check if the requested quantity is available
            if (product.productQuantity < request.Quantity)
            {
                return BadRequest("Insufficient quantity available for update.");
            }

            product.productQuantity -= request.Quantity; // Subtract the quantity

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



        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            if (_apiContext.Productss == null)
            {
                return NotFound();
            }
            var prod = await _apiContext.Productss.FindAsync(id);
            if (prod == null) { return NotFound(); }
            _apiContext.Remove(prod);
            await _apiContext.SaveChangesAsync();
            return Ok();
        }

    }
}
