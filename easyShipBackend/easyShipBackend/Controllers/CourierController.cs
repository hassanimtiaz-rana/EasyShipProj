using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using easyShipBackend.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace easyShipBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourierController : ControllerBase
    {
        private readonly ApiContext _apiContext;




        public CourierController(ApiContext apiContext)
        {
            _apiContext = apiContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourierDetails>>> GetCouriers()
        {
            var couriers = await _apiContext.CourierDetails.ToListAsync();
            if (couriers == null || couriers.Count == 0)
            {
                return NotFound(); // or appropriate response if no data found
            }

            return couriers;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CourierDetails>> GetCourier(int id)
        {
            var courier = await _apiContext.CourierDetails.FindAsync(id);
            if (courier == null)
            {
                return NotFound();
            }
            return courier;
        }

        [HttpPost]
        public async Task<ActionResult<CourierDetails>> PostCourier(CourierDetails courier)
        {
            // Check if the same courier name exists for the same destination and pickup city combination
            var existingCourier = await _apiContext.CourierDetails
                .FirstOrDefaultAsync(c => c.Courier == courier.Courier && c.DestinationCity == courier.DestinationCity && c.PickupCity == courier.PickupCity);

            if (existingCourier != null)
            {
                // Return a conflict response indicating that the same courier for the same destination and pickup city already exists
                return BadRequest("The same courier name for the same destination and pickup city already exists.");
            }

            _apiContext.CourierDetails.Add(courier);
            await _apiContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCourier), new { id = courier.Id }, courier);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutCourier(int id, CourierDetails courier)
        {
            if (id != courier.Id)
            {
                return BadRequest();
            }
            _apiContext.Entry(courier).State = EntityState.Modified;
            try
            {
                await _apiContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCourier(int id)
        {
            var courier = await _apiContext.CourierDetails.FindAsync(id);
            if (courier == null)
            {
                return NotFound();
            }
            _apiContext.Remove(courier);
            await _apiContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("CalculateShipping")]
        public async Task<ActionResult<IEnumerable<CourierDetails>>> CalculateShippingCharges(string fromCity, string toCity)
        {
            var couriers = await _apiContext.CourierDetails
                .Where(c => c.PickupCity == fromCity && c.DestinationCity == toCity)
                .ToListAsync();

            if (couriers.Count == 0)
            {
                return NotFound("No couriers available for the specified cities.");
            }

            return Ok(couriers);
        }

        [HttpGet("GetAllCountries")]
        public async Task<ActionResult<IEnumerable<CountryResponse>>> GetAllCountries()
        {
            var apiKey = "e8436621-cbbc-4088-b10d-177ec2cfefca"; // Your API Key
            var apiUrl = "https://api.tcscourier.com/production/v1/cod/countries";

            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Add("X-IBM-Client-Id", apiKey);

                try
                {
                    var response = await httpClient.GetAsync(apiUrl);
                    if (response.IsSuccessStatusCode)
                    {
                        var content = await response.Content.ReadAsStringAsync();
                        var apiCountriesResponse = JsonConvert.DeserializeObject<ApiCountriesResponse>(content);

                        if (apiCountriesResponse != null && apiCountriesResponse.AllCountries != null)
                        {
                            var countryResponses = apiCountriesResponse.AllCountries.Select(c =>
                                new CountryResponse
                                {
                                    CountryId = c.CountryId.ToString(), // Assuming CountryId is a string in CountryResponse
                                    CountryName = c.CountryName
                                }).ToList();

                            return Ok(countryResponses);
                        }
                        else
                        {
                            return BadRequest("Empty or invalid response received from the API.");
                        }
                    }
                    else
                    {
                        return BadRequest($"Failed to fetch countries. Status code: {response.StatusCode}");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest($"Failed to fetch countries: {ex.Message}");
                }
            }
        }


    }

}
