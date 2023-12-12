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
