import React from 'react';
import landingImg from './landingImg.jpeg';
// Hero Section
function Hero() {
  return (
    <section className="sm:mt-6 lg:mt-8 mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">An E-Commerce Business</span>
            <span className="block text-orange-600 xl:inline">Solution</span>
          </h1>
          <p className="mt-3 font-sans text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            “Easy Ship” aims to introduce automation into order tracking, replacing the need for manual data entry and record-keeping. It is a centralized hub where users can find different couriers for delivery. The system will automatically choose the best courier by considering various factors, making the e-commerce store smooth, fast, and reliable.
          </p>
          {/* Button Section */}
          <div className="mt-40 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a href="/signUp" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10">
                Get started
              </a>
            </div>
            &nbsp;
            &nbsp;
            &nbsp;
            <div className="rounded-md shadow">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                Demo Video
              </a>
            </div>
          </div>
          {/* End of Button Section */}
        </div>
        {/* Image Section */}
        <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
          <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src={landingImg} alt="" />
        </div>
        {/* End of Image Section */}
      </div>
    </section>
  );
}

export default Hero;
