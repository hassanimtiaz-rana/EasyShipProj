import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [addedProducts, setAddedProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);


  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    calculateShippingPrice();
  }, [fromCity, toCity]);
  
  const calculateShippingPrice = async () => {
    try {
      const response = await axios.get(`https://localhost:7279/api/Courier/CalculateShipping?fromCity=${fromCity}&toCity=${toCity}`);
      if (response.data) {
        setShippingPrice(response.data);
      } else {
        setShippingPrice(0); // If no courier available for the specified cities
      }
    } catch (error) {
      console.error("Error calculating shipping price:", error);
    }
  };
  
  
  
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://localhost:7279/api/Product`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = () => {
    // Parse quantity as integer
    const parsedQuantity = parseInt(quantity, 10);
    if (selectedProduct && parsedQuantity > 0) {
      // Check if added quantity exceeds product quantity
      if (selectedProduct.productQuantity < parsedQuantity) {
        alert('Low stock: Quantity exceeds available stock.');
        return; // Do not add the product to the cart
      }
  
      const existingProductIndex = addedProducts.findIndex((product) => product.id === selectedProduct.id);
      if (existingProductIndex !== -1) {
        // Update quantity if the product already exists
        const updatedProducts = [...addedProducts];
        updatedProducts[existingProductIndex].quantity += parsedQuantity;
        setAddedProducts(updatedProducts);
        setTotalCost(totalCost + (selectedProduct.productPrice * parsedQuantity));
      } else {
        // Add new product if it doesn't exist
        const productTotal = selectedProduct.productPrice * parsedQuantity;
        setTotalCost(totalCost + productTotal);
        setAddedProducts([...addedProducts, { ...selectedProduct, quantity: parsedQuantity }]);
      }
    } else {
      alert('Please enter a valid quantity.');
    }
  };
  
  
  
  
  const handleProductSelect = (productId) => {
    const product = products.find((item) => item.id === parseInt(productId));
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleRemoveProduct = (productId) => {
    // Filter out the specific product by ID
    const updatedProducts = addedProducts.filter((product) => product.id !== productId);
    setAddedProducts(updatedProducts);
  
    // Calculate new total cost after removing the item
    const newTotalCost = updatedProducts.reduce((total, product) => total + (product.productPrice * product.quantity), 0);
    setTotalCost(newTotalCost);
  };
  const handleCheckout = async () => {
    try {
      for (const product of addedProducts) {
        const parsedQuantity = parseInt(product.quantity, 10); // Parse quantity as integer
        console.log("Product Id is", product.id);
        console.log("Parsed Quantity is", parsedQuantity);
        await axios.put(`https://localhost:7279/api/Product/UpdateQuantity`, { id: product.id, quantity: parsedQuantity });
      }

      const orderData = {
        Items: addedProducts.map((product) => product.productName).join(", "),
        Address: address,
        TotalCost: totalCost + shippingPrice,
        Storename: "Your Store Name", // Replace with actual store name
        OrderStatus: "Pending",
        PaymentStatus: "Pending",
        CreatedAt: new Date().toISOString(),
      };

      const response = await axios.post("https://localhost:7279/api/Order", orderData);
      console.log("Order placed successfully:", response.data);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };





  return (
    <>
      <div className="container mx-auto mt-10">
        {/* Box for Adding Products */}
        <div className="flex justify-center items-center mb-5">
          <label className="mr-2" htmlFor="productSelect">Product:</label>
          <select
            id="productSelect"
            aria-label="Select product"
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none w-64 mr-2"
            onChange={(e) => handleProductSelect(e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.productName}
              </option>
            ))}
          </select>
          
          <label className="mr-2 ml-10" htmlFor="quantityInput">Quantity:</label>
          <input
            id="quantityInput"
            type="number"
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none w-24 mr-2"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ml-10"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </div>

        {/* Product Selection */}
        <div className="sm:flex shadow-md my-10">
          {/* Rest of the code remains unchanged */}
          <div className="w-full sm:w-3/4 bg-white px-10 py-10">
            {/* Product cards */}
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            {addedProducts.map((product) => (
              <div key={product.id} className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50 relative">
                {/* Product details */}
                <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-between">
                  <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">{product.productCode}</p>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base font-black leading-none text-gray-800">{product.productName}</p>
                    <p className="py-2 px-3 border border-gray-200 rounded-md">{product.quantity}</p>
                  </div>
                  <p className="text-xs leading-3 text-gray-600 pt-2">Height: {product.height}</p>
                  <p className="text-xs leading-3 text-gray-600 py-4">Color: {product.color}</p>
                  <p className="w-96 text-xs leading-3 text-gray-600">Composition: {product.composition}</p>
                  <div className="flex items-center justify-end mt-auto">
                    {/* Remove button */}
                    <p className="text-xs leading-3 underline text-red-500 cursor-pointer" onClick={() => handleRemoveProduct(product.id)}>Remove</p>
                  </div>
                  <p className="text-base font-black leading-none text-gray-800">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Order Summary */}
          <div id="summary" className="w-full sm:w-1/4 md:w-1/2 px-8 py-10">
            <h1 className="font-semibold text-2xl  pb-8">Order Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Items {addedProducts.length}</span>
              <span className="font-semibold text-sm">${totalCost}</span>
            </div>
             {/* Address Message Box */}
<div className="mt-8">
  <div className="flex justify-between mb-3">
    <div className="w-1/2 pr-1">
      <label className="font-medium inline-block mb-3 text-sm uppercase">From</label>
      <select
        className="block p-2 border border-gray-300 rounded-md w-full text-sm"
        value={fromCity}
        onChange={(e) => setFromCity(e.target.value)}
      >
        <option value="">Select City</option>
        <option value="Lahore">Lahore</option>
        <option value="Islamabad">Islamabad</option>
        <option value="Faisalabad">Faisalabad</option>
        <option value="Karachi">Karachi</option>
        <option value="Quetta">Quetta</option>
      </select>
    </div>
    <div className="w-1/2 pl-1">
      <label className="font-medium inline-block mb-3 text-sm uppercase">To</label>
      <select
        className="block p-2 border border-gray-300 rounded-md w-full text-sm"
        value={toCity}
        onChange={(e) => setToCity(e.target.value)}
      >
        <option value="">Select City</option>
        <option value="Lahore">Lahore</option>
        <option value="Islamabad">Islamabad</option>
        <option value="Faisalabad">Faisalabad</option>
        <option value="Karachi">Karachi</option>
        <option value="Quetta">Quetta</option>
      </select>
    </div>
  </div>
  <label className="font-medium inline-block mb-3 text-sm uppercase">Address</label>
  <textarea
    rows={4}
    className="block p-2 border border-gray-300 rounded-md w-full"
    placeholder="Enter your address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  ></textarea>
</div>

 {/* Shipping Details */}
 <div>
  <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
  <select className="block p-2 text-gray-600 w-full text-sm">
    <option>{`Shipping Price: $${shippingPrice}`}</option>
  </select>
</div>


  {/* Total Cost and Checkout Button */}
  <div className="border-t mt-8">
    <div className="flex font-semibold justify-between py-6 text-sm uppercase">
      <span>Total cost</span>
      <span>{`$${totalCost + shippingPrice}`}</span>
    </div>
              {/* Checkout Button */}
        <div className="flex justify-center mt-5">
          <button
            className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
            onClick={handleCheckout}
          >
            Checkout
          </button>
          
          </div>
          
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderPage;
