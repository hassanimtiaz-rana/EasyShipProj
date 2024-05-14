using easyShipBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Import EF Core for DbContext
using System.Globalization; // Import CultureInfo for month name

namespace easyShipBackend.Controllers
{
    public class AdminDashboard : Controller
    {
        private readonly ApiContext _apiContext; // Assuming YourDbContext is your DbContext class

        public AdminDashboard(ApiContext apiContext)
        {
            _apiContext = apiContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("getUsersCount")]
        public async Task<int> GetUsersCount()
        {
            var userCount = await _apiContext.User.CountAsync();
            return userCount;
        }
        [HttpGet("getCouriersCount")]
        public async Task<int> GetCouriersCount()
        {
            var courierCount = await _apiContext.CourierDetails.CountAsync();
            return courierCount;
        }
        [HttpGet("getComplaintsCount")]
        public async Task<int> GetComplaintsCount()
        {
            var complaintsCount = await _apiContext.HelpRequest.CountAsync();
            return complaintsCount;
        }
        [HttpGet("getPendingComplaintsCount")]
        public async Task<int> GetPendingComplaintsCount()
        {
            var pendingComplaintsCount = await _apiContext.HelpRequest
                .CountAsync(hr => hr.Status == "Pending");

            return pendingComplaintsCount;
        }
        [HttpGet("getPendingFixedCount")]
        public async Task<int> GetPendingFixedCount()
        {
            var pendingComplaintsCount = await _apiContext.HelpRequest
                .CountAsync(hr => hr.Status == "Fixed");

            return pendingComplaintsCount;
        }
        [HttpGet("getDistinctCourierCount")]
        public async Task<IEnumerable<object>> GetDistinctCourierCount()
        {
            var distinctCourierCount = await _apiContext.CourierDetails
                .GroupBy(c => c.Courier)
                .Select(g => new
                {
                    CourierName = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            return distinctCourierCount;
        }
        [HttpGet("getUsersByMonth")]
        public async Task<IEnumerable<object>> GetUsersByMonth()
        {
            var users = await _apiContext.User
                .Where(u => u.CreateAT != null) // Filter out null values
                .ToListAsync();

            var usersByMonth = users
                .Select(u => new
                {
                    CreateAt = u.CreateAT.Value // Access the datetime value
                })
                .GroupBy(u => new { Year = u.CreateAt.Year, Month = u.CreateAt.Month }) // Group by year and month
                .Select(g => new
                {
                    Year = g.Key.Year, // Extract year from the grouped key
                    Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key.Month), // Get month name from month number
                    Count = g.Count()
                })
                .ToList(); // Materialize the query in memory

            return usersByMonth;
        }




    }
}
