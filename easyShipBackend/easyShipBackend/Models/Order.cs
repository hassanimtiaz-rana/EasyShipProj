namespace easyShipBackend.Models
{
    public class Order
    {
        public int ID { get; set; }
        public string Items { get; set; }
        public string Address { get; set; }
        public int TotalCost { get; set; }
        public string Storename { get; set; }
        public string OrderStatus { get; set; }
        public string PaymentStatus { get; set; }
        public string Courier { get; set; }

        public DateTime Time { get; set; }

    }
    public class UpdateOrder
    {
        public int ID { get; set; }
        public string OrderStatus { get; set; }
        public string PaymentStatus { get; set; }
    }
}
