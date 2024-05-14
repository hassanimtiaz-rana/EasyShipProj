using System.Collections.Generic;
using System.IO;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using easyShipBackend.Models; // Assuming Order model is in this namespace

public class PdfGenerationService
{
    public byte[] GeneratePdfReport(IEnumerable<Order> orders)
    {
        using (MemoryStream stream = new MemoryStream())
        {
            PdfWriter writer = new PdfWriter(stream);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            // Add title
            document.Add(new Paragraph("Orders Report"));

            // Add table with orders data
            Table table = new Table(7);
            table.AddCell("ID");
            table.AddCell("Items");
            table.AddCell("Address");
            table.AddCell("Total Cost");
            table.AddCell("Store Name");
            table.AddCell("Order Status");
            table.AddCell("Payment Status");

            foreach (var order in orders)
            {
                table.AddCell(order.ID.ToString());
                table.AddCell(order.Items);
                table.AddCell(order.Address);
                table.AddCell(order.TotalCost.ToString());
                table.AddCell(order.Storename);
                table.AddCell(order.OrderStatus);
                table.AddCell(order.PaymentStatus);
            }

            document.Add(table);
            document.Close();

            return stream.ToArray();
        }
    }
}
