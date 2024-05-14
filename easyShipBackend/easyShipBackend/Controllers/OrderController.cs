using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using easyShipBackend.Models; // Assuming Order model is in this namespace
using PdfSharpCore.Pdf;
using PdfSharpCore.Drawing;
using System.Globalization;

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
            string formattedDate = DateTime.UtcNow.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
            order.Time = DateTime.ParseExact(formattedDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);

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

        [HttpGet("GeneratePdfReport")]
        public async Task<IActionResult> GeneratePdfReport(DateTime startDate, DateTime endDate, string status, string storeName)
        {
            IQueryable<Order> ordersQuery = _apiContext.Orders
                .Where(o => o.Time >= startDate && o.Time <= endDate);

            if (!string.IsNullOrEmpty(status) && status != "All")
            {
                ordersQuery = ordersQuery.Where(o => o.OrderStatus == status);
            }

            if (!string.IsNullOrEmpty(storeName))
            {
                ordersQuery = ordersQuery.Where(o => o.Storename == storeName);
            }

            var ordersInRange = await ordersQuery
                .OrderByDescending(o => o.TotalCost)
                .ToListAsync();

            if (ordersInRange == null || ordersInRange.Count == 0)
            {
                return NotFound("No orders found within the specified date range, status, and store name.");
            }

            // Create PDF document
            PdfDocument pdf = new PdfDocument();
            PdfPage page = pdf.AddPage();
            XGraphics gfx = XGraphics.FromPdfPage(page);
            XFont font = new XFont("Arial", 12);

            int y = 50; // Initial y position for content

            // Add title
            gfx.DrawString("Top Orders Report", font, XBrushes.Black, new XPoint(50, y));
            y += 20; // Increase y position for content spacing

            // Add table headers
            gfx.DrawString("ID", font, XBrushes.Black, new XPoint(50, y));
            gfx.DrawString("Address", font, XBrushes.Black, new XPoint(70, y));
            gfx.DrawString("Total Cost", font, XBrushes.Black, new XPoint(350, y));
            gfx.DrawString("Courier", font, XBrushes.Black, new XPoint(420, y));
            gfx.DrawString("Order Status", font, XBrushes.Black, new XPoint(500, y));
            y += 20; // Increase y position for header row

            // Add data rows
            foreach (var order in ordersInRange)
            {
                gfx.DrawString(order.ID.ToString(), font, XBrushes.Black, new XPoint(50, y));
                gfx.DrawString(order.Address, font, XBrushes.Black, new XPoint(70, y));
                gfx.DrawString(order.TotalCost.ToString(), font, XBrushes.Black, new XPoint(350, y));
                gfx.DrawString(order.Courier, font, XBrushes.Black, new XPoint(420, y));
                gfx.DrawString(order.OrderStatus, font, XBrushes.Black, new XPoint(500, y));
                y += 20; // Increase y position for next row
            }

            // Save PDF to MemoryStream
            MemoryStream stream = new MemoryStream();
            pdf.Save(stream, false);
            stream.Position = 0;

            // Return PDF file as response
            return File(stream.ToArray(), "application/pdf", "OrdersReport.pdf");
        }
        [HttpGet("GetSoldProducts")]
        public async Task<IActionResult> GetSoldProducts(DateTime startDate, DateTime endDate, string type, string storeName)
        {
            // Query the orders table to get the sold products within the specified date range
            var ordersInRange = await _apiContext.Orders
                .Where(o => o.Time >= startDate && o.Time <= endDate)
                .ToListAsync();
            if (!string.IsNullOrEmpty(storeName))
            {
                ordersInRange = ordersInRange.Where(o => o.Storename == storeName).ToList();
            }


            if (ordersInRange == null || ordersInRange.Count == 0)
            {
                return NotFound("No orders found within the specified date range.");
            }

            // Split and count the items to get the quantity sold for each product
            var itemQuantities = new Dictionary<string, int>();
            foreach (var order in ordersInRange)
            {
                var items = order.Items.Split(',');
                foreach (var item in items)
                {
                    if (!itemQuantities.ContainsKey(item.Trim()))
                    {
                        itemQuantities[item.Trim()] = 1;
                    }
                    else
                    {
                        itemQuantities[item.Trim()]++;
                    }
                }
            }

            if (type == "most sold")
            {
                // Get all products from the database
                var allProducts = await _apiContext.Productss.ToListAsync();

                // Filter products by store name
                var productsInStore = allProducts.Where(p => p.Storename == storeName).ToList();

                // Get the most sold products from the filtered products
                var mostSoldProducts = itemQuantities
                    .Where(kv => productsInStore.Any(p => p.productName == kv.Key))
                    .OrderByDescending(kv => kv.Value)
                    ;
                if (mostSoldProducts == null || mostSoldProducts.Count() == 0)
                {
                    return NotFound("No products found in orders.");
                }

                // Return the most sold products with their quantities sold and categories
                var response = mostSoldProducts.Select(m => new
                {
                    ProductName = m.Key,
                    QuantitySold = m.Value,
                    Category = productsInStore.FirstOrDefault(p => p.productName == m.Key)?.productCatagory
                });

                // Create PDF document
                PdfDocument pdf = new PdfDocument();
                PdfPage page = pdf.AddPage();
                XGraphics gfx = XGraphics.FromPdfPage(page);
                XFont font = new XFont("Arial", 12);

                int y = 50; // Initial y position for content

                // Add title
                gfx.DrawString("Most Sold Products Report", font, XBrushes.Black, new XPoint(50, y));
                y += 20; // Increase y position for content spacing

                // Add table headers
                gfx.DrawString("Product Name", font, XBrushes.Black, new XPoint(50, y));
                gfx.DrawString("Quantity", font, XBrushes.Black, new XPoint(150, y));
                gfx.DrawString("Category", font, XBrushes.Black, new XPoint(250, y));

                y += 20; // Increase y position for header row

                // Add data rows
                foreach (var product in response)
                {
                    gfx.DrawString(product.ProductName ?? "N/A", font, XBrushes.Black, new XPoint(50, y));
                    gfx.DrawString(product.QuantitySold.ToString() ?? "0", font, XBrushes.Black, new XPoint(150, y));
                    gfx.DrawString(product.Category ?? "N/A", font, XBrushes.Black, new XPoint(250, y));

                    y += 20; // Increase y position for next row
                }

                // Save PDF to MemoryStream
                MemoryStream stream = new MemoryStream();
                pdf.Save(stream, false);
                stream.Position = 0;

                // Return PDF file as response
                return File(stream.ToArray(), "application/pdf", "MostSoldProductsReport.pdf");
            }

            else if (type == "least sold")
            {
                // Get all products from the database
                var allProducts = await _apiContext.Productss.ToListAsync();

                // Filter products by store name
                var productsInStore = allProducts.Where(p => p.Storename == storeName).ToList();

                // Get the least sold products from the filtered products
                var leastSoldProducts = itemQuantities
                    .Where(kv => productsInStore.Any(p => p.productName == kv.Key))
                    .OrderBy(kv => kv.Value)
                    ;

                if (leastSoldProducts == null || leastSoldProducts.Count() == 0)
                {
                    return NotFound("No products found in orders.");
                }

                // Return the least sold products with their quantities sold and categories
                var response = leastSoldProducts.Select(l => new
                {
                    ProductName = l.Key,
                    QuantitySold = l.Value,
                    Category = productsInStore.FirstOrDefault(p => p.productName == l.Key)?.productCatagory
                });

                // Add products not sold from the specified store
                var productsNotSold = productsInStore
                    .Where(p => !itemQuantities.ContainsKey(p.productName))
                    .ToList();

                // Include products not sold in the response
                foreach (var product in productsNotSold)
                {
                    response.Append(new
                    {
                        ProductName = product.productName,
                        QuantitySold = 0, // Set quantity sold to 0 for products not sold
                        Category = product.productCatagory
                    });
                }

                // Create PDF document
                PdfDocument pdf = new PdfDocument();
                PdfPage page = pdf.AddPage();
                XGraphics gfx = XGraphics.FromPdfPage(page);
                XFont font = new XFont("Arial", 12);

                int y = 50; // Initial y position for content

                // Add title
                gfx.DrawString("Products Report", font, XBrushes.Black, new XPoint(50, y));
                y += 20; // Increase y position for content spacing

                // Add table headers
                gfx.DrawString("Product Name", font, XBrushes.Black, new XPoint(50, y));
                gfx.DrawString("Quantity", font, XBrushes.Black, new XPoint(150, y));
                gfx.DrawString("Catagory", font, XBrushes.Black, new XPoint(250, y));

                y += 20; // Increase y position for header row

                // Add data rows
                foreach (var product in response)
                {
                    gfx.DrawString(product.ProductName ?? "N/A", font, XBrushes.Black, new XPoint(50, y));
                    gfx.DrawString(product.QuantitySold.ToString() ?? "0", font, XBrushes.Black, new XPoint(150, y));
                    gfx.DrawString(product.Category ?? "N/A", font, XBrushes.Black, new XPoint(250, y));

                    y += 20; // Increase y position for next row
                }


                // Save PDF to MemoryStream
                MemoryStream stream = new MemoryStream();
                pdf.Save(stream, false);
                stream.Position = 0;

                // Return PDF file as response
                return File(stream.ToArray(), "application/pdf", "LeastSoldProductsReport.pdf");

                return Ok(response);
            }


            else
            {
                return BadRequest("Invalid request type.");
            }
        }

        [HttpGet("GeneratePaymentReport")]
        public async Task<IActionResult> GeneratePaymentReport(DateTime startDate, DateTime endDate, string paymentStatus, string storeName)
        {
            IQueryable<Order> ordersQuery = _apiContext.Orders
                .Where(o => o.Time >= startDate && o.Time <= endDate);

            if (!string.IsNullOrEmpty(paymentStatus) && paymentStatus != "All")
            {
                ordersQuery = ordersQuery.Where(o => o.PaymentStatus == paymentStatus);
            }

            if (!string.IsNullOrEmpty(storeName))
            {
                ordersQuery = ordersQuery.Where(o => o.Storename == storeName);
            }

            var ordersInRange = await ordersQuery
                .OrderByDescending(o => o.TotalCost)
                .ToListAsync();

            if (ordersInRange == null || ordersInRange.Count == 0)
            {
                return NotFound("No orders found within the specified date range, payment status, and store name.");
            }

            // Create PDF document
            PdfDocument pdf = new PdfDocument();
            PdfPage page = pdf.AddPage();
            XGraphics gfx = XGraphics.FromPdfPage(page);
            XFont font = new XFont("Arial", 12);

            int y = 50; // Initial y position for content

            // Add title
            gfx.DrawString("Top Orders Report", font, XBrushes.Black, new XPoint(50, y));
            y += 20; // Increase y position for content spacing

            // Add table headers
            gfx.DrawString("ID", font, XBrushes.Black, new XPoint(50, y));
            gfx.DrawString("Address", font, XBrushes.Black, new XPoint(70, y));
            gfx.DrawString("Total Cost", font, XBrushes.Black, new XPoint(350, y));
            gfx.DrawString("Courier", font, XBrushes.Black, new XPoint(420, y));
            gfx.DrawString("Payment Status", font, XBrushes.Black, new XPoint(500, y));
            y += 20; // Increase y position for header row

            // Add data rows
            foreach (var order in ordersInRange)
            {
                gfx.DrawString(order.ID.ToString(), font, XBrushes.Black, new XPoint(50, y));
                gfx.DrawString(order.Address, font, XBrushes.Black, new XPoint(70, y));
                gfx.DrawString(order.TotalCost.ToString(), font, XBrushes.Black, new XPoint(350, y));
                gfx.DrawString(order.Courier, font, XBrushes.Black, new XPoint(420, y));
                gfx.DrawString(order.PaymentStatus, font, XBrushes.Black, new XPoint(500, y));
                y += 20; // Increase y position for next row
            }

            // Save PDF to MemoryStream
            MemoryStream stream = new MemoryStream();
            pdf.Save(stream, false);
            stream.Position = 0;

            // Return PDF file as response
            return File(stream.ToArray(), "application/pdf", "PaymentsReport.pdf");
        }
        [HttpGet("GenerateCourierReport")]
        public async Task<IActionResult> GenerateCourierReport(DateTime startDate, DateTime endDate, string storeName)
        {
            IQueryable<Order> ordersQuery = _apiContext.Orders
                .Where(o => o.Time >= startDate && o.Time <= endDate);

            if (!string.IsNullOrEmpty(storeName))
            {
                ordersQuery = ordersQuery.Where(o => o.Storename == storeName);
            }

            var courierReport = await ordersQuery
                .GroupBy(o => new { o.Courier, o.Storename })
                .Select(g => new
                {
                    CourierName = g.Key.Courier,
                    StoreName = g.Key.Storename,
                    PendingCount = g.Count(o => o.OrderStatus == "Pending"),
                    CompletedCount = g.Count(o => o.OrderStatus == "Completed"),
                    CancelledCount = g.Count(o => o.OrderStatus == "Cancelled")
                })
                .ToListAsync();

            if (courierReport == null || courierReport.Count == 0)
            {
                return NotFound("No orders found within the specified date range and store name.");
            }

            // Create PDF document
            PdfDocument pdf = new PdfDocument();
            PdfPage page = pdf.AddPage();
            XGraphics gfx = XGraphics.FromPdfPage(page);
            XFont font = new XFont("Arial", 12);

            int y = 50; // Initial y position for content

            // Add title
            gfx.DrawString("Courier Report", font, XBrushes.Black, new XPoint(50, y));
            y += 20; // Increase y position for content spacing

            // Add table headers
            gfx.DrawString("Courier Name", font, XBrushes.Black, new XPoint(50, y));
            gfx.DrawString("Store Name", font, XBrushes.Black, new XPoint(150, y));
            gfx.DrawString("Pending Count", font, XBrushes.Black, new XPoint(250, y));
            gfx.DrawString("Completed Count", font, XBrushes.Black, new XPoint(350, y));
            gfx.DrawString("Cancelled Count", font, XBrushes.Black, new XPoint(450, y));
            y += 20; // Increase y position for header row

            // Add data rows
            foreach (var courier in courierReport)
            {
                gfx.DrawString(courier.CourierName, font, XBrushes.Black, new XPoint(50, y));
                gfx.DrawString(courier.StoreName, font, XBrushes.Black, new XPoint(150, y));
                gfx.DrawString(courier.PendingCount.ToString(), font, XBrushes.Black, new XPoint(250, y));
                gfx.DrawString(courier.CompletedCount.ToString(), font, XBrushes.Black, new XPoint(350, y));
                gfx.DrawString(courier.CancelledCount.ToString(), font, XBrushes.Black, new XPoint(450, y));
                y += 20; // Increase y position for next row
            }

            // Save PDF to MemoryStream
            MemoryStream stream = new MemoryStream();
            pdf.Save(stream, false);
            stream.Position = 0;

            // Return PDF file as response
            return File(stream.ToArray(), "application/pdf", "CourierReport.pdf");
        }

    }
}

       



    



