using easyShipBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace easyShipBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductContext _productContext;

        public ProductController(ProductContext productContext)
        {
            _productContext = productContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            if (_productContext == null)
            {
                return NotFound();
            }

            var products = await _productContext.Productss.ToListAsync();
            if (products == null || products.Count == 0)
            {
                return NotFound(); // or appropriate response if no data found
            }

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            if (_productContext == null)
            {
                return NotFound();
            }
            var product = await _productContext.Productss.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;



        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product prod)
        {
            _productContext.Productss.Add(prod);
            await _productContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = prod.Id }, prod);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }
            _productContext.Entry(product).State = EntityState.Modified;
            try
            {
                await _productContext.SaveChangesAsync();
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
            if (_productContext.Productss == null)
            {
                return NotFound();
            }
            var prod = await _productContext.Productss.FindAsync(id);
            if (prod == null) { return NotFound(); }
            _productContext.Remove(prod);
            await _productContext.SaveChangesAsync();
            return Ok();
        }

    }
}
