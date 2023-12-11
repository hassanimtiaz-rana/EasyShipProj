import easyShipLogo from './easyShipLogo.png';
import { HashLink as Link } from 'react-router-hash-link';

function NavbarUser() {
  return (
    <>
      <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900 fixed top-0 left-0 right-0 z-10">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <a href="#" className="flex items-center">
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
              <li>
                <Link smooth to="#" className="nav-link">Inventory</Link>
              </li>
              <li>
                <Link smooth to="#" className="nav-link">Dashboard</Link>
              </li>
              <li>
                <Link smooth to="#" className="nav-link">Orders</Link>
              </li>
              <li>
                <Link smooth to="#" className="nav-link">Payments</Link>
              </li>
              <li>
                <a href="#" className="nav-link">Reports</a>
              </li>
              <li>
                <a href="#" className="nav-link">Help</a>
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
