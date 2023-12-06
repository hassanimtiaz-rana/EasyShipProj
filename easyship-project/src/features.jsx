import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse, faClock, faBox, faChartBar } from '@fortawesome/free-solid-svg-icons';
// features component

function renderFeature(title, content, icon) {
  return (
    <div className="relative" key={title}>
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
          <FontAwesomeIcon icon={icon} /> {/* Render Font Awesome icon */}
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{title}</p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500">
        {content}
      </dd>
    </div>
  );
}

function Features() {
  return (
    <div className="py-12 bg-white" id='feature'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h1 className="text-base text-orange-600 font-semibold tracking-wide uppercase">Features</h1>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Which Makes Easy Ship Reliable
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {renderFeature(
              "Inventory Management",
              "Experience hassle-free inventory management with our smart inventory feature! Say goodbye to Excel sheets and hello to efficient inventory tracking. Easily manage your inventory and view low stock items in one click.",
              faWarehouse /* Use FontAwesome icon for inventory */
            )}

            {renderFeature(
              "Order Management",
              "Streamline your sales process effortlessly with our order workflows, synchronized order status across all channels, and simplified return management. Manage orders seamlessly across multiple sales channels, ensuring efficient operations and customer satisfaction.",
              faBox /* Use FontAwesome icon for order management */
            )}

            {renderFeature(
              "Tracking",
              "Empower your logistics with shipment tracking in one place. Take the lead in customer service by staying proactive - know the exact whereabouts of your shipments at all times. No more waiting for courier updates; with Easy Ship, you're in control of fulfillment from start to finish",
              faClock /* Use FontAwesome icon for tracking */
            )}

            {renderFeature(
              "Reporting",
              "Drive your business forward with reports that deliver actionable insights. Make informed decisions based on comprehensive analytics tailored for your shipping and logistics needs",
              faChartBar /* Use FontAwesome icon for reporting */
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Features;
