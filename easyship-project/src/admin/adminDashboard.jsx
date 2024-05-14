import React, { useState, useEffect } from 'react';
import DashboardCard from './dashboardCard';
import AdminNavbar from './adminNavbar';
import axios from 'axios';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryLine } from 'victory'; // Import VictoryLine

function AdminDashboard() {
  const [userCount, setUserCount] = useState(null);
  const [courierCount, setCourierCount] = useState(null);
  const [complainCount, setComplainCount] = useState(null);
  const [pendingComplainCount, setPendingComplainCount] = useState(null);
  const [fixedComplainCount, setFixedComplainCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [courierData, setCourierData] = useState(null); // State to store courier data
  const [usersByMonth, setUsersByMonth] = useState(null); // State to store users by month data

  useEffect(() => {
    axios.get('https://localhost:7279/getUsersCount')
      .then(response => {
        setUserCount(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user count:', error);
        setIsLoading(false);
      });

    axios.get('https://localhost:7279/getCouriersCount')
      .then(response => {
        setCourierCount(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courier count:', error);
        setIsLoading(false);
      });

    axios.get('https://localhost:7279/getComplaintsCount')
      .then(response => {
        setComplainCount(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching complaint count:', error);
        setIsLoading(false);
      });

    axios.get('https://localhost:7279/getPendingComplaintsCount')
      .then(response => {
        setPendingComplainCount(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching pending complaint count:', error);
        setIsLoading(false);
      });

    axios.get('https://localhost:7279/getPendingFixedCount')
      .then(response => {
        setFixedComplainCount(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching fixed complaint count:', error);
        setIsLoading(false);
      });

    axios.get('https://localhost:7279/getDistinctCourierCount')
      .then(response => {
        setCourierData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching distinct courier count:', error);
        setIsLoading(false);
      });

    axios.get('https://localhost:7279/getUsersByMonth') // Fetch users by month data
      .then(response => {
        setUsersByMonth(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users by month data:', error);
        setIsLoading(false);
      });
  }, []);

  // Function to format data for VictoryPie chart
  const formatBarChartData = () => {
    if (!courierData) return [];

    return courierData.map(courier => ({
      x: courier.courierName,
      y: courier.count,
    }));
  };

  // Function to format data for VictoryLine chart
  const formatLineChartData = () => {
    if (!usersByMonth) return [];

    return usersByMonth.map(user => ({
      x: `${user.month}-${user.year}`, // Combine month and year for x-axis
      y: user.count,
    }));
  };

  return (
    <div className="bg-white">
      <AdminNavbar />
      <br />
      <br/>
      <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-20">
        {/* Card 1 */}
        <DashboardCard
          title="Total Couriers"
          value={isLoading ? 'Loading...' : courierCount} // Handle loading state
        />

        {/* Card 2 - User Count */}
        <DashboardCard
          title="Total Users"
          value={isLoading ? 'Loading...' : userCount} // Handle loading state
        />

        {/* Card 3 */}
        <DashboardCard
          title="New Complaints"
          value={isLoading ? 'Loading...' : complainCount} // Handle loading state
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

        {/* Bar Chart - Distinct Courier Count */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">Courier Available In Cities</h3>
            <div style={{ height: '300px', width: '350px' }}>
              <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryBar data={formatBarChartData()} />
              </VictoryChart>
            </div>
          </div>
        </div>

        {/* Line Chart - Users By Month */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">Users By Month</h3>
            <div style={{ height: '300px', width: '350px' }}>
              <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryLine data={formatLineChartData()} />
              </VictoryChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
