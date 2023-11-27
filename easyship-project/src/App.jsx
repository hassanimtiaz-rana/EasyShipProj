import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomePage from './homePage';
import {  Routes, Route } from "react-router-dom";
import Navbar from './navbar.jsx';
import Hero from './hero.jsx';
import Features from './features.jsx';
import Couriers from './couriers.jsx';
import Pricing from './pricing.jsx';
import Footer from './footer.jsx';
import SignIn from './SignInPage.jsx';
import SignUp from './SignUp';


function App() {
  return (
    <div>
      {/* <Navbar />
      <Hero />
      <Features />
      <Couriers />
      
      <Pricing />
      <Footer /> */}
      {/* <Navbar/> */}
      
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/HomePage" element={<HomePage />}/>
        <Route path="/SignIn" element={<SignIn />}/>
        <Route path="/SignUp" element={<SignUp />}/>



        {/* <Route path="/price" element={<Pricing />}/>
        <Route path="/Feature" element={<Features />}/> */}
       
      </Routes>
    </div>
  );
}

export default App;
