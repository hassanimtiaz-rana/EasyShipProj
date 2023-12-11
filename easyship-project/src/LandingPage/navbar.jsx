import easyShipLogo from './easyShipLogo.png';
import { HashLink as Link } from 'react-router-hash-link';
//Navbar component

function Navbar() {
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
            <a href="/signIn"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">Sign In</a>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="true"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
              <Link smooth to="/#home" className="nav-link">Home</Link>
              </li>
              <li>
              <Link smooth to="/#feature" className="nav-link">Features</Link>
              </li>
              <li>
              <Link smooth to="/#courier" className="nav-link">Couriers</Link>
              </li>
              <li>
              <Link smooth to="/#price" className="nav-link">Pricing</Link>
              </li>
              <li>
                <a href="/#aboutUs" className="nav-link">About Us</a>
              </li>
              <li>
                <a href="/#contact" className="nav-link">Contact</a>
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
        `}
      </style>
    </>
  );
}

export default Navbar;