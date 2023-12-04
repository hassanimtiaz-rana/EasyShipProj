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
import UserLanding from './userLanding.jsx';


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
        <Route path="/" element={<HomePage/>}/>
        <Route path="/HomePage" element={<HomePage />}/>
        <Route path="/signIn" element={<SignIn />}/>
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/userLanding" element={<UserLanding />}/>

        


        {/* <Route path="/price" element={<Pricing />}/>
        <Route path="/Feature" element={<Features />}/> */}
       
      </Routes>
    </div>
  );
}

export default App;
