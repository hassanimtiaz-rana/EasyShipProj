using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace easyShipBackend.Models
{
    public class EmployeeContext: DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options): base(options)
        {
            
        }
        public DbSet<Employee> Employees { get; set;}

        internal Task<ActionResult<IEnumerable<Employee>>> ToListAsync()
        {
            throw new NotImplementedException();
        }
    }
}
