import React, { useState, useRef, useEffect } from 'react';
import easyShipLogo from './easyShipLogo.png';
import { HashLink as Link } from 'react-router-hash-link';

function NavbarUser() {
  const token = localStorage.getItem('token');
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const role = decodedToken.Role;

  const [showOrderMenu, setShowOrderMenu] = useState(false);
  const dropdownRef = useRef(null);

  const handleOrderMenu = () => {
    setShowOrderMenu(!showOrderMenu);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOrderMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900 fixed top-0 left-0 right-0 z-10">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <a href="" className="flex items-center">
            <img src={easyShipLogo} className="h-20 mr-3 sm:h-20" alt="EasyShip Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Easy Ship</span>
          </a>
          <div className="flex items-center lg:order-2">
            <div className="hidden mt-2 mr-4 sm:inline-block">
              <span></span>
            </div>
          </div>
          <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            {/* Use Tailwind responsive classes to show/hide based on screen size */}
            <ul className="hidden lg:flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {role === 'inventoryManager' && (
                <>
                  <li>
                    <a href="/my-team" className="nav-link">My Team</a>
                  </li>
                  <li>
                    <a href="/courier-recommendation" className="nav-link">Courier Recommendation</a>
                  </li>
                </>
              )}
              {role === 'orderManager' && (
                <>
                  <li>
                    <a href="/my-team" className="nav-link">My Team</a>
                  </li>
                  <li>
                    <a href="/inventory" className="nav-link">Inventory</a>
                  </li>
                </>
              )}
              {role === 'superuser' && (
                <>
                  <li>
                    <a href="/my-team" className="nav-link">My Team</a>
                  </li>
                  <li>
                    <a href="/inventory" className="nav-link">Inventory</a>
                  </li>
                  <li>
                    <a href="/courier-recommendation" className="nav-link">Courier Recommendation</a>
                  </li>
                  <li>
                    <a href="/help" className="nav-link">Help</a>
                  </li>
                  <li>
                    <a href="#" className="nav-link">Reports</a>
                  </li>
                </>
              )}
              <li className="relative" ref={dropdownRef}>
                <span className="nav-link cursor-pointer" onClick={handleOrderMenu}>
                  Order
                  <svg
                    className="h-5 w-5 inline-block ml-1 -mt-1.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 14.293a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L10 11.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {showOrderMenu && (
                  <ul className="absolute z-10 bg-white border border-gray-200 rounded-md mt-1 py-2 w-40">
                    <li>
                      <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                    </li>
                    <li>
                      <Link to="/Place-Order" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Place Order</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>
      <style>
        {`
          .nav-link {
            padding: 0.5rem 1rem;
            transition: color
            .nav-link {
              padding: 0.5rem 1rem;
              transition: color 0.3s ease-in-out;
            }
  
            .nav-link:hover,
            .nav-link:focus {
              color: #FFA500;
            }
  
            /* Hide the menu on small screens */
            @media (max-width: 640px) {
              .lg\:hidden {
                display: none;
              }
            }
          `}
        </style>
      </>
    );
  }
  
  export default NavbarUser;
  