import easyShipLogo from './easyShipLogo.png';
import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const handleLogout = () => {
  localStorage.removeItem('token');
};

function AdminNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900 fixed top-0 left-0 right-0 z-10">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <a href="#" className="flex items-center">
            <img src={easyShipLogo} className="h-20 mr-3 sm:h-20" alt="EasyShip Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Easy Ship</span>
          </a>
          {/* Toggle button for mobile screens */}
          <button
            className="lg:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          {/* Mobile menu */}
          <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li><a href="/adminDashboard" className="nav-link">Dashboard</a></li>
              <li><a href="/manageUsers" className="nav-link">Manage Users</a></li>
              <li><a href="/manageComplaints" className="nav-link">Manage Complaints</a></li>
              <li><a href="/manageCouriers" className="nav-link">Manage Couriers</a></li>
              <a
                href="/login"
                className="nav-link"
                style={{ color: '#ea580c' }}
                onMouseOver={(e) => e.target.style.color = '#FFA500'}
                onMouseOut={(e) => e.target.style.color = '#ea580c'}
                onClick={handleLogout}
              >
                Log Out
              </a>
            </ul>
          </div>
          {/* Desktop menu */}
          <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="hidden lg:flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li><a href="/adminDashboard" className="nav-link">Dashboard</a></li>
              <li><a href="/manageUsers" className="nav-link">Manage Users</a></li>
              <li><a href="/manageComplaints" className="nav-link">Manage Complaints</a></li>
              <li><a href="/manageCouriers" className="nav-link">Manage Couriers</a></li>
              <a
                href="/login"
                className="nav-link"
                style={{ color: '#ea580c' }}
                onMouseOver={(e) => e.target.style.color = '#FFA500'}
                onMouseOut={(e) => e.target.style.color = '#ea580c'}
                onClick={handleLogout}
              >
                Log Out
              </a>
            </ul>
          </div>
        </div>
      </nav>
      <style>
        {`
          .nav-link {
            padding: 0.5rem 1rem;
            transition: color 0.3s ease-in-out;
          }

          .nav-link:hover,
          .nav-link:focus {
            color: #FFA500;
          }
        `}
      </style>
    </>
  );
}

export default AdminNavbar;
