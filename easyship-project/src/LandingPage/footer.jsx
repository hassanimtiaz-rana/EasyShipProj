import React from "react";
import { HashLink as Link } from 'react-router-hash-link';

function Footer() {
  return (
    <>
   <footer class="flex flex-col space-y-10 justify-center m-10" id='contact'>

<nav class="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
<Link smooth to="/#home" className="hover:text-orange-600">Home</Link>
<Link smooth to="/#feature" className="hover:text-orange-600">Features</Link>
<Link smooth to="/#courier" className="hover:text-orange-600">Couriers</Link>
<Link smooth to="/#price" className="hover:text-orange-600">Pricing</Link>
<Link smooth to="/#aboutUs" className="hover:text-orange-600">About Us</Link>
<Link smooth to="/#contact" className="hover:text-orange-600">Contact</Link>

</nav>

<div class="flex justify-center space-x-5">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
    </a>
    <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
    </a>
</div>
<p class="text-center text-gray-700 font-medium">&copy; 2023 Easy Ship Ltd. All rights reservered.</p>
</footer>
    </>
  );
}

export default Footer;
