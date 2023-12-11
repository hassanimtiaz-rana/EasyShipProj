import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomePage from './LandingPage/homePage.jsx';
import {  Routes, Route } from "react-router-dom";
import Navbar from './LandingPage/navbar.jsx';
import Hero from './LandingPage/hero.jsx';
import Features from './LandingPage/features.jsx';
import Couriers from './LandingPage/couriers.jsx';
import Pricing from './LandingPage/pricing.jsx';
import Footer from './LandingPage/footer.jsx';
import SignIn from './SignIn/SignInPage.jsx';
import SignUp from './SignUp/SignUp.jsx';
import UserLanding from './Test/userLanding.jsx';
import { HashLink as Link } from 'react-router-hash-link';
import InventoryCrud from './Test/inventoryCrud.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import CrudInventory from './Inventory/crudInventory.jsx';
import AdminDashboard from './admin/adminDashboard.jsx';
import ManageUsers from './admin/manageUsers.jsx';
import ManageCouriers from './admin/manageCouriers.jsx';
import ManageComplaints from './admin/manageComplaints.jsx';


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
        <Route path="/adminDashboard" element={<AdminDashboard />}/>
        <Route path="/manageUsers" element={<ManageUsers />}/>
        <Route path="/manageCouriers" element={<ManageCouriers />}/>
        <Route path="/manageComplaints" element={<ManageComplaints />}/>



        



        
        {/* <Route path="/aboutus" element={<Footer />}/>
        <Route path="/courier" element={<Couriers />}/>
        <Route path="/price" element={<Pricing />}/>
        <Route path="/feature" element={<Features />}/> */}
       
      </Routes>
    </div>
  );
}

export default App;
