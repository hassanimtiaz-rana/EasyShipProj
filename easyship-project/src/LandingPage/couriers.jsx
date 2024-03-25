import React from 'react';

const couriers = [
  'TCS',
  'M&P',
  'Trax',
  'Leopard',
  'DHL',
  'Swyft',
  'Call Courier',
  'And Many More...',
];

function Couriers() {
  return (
    <div className="p-4" id='courier'>
      <div className="mx-auto flex max-w-[70rem] flex-col justify-center rounded-lg bg-orange-500 bg-opacity-5 px-4 text-orange-500 dark:bg-opacity-20 md:h-[300px] lg:h-[400px] relative border border-orange-700">
        <div className="pointer-events-none absolute left-0 top-0 z-[-1] h-full w-full rounded-lg bg-white dark:bg-black"></div>
        <h1 className="mb-2 text-center text-4xl font-bold pb-8">Couriers Associated With Us</h1>
        <ul className="flex flex-wrap justify-center text-sm font-medium text-gray-700 dark:text-white sm:text-base md:mx-auto md:max-w-screen-sm pb-10 list-none">
          {couriers.map((courier, index) => (
            <li key={index} className="my-1 flex items-center">
              <svg
                className="mr-2 flex-shrink-0 text-orange-500"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
               
              </svg>
              {courier}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Couriers;
