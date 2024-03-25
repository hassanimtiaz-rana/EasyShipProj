﻿namespace easyShipBackend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? productName { get; set; }
        public int productPrice { get; set; }
        public int productQuantity { get; set; }

        public string? productCatagory { get; set; }
        public string? Username { get; set; }
        public string Storename {  get; set; }

    }
    public class ProductQuantityRequest
    {
        public int Id { get; set; }
        public int Quantity { get; set; }



    }
}
