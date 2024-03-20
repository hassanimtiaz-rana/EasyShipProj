namespace easyShipBackend.Models
{
    public class CourierDetails
    {
        public int Id { get; set; }
        public string Courier { get; set; }
        public float ShippingCharges { get; set; }
        public string DeliveryTimeline { get; set; }
        public string PickupCity { get; set; }
        public string DestinationCity { get; set; }
    }
}
