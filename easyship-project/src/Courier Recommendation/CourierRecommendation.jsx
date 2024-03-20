import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarUser from './navbarUser';
import { Table } from 'react-bootstrap';

function CourierRecommendation() {
    const [data, setData] = useState([]);
    const [pickupCity, setPickupCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [weight, setWeight] = useState('');
    const [showTable, setShowTable] = useState(false); // State variable to track if the table should be shown
    const [bestShippingCharges, setBestShippingCharges] = useState(false);
    const [bestDeliveryTimeline, setBestDeliveryTimeline] = useState(false);

    useEffect(() => {
        getData(); // Fetch data initially
    }, []);
    // Ensure the weight is at least 0.5
    const weightToUse = weight < '0.5' ? '0.5' : weight;
    const getData = () => {
        axios.get('https://localhost:7279/api/Courier')
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.log("Error is =>", error);
            });
    };

    const handleRecommendations = () => {
        if (!pickupCity || !destinationCity || !weight) {
            alert('Please fill in all required fields.');
            return;
        }

        // Fetch data from API every time recommendations are requested
        axios.get('https://localhost:7279/api/Courier')
            .then((result) => {
                let filteredData = result.data.filter(item => (
                    item.pickupCity === pickupCity &&
                    item.destinationCity === destinationCity
                ));

                if (bestShippingCharges) {
                    filteredData = [filteredData.reduce((prev, current) => (prev.shippingCharges < current.shippingCharges) ? prev : current)];
                    setBestDeliveryTimeline(false); // Deselect best delivery timeline checkbox
                }

                if (bestDeliveryTimeline) {
                    filteredData = [filteredData.reduce((prev, current) => (prev.deliveryTimeline < current.deliveryTimeline) ? prev : current)];
                    setBestShippingCharges(false); // Deselect best shipping charges checkbox
                }

                setData(filteredData);
                setShowTable(true); // Show the table when recommendations are fetched
            })
            .catch((error) => {
                console.log("Error is =>", error);
            });
    };

    return (
        <>
            <NavbarUser />
            
            <br />
            <br />
            <div className="flex justify-center items-center h-screen">
    <div className="py-4 px-7 rounded-lg max-w-md" style={{ backgroundColor: '#FFE8D2' }}>
        <h3 className="mb-2 text-black text-[22px] sm:text-[40px] font-extrabold leading-none">
            <span>Get Courier Rates!</span>
        </h3>
        <div className="text-lg text-black leading-[1.8] mb-2">
            <p>Get Latest Courier Rates of Pakistan...</p>
        </div>
        <div className="mt-4 sm:mt-6">
            <div className="mb-2">
                <label htmlFor="pickupCity" className="block text-black text-lg font-medium">Pickup City</label>
                <input type="text" id="pickupCity" name="pickupCity" value={pickupCity} onChange={(e) => setPickupCity(e.target.value)} className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-2">
                <label htmlFor="destinationCity" className="block text-black text-lg font-medium">Destination City</label>
                <input type="text" id="destinationCity" name="destinationCity" value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-2">
                <label htmlFor="weight" className="block text-black text-lg font-medium">Weight (kg)</label>
                <input type="number" id="weight" name="weight" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" min="0.5" required />
            </div>
            <div className="mb-2 flex items-center">
                <label htmlFor="bestShippingCharges" className="mr-2">Best Shipping Charges:</label>
                <input type="checkbox" id="bestShippingCharges" name="bestShippingCharges" checked={bestShippingCharges} onChange={() => {
                    setBestShippingCharges(!bestShippingCharges);
                    if (!bestShippingCharges) {
                        setBestDeliveryTimeline(false); // Deselect best delivery timeline checkbox
                    }
                }} />
            </div>
            <div className="mb-2 flex items-center">
                <label htmlFor="bestDeliveryTimeline" className="mr-2">Best Delivery Timeline:</label>
                <input type="checkbox" id="bestDeliveryTimeline" name="bestDeliveryTimeline" checked={bestDeliveryTimeline} onChange={() => {
                    setBestDeliveryTimeline(!bestDeliveryTimeline);
                    if (!bestDeliveryTimeline) {
                        setBestShippingCharges(false); // Deselect best shipping charges checkbox
                    }
                }} />
            </div>
            <button className="w-full px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-700 focus:outline-none focus:shadow-outline" onClick={handleRecommendations} type="button">
                Get Recommendations
            </button>
        </div>
    </div>
</div>


            {showTable && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Courier</th>
                            <th>Shipping Charges</th>
                            <th>Delivery Timeline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.courier}</td>
                                <td>{item.shippingCharges * weightToUse}</td>
                                <td>{item.deliveryTimeline}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
}

export default CourierRecommendation;
