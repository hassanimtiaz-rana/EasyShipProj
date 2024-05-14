using easyShipBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Import EF Core for DbContext
using System.Globalization; // Import CultureInfo for month name


namespace easyShipBackend.Controllers
{
    public class UserDashboard : Controller
    {
        private readonly ApiContext _apiContext; // Assuming YourDbContext is your DbContext class

        public UserDashboard(ApiContext apiContext)
        {
            _apiContext = apiContext;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("getUserCountByStore")]
        public async Task<IActionResult> GetUserCountByStore(string storeName)
        {
            if (string.IsNullOrEmpty(storeName))
            {
                return BadRequest("Store name cannot be empty.");
            }

            var userCountByStore = await _apiContext.User
                .Where(u => u.Storename == storeName)
                .CountAsync();

            return Ok(userCountByStore);
        }
        [HttpGet("getDistinctProductsCountByStore")]
        public async Task<IActionResult> GetDistinctProductsCountByStore(string storeName)
        {
            if (string.IsNullOrEmpty(storeName))
            {
                return BadRequest("Store name cannot be empty.");
            }

            var distinctProductsCount = await _apiContext.Productss
                .Where(p => p.Storename == storeName)
                .Select(p => p.productName) // Select only the product name
                .Distinct() // Get distinct product names
                .CountAsync(); // Count the distinct products

            return Ok(distinctProductsCount);
        }
        [HttpGet("getTotalOrdersCountByStore")]
        public async Task<IActionResult> GetTotalOrdersCountByStore(string storeName)
        {
            if (string.IsNullOrEmpty(storeName))
            {
                return BadRequest("Store name cannot be empty.");
            }

            var totalOrdersCount = await _apiContext.Orders
                .Where(o => o.Storename == storeName)
                .CountAsync();

            return Ok(totalOrdersCount);
        }
        [HttpGet("getPendingUserComplaintsCount")]
        public async Task<int> GetPendingUserComplaintsCount(string storeName)
        {
            if (string.IsNullOrEmpty(storeName))
            {
                throw new ArgumentException("Store name cannot be empty.");
            }

            var pendingComplaintsCount = await _apiContext.HelpRequest
                .Where(hr => hr.Status == "Pending" && hr.Storename == storeName)
                .CountAsync();

            return pendingComplaintsCount;
        }

        [HttpGet("getPendingUserFixedCount")]
        public async Task<int> GetPendingUserFixedCount(string storeName)
        {
            if (string.IsNullOrEmpty(storeName))
            {
                throw new ArgumentException("Store name cannot be empty.");
            }

            var pendingFixedCount = await _apiContext.HelpRequest
                .Where(hr => hr.Status == "Fixed" && hr.Storename == storeName)
                .CountAsync();

            return pendingFixedCount;
        }
        [HttpGet("getOrderStatusCounts")]
        public async Task<IActionResult> GetOrderStatusCounts(string storeName)
        {
            if (string.IsNullOrEmpty(storeName))
            {
                return BadRequest("Store name cannot be empty.");
            }

            var orderStatusCounts = new Dictionary<string, int>();

            orderStatusCounts["Pending"] = await _apiContext.Orders
                .Where(o => o.OrderStatus == "Pending" && o.Storename == storeName)
                .CountAsync();

            orderStatusCounts["Completed"] = await _apiContext.Orders
                .Where(o => o.OrderStatus == "Completed" && o.Storename == storeName)
                .CountAsync();

            orderStatusCounts["Cancelled"] = await _apiContext.Orders
                .Where(o => o.OrderStatus == "Cancelled" && o.Storename == storeName)
                .CountAsync();

            return Ok(orderStatusCounts);
        }
        [HttpGet("getPaymentStatusCounts")]
        public async Task<IActionResult> GetPaymentStatusCounts(string storeName)
        {
            if (string.IsNullOrEmpty(storeName))
            {
                return BadRequest("Store name cannot be empty.");
            }

            var paymentStatusCounts = new Dictionary<string, int>(); // Assuming total cost is of decimal type

            paymentStatusCounts["PaymentReceived"] = await _apiContext.Orders
                .Where(o => o.PaymentStatus == "Completed" && o.Storename == storeName)
                .SumAsync(o => o.TotalCost);

            paymentStatusCounts["PendingPayment"] = await _apiContext.Orders
                .Where(o => o.PaymentStatus == "Pending" && o.Storename == storeName)
                .SumAsync(o => o.TotalCost);

            return Ok(paymentStatusCounts);
        }
        [HttpGet("getTopSoldProducts")]
        public async Task<IActionResult> GetTopSoldProducts(string storeName)
        {
            if (string.IsNullOrEmpty(storeName))
            {
                return BadRequest("Store name cannot be empty.");
            }

            var productsSold = new Dictionary<string, int>();

            var orders = await _apiContext.Orders
                .Where(o => o.Storename == storeName)
                .ToListAsync();

            foreach (var order in orders)
            {
                var items = order.Items.Split(',');
                foreach (var item in items)
                {
                    var productName = item.Trim();
                    if (!productsSold.ContainsKey(productName))
                    {
                        productsSold[productName] = 1;
                    }
                    else
                    {
                        productsSold[productName]++;
                    }
                }
            }

            var topProducts = productsSold.OrderByDescending(x => x.Value)
                                          .Take(3)
                                          .ToDictionary(x => x.Key, x => x.Value);

            return Ok(topProducts);
        }
        [HttpGet("getTopDistinctMostUsedCouriers")]
        public IActionResult GetTopDistinctMostUsedCouriers(string storeName)
        {
            if (string.IsNullOrEmpty(storeName))
            {
                return BadRequest("Store name cannot be empty.");
            }

            try
            {
                var topMostUsedCouriers = _apiContext.Orders
                    .Where(o => o.Storename == storeName)
                    .GroupBy(o => o.Courier)
                    .Select(g => new { Courier = g.Key, Count = g.Count() }) // Select courier and count
                    .OrderByDescending(c => c.Count) // Order by count in descending order
                    .Take(3) // Take only the top 3 results
                    .ToList();

                return Ok(topMostUsedCouriers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("getCourierWithMostCancelledOrders")]
        public IActionResult GetCourierWithMostCancelledOrders(string storeName)
        {
            if (string.IsNullOrEmpty(storeName))
            {
                return BadRequest("Store name cannot be empty.");
            }

            try
            {
                var courierWithMostCancelledOrders = _apiContext.Orders
                    .Where(o => o.Storename == storeName && o.OrderStatus == "Cancelled") // Filter cancelled orders
                    .GroupBy(o => o.Courier)
                    .Select(g => new { Courier = g.Key, Count = g.Count() }) // Select courier and count
                    .OrderByDescending(c => c.Count) // Order by count in descending order
                    .FirstOrDefault(); // Get the first (top) result

                if (courierWithMostCancelledOrders != null)
                {
                    return Ok(courierWithMostCancelledOrders);
                }
                else
                {
                    return NotFound("No courier with cancelled orders found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




    }
}
