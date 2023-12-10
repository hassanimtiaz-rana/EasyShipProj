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
import { HashLink as Link } from 'react-router-hash-link';
import InventoryCrud from './inventoryCrud.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import CrudInventory from './crudInventory.jsx';


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
        <Route path="/userPage" element={<UserLanding />}/>
        <Route path="/inventory" element={<CrudInventory />}/>


        
        {/* <Route path="/aboutus" element={<Footer />}/>
        <Route path="/courier" element={<Couriers />}/>
        <Route path="/price" element={<Pricing />}/>
        <Route path="/feature" element={<Features />}/> */}
       
      </Routes>
    </div>
  );
}

export default App;
