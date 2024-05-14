import React, { useState, useEffect } from 'react';
import DashboardCard from './dashboardCard';
import axios from 'axios';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryLine } from 'victory'; // Import VictoryLine
import NavbarUser from '../Navbars/navbarUser';



function UserDashboard() {
  // Decode the JWT token to extract user information
  const token = localStorage.getItem('token');
  // const decodedToken = jwt_decode(token);
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  console.log('token is',decodedToken);
  const storeName = decodedToken.Storename; // Assuming 'role' is stored in the JWT payload
  const [memberCount, setMemberCount] = useState(null);
  const [distinctProductCount, setDistinctProductCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingComplainCount, setPendingComplainCount] = useState(null);
  const [fixedComplainCount, setFixedComplainCount] = useState(null);
  const [topDistinctCouriers, setTopDistinctCouriers] = useState([]);
  const [orderStatusCounts, setOrderStatusCounts] = useState({
    Pending: 0,
    Completed: 0,
    Cancelled: 0
  });
  const [paymentStatusCounts, setPaymentStatusCounts] = useState({
    PaymentReceived: 0,
    PendingPayment: 0
  });
  const [mostCancelledCourier, setMostCancelledCourier] = useState(null);
  const [topSoldProducts, setTopSoldProducts] = useState([]); // State variable for top sold products

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('https://localhost:7279/getUserCountByStore', {
            params: {
            
              storeName: storeName,
             
            }
          });
          setMemberCount(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching user count:', error);
          setIsLoading(false);
        }
      };
      fetchData();
      const fetchData2 = async () => {
        try {
          const response = await axios.get('https://localhost:7279/getDistinctProductsCountByStore', {
            params: {
            
              storeName: storeName,
             
            }
          });
          setDistinctProductCount(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching user count:', error);
          setIsLoading(false);
        }
      };
      fetchData2();
      const fetchData3 = async () => {
        try {
          const response = await axios.get('https://localhost:7279/getTotalOrdersCountByStore', {
            params: {
            
              storeName: storeName,
             
            }
          });
          setOrderCount(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching user count:', error);
          setIsLoading(false);
        }
      };
      fetchData3();
      const fetchData4 = async () => {
        try {
          const response = await axios.get('https://localhost:7279/getPendingUserComplaintsCount', {
            params: {
            
              storeName: storeName,
             
            }
          });
          setPendingComplainCount(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching user count:', error);
          setIsLoading(false);
        }
      };
      fetchData4();
      const fetchData5 = async () => {
        try {
          const response = await axios.get('https://localhost:7279/getPendingUserFixedCount', {
            params: {
            
              storeName: storeName,
             
            }
          });
          setFixedComplainCount(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching user count:', error);
          setIsLoading(false);
        }
      };
      fetchData5();

      const fetchData6 = async () => {
        try {
          const response = await axios.get('https://localhost:7279/getOrderStatusCounts?', {
            params: { storeName: storeName }
          });
          setOrderStatusCounts(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching order counts:', error);
          setIsLoading(false);
        }
      };
  
      fetchData6();
      const fetchData7= async () => {
        try {
          const response = await axios.get('https://localhost:7279/getPaymentStatusCounts', {
            params: { storeName: storeName }
          });
          setPaymentStatusCounts(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching payment status counts:', error);
          setIsLoading(false);
        }
      };
  
      fetchData7();
      const fetchData8 = async () => {
        try {
          // Fetch data for other components
          const response = await axios.get('https://localhost:7279/getTopSoldProducts', {
            params: { storeName: storeName }
          });
          // Transform the data from object to array of objects
          const transformedData = Object.entries(response.data).map(([name, quantity]) => ({ name, quantity }));
          setTopSoldProducts(transformedData);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      };
      fetchData8();
      const fetchData9 = async () => {
        try {
          const response = await axios.get('https://localhost:7279/getTopDistinctMostUsedCouriers', {
            params: { storeName: storeName }
          });
          setTopDistinctCouriers(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching top distinct couriers:', error);
          setIsLoading(false);
        }
      };
      fetchData9();
      const fetchData10 = async () => {
        try {
          const response = await axios.get(`https://localhost:7279/getCourierWithMostCancelledOrders?storeName=${storeName}`);
          setMostCancelledCourier(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching most cancelled courier:', error);
          setIsLoading(false);
        }
      };
      fetchData10();
  
  }, []);

  return (
    <div className="bg-white">
      <NavbarUser/>
      <br />
      <br/>
      <br/>
      <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-20">
        {/* Card 1 */}
        <DashboardCard
          title="Total Team Members"
          value={isLoading ? 'Loading...' : memberCount} // Handle loading state
        />

        {/* Card 2 - User Count */}
        <DashboardCard
          title="Total Distinct Products"
          value={isLoading ? 'Loading...' : distinctProductCount} // Handle loading state

        />

        {/* Card 3 */}
        <DashboardCard
          title="Total Orders"
          value={isLoading ? 'Loading...' : orderCount} // Handle loading state

        />
 {/* Pie Chart - Complaints Summary */}
 <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">Complaints Summary</h3>
            <div style={{ height: '300px', width: '350px' }}>
              <VictoryPie
                data={[
                  { x: 'Pending', y: pendingComplainCount || 0 },
                  { x: 'Fixed', y: fixedComplainCount || 0 },
                ]}
                colorScale={['#FF6384', '#36A2EB']}
              />
            </div>
          </div>
        </div>
       
        {/* Pie Chart - Order Status Summary */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">Order Status Summary</h3>
            <div style={{ height: '300px', width: '350px' }}>
              <VictoryPie
                data={[
                    // (${orderStatusCounts.Pending})
                  {  x: `Pending `, y: orderStatusCounts.Pending  },
                  { x: `Completed `, y: orderStatusCounts.Completed },
                  { x: `Cancelled `, y: orderStatusCounts.Cancelled }
                ]}
                colorScale={['#FF6384', '#36A2EB', '#FFCE56']}
              />
            </div>
          </div>
        </div>
           {/* Pie Chart - Payment Status Summary */}
           <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">Payment Status Summary</h3>
            <div style={{ height: '300px', width: '350px' }}>
              <VictoryPie
                data={[
                  { x: `Payment Received: $${paymentStatusCounts.PaymentReceived}`, y: paymentStatusCounts.PaymentReceived },
                  { x: `Pending Payment: $${paymentStatusCounts.PendingPayment}`, y: paymentStatusCounts.PendingPayment }
                ]}
                colorScale={['#FF6384', '#36A2EB']}
              />
            </div>
          </div>
        </div>
        {/* New Row */}
        {/* Bar Chart - Most Cancelled Courier */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">Most Cancelled Orders By A Courier</h3>
            {isLoading ? (
              <p>Loading...</p>
            ) : mostCancelledCourier ? (
              <VictoryChart domainPadding={{ x: 50 }}>
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryBar
                  data={[{ courier: mostCancelledCourier.courier, count: mostCancelledCourier.count }]}
                  x="courier"
                  y="count"
                  barWidth={20}
                />
              </VictoryChart>
            ) : (
              <p>No data available.</p>
            )}
          </div>
        </div>
      
         {/* Bar Chart - Top Distinct Couriers */}
         <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">Couriers Available In More Cities</h3>
            <div style={{ height: '300px', width: '100%' }}>
              <VictoryChart domainPadding={{ x: 50 }} theme={VictoryTheme.material}>
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryBar
                  data={topDistinctCouriers.map(courier => ({
                    courier: courier.courier,
                    count: courier.count
                  }))}
                  x="courier"
                  y="count"
                  barWidth={20}
                />
              </VictoryChart>
            </div>
          </div>
        </div>
        <div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">Top Sold Products of Your Store</h3>
            <div style={{ height: '300px', width: '100%' }}>
              <VictoryChart domainPadding={{ x: 50 }}>
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryBar
                  data={topSoldProducts}
                  x="name"
                  y="quantity"
                  barWidth={20}
                />
              </VictoryChart>
            </div>
          </div>
          
        </div>
       


        </div>
       
      </div>
    </div>
  );
}

export default UserDashboard;
