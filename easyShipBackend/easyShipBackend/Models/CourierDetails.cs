using Newtonsoft.Json;

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


    public class ApiCountry
    {
        public int CountryId { get; set; }
        public string CountryName { get; set; }
    }

    public class ApiCountriesResponse
    {
        public List<ApiCountry> AllCountries { get; set; }
    }
    public class CountryResponse
    {
        public string CountryId { get; set; }
        public string CountryName { get; set; }
    }

}
