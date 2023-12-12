using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace easyShipBackend.Models
{
    public class ApiContext: DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options): base(options)
        {
            
        }
        public DbSet<Employee> Employees { get; set;}
        public DbSet<Product> Productss { get; set; }
        public DbSet<User> User { get; set; }


        internal Task<ActionResult<IEnumerable<Employee>>> ToListAsync()
        {
            throw new NotImplementedException();
        }
    }
}
