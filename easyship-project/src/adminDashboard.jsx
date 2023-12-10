import React from 'react';
import DashboardCard from './dashboardCard'; // Import the reusable component
import AdminNavbar from './adminNavbar';

function AdminDashboard() {
  return (
   
    <div className="bg-white">
         <AdminNavbar/>
         <br></br>
      <div className="grid gap-4 lg:gap-8 md:grid-cols-3 p-8 pt-20">
        {/* Card 1 */}
        <DashboardCard
          title="Revenue"
          value="$192.1k"
          changeValue="32k increase"
          changeType="increase"
        />

        {/* Card 2 */}
        <DashboardCard
          title="New customers"
          value="1340"
          changeValue="3% decrease"
          changeType="decrease"
        />

        {/* Card 3 */}
        <DashboardCard
          title="New Complaints"
          value="3543"
          changeValue="7% increase"
          changeType="increase"
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
