import React from 'react';
import Lottie from 'react-lottie';
import aboutUsAnimation from './aboutUsAnimation.json'; // Replace 'aboutUsAnimation.json' with your animation file

function AboutUs() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: aboutUsAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <section className="bg-white" id='aboutUs'>
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Us</h2>
            <p className="mt-4 text-gray-600 text-lg font-sans">"Easy Ship" is a web-based business solution for e-commerce sellers. It will allow users to 
              manage their stores by tracking their orders at one place, managing cods and choosing the 
              best courier service by auto recommendation feature in order to save their time and money
            </p>
          </div>
          <div className="mt-12 md:mt-0">
            {/* Lottie animation component */}
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
