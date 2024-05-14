import React from 'react';

const DashboardCard = ({ title, value }) => {
  return (
    <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-200">
          <span>{title}</span>
        </div>

        <div className="text-3xl">{value}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
