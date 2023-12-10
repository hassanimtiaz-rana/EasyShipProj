import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// pricing component


function Pricing() {
  return (
    <>
     <section class="bg-white dark:bg-gray-900" id='price'>
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
        <div class="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
            <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Designed for E-Commerce Store
                Teams like yours</h2>
            <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Our Focus is To Automate
                E-Commerce Store & Managing all things at one place Which Will Help You Have Rapid Growth In Your Business.</p>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">

            <div
                class="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 class="mb-4 text-2xl font-semibold">Starter</h3>
                <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use</p>
                <div class="flex items-baseline justify-center my-8">
                    <span class="mr-2 text-5xl font-extrabold">500 pkr</span>
                    <span class="text-gray-500 dark:text-gray-400">/month</span>
                </div>

                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">

                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span>Order Management 50p/mo</span>
                    </li>
                    <li class="flex items-center space-x-3">

                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span>Inventory Management</span>
                    </li>
                    <li class="flex items-center space-x-3">

                    <FontAwesomeIcon icon={faTimes} className="text-red-500 dark:text-red-400" />
                        <span>Team size: <span class="font-semibold">None</span></span>
                    </li>
                    <li class="flex items-center space-x-3">

                    <FontAwesomeIcon icon={faTimes} className="text-red-500 dark:text-red-400" />
<span>Reporting</span>

</li>
<li class="flex items-center space-x-3">

<FontAwesomeIcon icon={faTimes} className="text-red-500 dark:text-red-400" />
<span>Role Base Access</span>
</li>
                    
                    
                </ul>
                <a href="#"
                    class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">Get
                    started</a>
            </div>

            <div
                class="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 class="mb-4 text-2xl font-semibold">Standard</h3>
                <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for Medium Sized Teams</p>
                <div class="flex items-baseline justify-center my-8">
                    <span class="mr-2 text-5xl font-extrabold">1500 pkr</span>
                    <span class="text-gray-500 dark:text-gray-400" dark:text-gray-400="">/month</span>
                </div>

                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">

                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span>Order Management</span>
                    </li>
                    <li class="flex items-center space-x-3">

                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span>Inventory Management</span>
                    </li>
                    <li class="flex items-center space-x-3">

                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span>Team size: <span class="font-semibold">3 Members</span></span>
                    </li>
                    <li class="flex items-center space-x-3">

                    <FontAwesomeIcon icon={faTimes} className="text-red-500 dark:text-red-400" />
<span>Reporting</span>

</li>
<li class="flex items-center space-x-3">

<FontAwesomeIcon icon={faTimes} className="text-red-500 dark:text-red-400" />
<span>Role Base Access</span>
</li>
                    
                </ul>
                <a href="#"
                    class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">Get
                    started</a>
            </div>

            <div
                class="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 class="mb-4 text-2xl font-semibold">Enterprise</h3>
                <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and
                    Enterprises.</p>
                <div class="flex items-baseline justify-center my-8">
                    <span class="mr-2 text-5xl font-extrabold">6000 pkr</span>
                    <span class="text-gray-500 dark:text-gray-400">/month</span>
                </div>

                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">

                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span>Order Management</span>
                    </li>
                    <li class="flex items-center space-x-3">

                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span>Inventory Management</span>
                    </li>
                    <li class="flex items-center space-x-3">

                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span>Team size: <span class="font-semibold">10 Members</span></span>
                    </li>
                    <li class="flex items-center space-x-3">

                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span>Reporting</span>
                        
                    </li>
                    <li class="flex items-center space-x-3">

                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span>Role Base Access</span>
                    </li>
                </ul>
                <a href="#"
                    class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900">Get
                    started</a>
            </div>
        </div>
    </div>
</section>
    </>
  );
}

export default Pricing;
