import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import NavbarUser from '../Navbars/navbarUser';

    
const Report = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const[pending,setPending]=useState('');
    const[paymentStatus,setPaymentStatus]=useState('');
      // Decode the JWT token to extract user information
      const token = localStorage.getItem('token');
      // const decodedToken = jwt_decode(token);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log('token is',decodedToken);
      
      const storeName = decodedToken.Storename; // Assuming 'role' is stored in the JWT payload
      const handlePrint4 = async () => {
        // Check if both start date and end date are provided
        if (!startDate || !endDate) {
            console.log('Please select both start date and end date.');
            return;
        }

        try {
            // Format start date and end date as yyyy/MM/dd
            const formattedStartDate = format(new Date(startDate), 'yyyy/MM/dd');
            const formattedEndDate = format(new Date(endDate), 'yyyy/MM/dd');

            const response = await axios.get('https://localhost:7279/api/Order/GenerateCourierReport', {
                params: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    storeName:storeName,
                },
                responseType: 'blob', // Set response type to blob to handle binary data
            });

            // Check if the response contains valid PDF data
            if (response.data.size === 0) {
                console.log('No report found within the specified date range.');
                return;
            }

            // Create a blob URL to download the PDF file
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            
            // Open the PDF in a new tab for download
            window.open(url);
        } catch (error) {
            console.error('Error generating PDF report:', error);
        }
       
        
    }; 
      
    const handlePrint3 = async () => {
        // Check if both start date and end date are provided
        if (!startDate || !endDate) {
            console.log('Please select both start date and end date.');
            return;
        }

        try {
            // Format start date and end date as yyyy/MM/dd
            const formattedStartDate = format(new Date(startDate), 'yyyy/MM/dd');
            const formattedEndDate = format(new Date(endDate), 'yyyy/MM/dd');

            const response = await axios.get('https://localhost:7279/api/Order/GeneratePaymentReport', {
                params: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    paymentStatus: paymentStatus || 'All', // Default to 'All' if no status is chosen
                    storeName:storeName,
                },
                responseType: 'blob', // Set response type to blob to handle binary data
            });

            // Check if the response contains valid PDF data
            if (response.data.size === 0) {
                console.log('No report found within the specified date range.');
                return;
            }

            // Create a blob URL to download the PDF file
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            
            // Open the PDF in a new tab for download
            window.open(url);
        } catch (error) {
            console.error('Error generating PDF report:', error);
        }
       
        
    }; 
    const handlePrint2 = async () => {
      
        // Check if both start date and end date are provided
        if (!startDate || !endDate) {
            console.log('Please select both start date and end date.');
            return;
        }

        try {
            // Format start date and end date as yyyy/MM/dd
            const formattedStartDate = format(new Date(startDate), 'yyyy/MM/dd');
            const formattedEndDate = format(new Date(endDate), 'yyyy/MM/dd');

            const response = await axios.get('https://localhost:7279/api/Order/GetSoldProducts', {
                params: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    type: pending ,
                    storeName: storeName, // Default to 'All' if no status is chosen
                },
                responseType: 'blob', // Set response type to blob to handle binary data
            });

            // Check if the response contains valid PDF data
            if (response.data.size === 0) {
                console.log('No report found within the specified date range.');
                return;
            }

            // Create a blob URL to download the PDF file
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            
            // Open the PDF in a new tab for download
            window.open(url);
        } catch (error) {
            console.error('Error generating PDF report:', error);
        }
    };

    const handlePrint = async () => {
        // Check if both start date and end date are provided
        if (!startDate || !endDate) {
            console.log('Please select both start date and end date.');
            return;
        }

        try {
            // Format start date and end date as yyyy/MM/dd
            const formattedStartDate = format(new Date(startDate), 'yyyy/MM/dd');
            const formattedEndDate = format(new Date(endDate), 'yyyy/MM/dd');

            const response = await axios.get('https://localhost:7279/api/Order/GeneratePdfReport', {
                params: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    status: status || 'All', // Default to 'All' if no status is chosen
                    storeName:storeName,
                },
                responseType: 'blob', // Set response type to blob to handle binary data
            });

            // Check if the response contains valid PDF data
            if (response.data.size === 0) {
                console.log('No report found within the specified date range.');
                return;
            }

            // Create a blob URL to download the PDF file
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            
            // Open the PDF in a new tab for download
            window.open(url);
        } catch (error) {
            console.error('Error generating PDF report:', error);
        }
       
        
    };
       
    

    return (
        <>
        <NavbarUser/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
            <section className="">
                <div className="h-full max-w-xl mx-auto bg-orange-400 shadow-lg rounded-lg p-6">
                    <div className="flex items-start">
                        <svg className="fill-current flex-shrink-0 mr-5" width="30" height="30" viewBox="0 0 30 30">
                            <path className="text-orange-300" d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z" />
                            <path className="text-orange-200" d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z" />
                            <path className="text-orange-500" d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z" />
                        </svg>
                        <div className="flex-grow truncate">
                            <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1">Order Reports</h2>
                            <div className="flex items-center space-x-4 mb-4">
                                <label htmlFor="startDate" className="text-gray-200">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1"
                                />
                                <label htmlFor="endDate" className="text-gray-200">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1"
                                />
                            </div>
                           
                        </div>
                    </div>
                    <div className="max-w-md text-indigo-100">
                        <p className="mb-2">Generate Report To see detailed Reports about your Orders</p>
                    </div>
                    <div class="max-w-md text-indigo-100">
    <label class="inline-flex items-center">
    <span class="ml-2 mr-1">Completed</span>

        <input type="radio" name="status" value="completed" class="form-checkbox text-indigo-500" 
        onChange={(e) => setStatus(e.target.value)}></input>
    </label>
    <label class="inline-flex items-center">
    <span class="ml-2 mr-1">Pending</span>

        <input type="radio" name="status" value="pending" class="form-checkbox text-indigo-500"
        onChange={(e) => setStatus(e.target.value)}></input>
    </label>
    <label class="inline-flex items-center">
    <span class="ml-2 mr-1">Cancelled</span>

        <input type="radio" name="status" value="cancelled" class="form-checkbox text-indigo-500"
        onChange={(e) => setStatus(e.target.value)}></input>
    </label>
</div>

                    <div className="flex justify-end">
                        <button
                            onClick={handlePrint}
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Print Report
                        </button>
                    </div>
                   
                </div>
            </section>
            {/* New card */}
            <br></br>
            <br></br>
            <br></br>
            {/* product card */}
            <section className="">
                <div className="h-full max-w-xl mx-auto bg-orange-400 shadow-lg rounded-lg p-6">
                    <div className="flex items-start">
                        <svg className="fill-current flex-shrink-0 mr-5" width="30" height="30" viewBox="0 0 30 30">
                            <path className="text-orange-300" d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z" />
                            <path className="text-orange-200" d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z" />
                            <path className="text-orange-500" d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z" />
                        </svg>
                        <div className="flex-grow truncate">
                            <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1">Product Reports</h2>
                            <div className="flex items-center space-x-4 mb-4">
                                <label htmlFor="startDate" className="text-gray-200">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1"
                                />
                                <label htmlFor="endDate" className="text-gray-200">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1"
                                />
                            </div>
                           
                        </div>
                    </div>
                    <div className="max-w-md text-indigo-100">
                        <p className="mb-2">Generate Report To see detailed Reports about your Products Sold</p>
                    </div>
                    <div class="max-w-md text-indigo-100">
    <label class="inline-flex items-center">
    <span class="ml-2 mr-1">Most Sold</span>

        <input type="radio" name="status" value="most sold" class="form-checkbox text-indigo-500" 
        onChange={(e) => setPending(e.target.value)}></input>
    </label>
    <label class="inline-flex items-center">
    <span class="ml-2 mr-1">Least Sold</span>

        <input type="radio" name="status" value="least sold" class="form-checkbox text-indigo-500"
        onChange={(e) => setPending(e.target.value)}></input>
    </label>
    
</div>

                    <div className="flex justify-end">
                        <button
                            onClick={handlePrint2}
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Print Report
                        </button>
                    </div>
                   
                </div>
            </section>
            <br></br>
            <br></br>
            <br></br>
            {/* Payment Card */}
            <section className="">
                <div className="h-full max-w-xl mx-auto bg-orange-400 shadow-lg rounded-lg p-6">
                    <div className="flex items-start">
                        <svg className="fill-current flex-shrink-0 mr-5" width="30" height="30" viewBox="0 0 30 30">
                            <path className="text-orange-300" d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z" />
                            <path className="text-orange-200" d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z" />
                            <path className="text-orange-500" d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z" />
                        </svg>
                        <div className="flex-grow truncate">
                            <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1">Payment Reports</h2>
                            <div className="flex items-center space-x-4 mb-4">
                                <label htmlFor="startDate" className="text-gray-200">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1"
                                />
                                <label htmlFor="endDate" className="text-gray-200">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1"
                                />
                            </div>
                           
                        </div>
                    </div>
                    <div className="max-w-md text-indigo-100">
                        <p className="mb-2">Generate Report To see detailed Reports about your Payments</p>
                    </div>
                    <div class="max-w-md text-indigo-100">
    <label class="inline-flex items-center">
    <span class="ml-2 mr-1">Completed</span>

        <input type="radio" name="status" value="completed" class="form-checkbox text-indigo-500" 
        onChange={(e) => setPaymentStatus(e.target.value)}></input>
    </label>
    <label class="inline-flex items-center">
    <span class="ml-2 mr-1">Pending</span>

        <input type="radio" name="status" value="pending" class="form-checkbox text-indigo-500"
        onChange={(e) => setPaymentStatus(e.target.value)}></input>
    </label>
    <label class="inline-flex items-center">
    <span class="ml-2 mr-1">Cancelled</span>

        <input type="radio" name="status" value="cancelled" class="form-checkbox text-indigo-500"
        onChange={(e) => setPaymentStatus(e.target.value)}></input>
    </label>
</div>

                    <div className="flex justify-end">
                        <button
                            onClick={handlePrint3}
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Print Report
                        </button>
                    </div>
                   
                </div>
            </section>


            <br></br>
            <br></br>
            <br></br>
            {/* Courier Card */}
            <section className="">
                <div className="h-full max-w-xl mx-auto bg-orange-400 shadow-lg rounded-lg p-6">
                    <div className="flex items-start">
                        <svg className="fill-current flex-shrink-0 mr-5" width="30" height="30" viewBox="0 0 30 30">
                            <path className="text-orange-300" d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z" />
                            <path className="text-orange-200" d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z" />
                            <path className="text-orange-500" d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z" />
                        </svg>
                        <div className="flex-grow truncate">
                            <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1">Courier Reports</h2>
                            <div className="flex items-center space-x-4 mb-4">
                                <label htmlFor="startDate" className="text-gray-200">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1"
                                />
                                <label htmlFor="endDate" className="text-gray-200">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1"
                                />
                            </div>
                           
                        </div>
                    </div>
                    <div className="max-w-md text-indigo-100">
                        <p className="mb-2">Generate Report To see detailed Reports about Couriers you Used</p>
                    </div>
                   
                    <div className="flex justify-end">
                        <button
                            onClick={handlePrint4}
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Print Report
                        </button>
                    </div>
                   
                </div>
            </section>
            <br/>
            <br/>

        </>
    );
};

export default Report;
