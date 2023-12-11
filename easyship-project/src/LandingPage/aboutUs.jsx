import React from 'react';
import aboutUsImage from './aboutus.jpeg';
import signup from './signUp.jpeg'

function AboutUs() {
  return (
    <>
      <section className="bg-white" id='aboutUs'>
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Us</h2>
              <p className="mt-4 text-gray-600 text-lg">"Easy Ship" is a web-based business solution for e-commerce sellers. It will allow users to 
manage their stores by tracking their orders at one place, managing cods and choosing the 
best courier service by auto recommendation feature in order to save their time and money
</p>
              
            </div>
            <div className="mt-12 md:mt-0">
              <img src={aboutUsImage} alt="About Us Image" className="object-cover rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
