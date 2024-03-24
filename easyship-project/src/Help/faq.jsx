import React from "react"
function Faq(){
return(
    <>
    <div class="bg-white">
    <div class="max-w-screen-xl mx-auto pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:pt-20 lg:pb-28 lg:px-8">
        <h2 class="text-3xl leading-9 font-extrabold text-gray-900 text-center">
            Frequently asked questions
        </h2>
        <div class="mt-6 border-t-4 border-gray-100 pt-10">
            <div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-12">
                <dl>
                    <dt class="font-medium leading-6 text-gray-900 text-lg mt-4">What is the return policy for your
                        products?</dt>
                    <dd class="mt-4">
                        <p class="leading-6 text-base text-gray-500">
                            Our return policy allows customers to return products within 30 days of purchase for a full
                            refund or exchange.
                        </p>
                    </dd>
                </dl>

                <dl>
                    <dt class="font-medium leading-6 text-gray-900 text-lg mt-4">
                        How do I track my order?
                    </dt>
                    <dd class="mt-4">
                        <p class="leading-6 text-base text-gray-500">
                            You can track your order by logging into your account on our website and viewing the
                            tracking information provided.
                        </p>
                    </dd>
                </dl>

                <dl>
                    <dt class="font-medium leading-6 text-gray-900 text-lg mt-4">
                        What are the shipping options available?
                    </dt>
                    <dd class="mt-4">
                        <p class="leading-6 text-base text-gray-500">
                            We offer standard and expedited shipping options for all orders. Delivery times and prices
                            will vary depending on your location and the size of your order.
                        </p>
                    </dd>
                </dl>

                <dl>
                    <dt class="font-medium leading-6 text-gray-900 text-lg mt-4">
                        What are the hours of operation?
                    </dt>
                    <dd class="mt-4">
                        <p class="leading-6 text-base text-gray-500">
                            Our customer service department is open Monday-Friday, 9am-5pm EST.
                        </p>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</div>
    </>
)

}
export default Faq;