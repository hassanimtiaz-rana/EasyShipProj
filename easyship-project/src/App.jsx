import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomePage from './LandingPage/homePage.jsx';
 import {  Routes, Route } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
import Protected from './Protected.jsx';
import ProtectedAdmin from './ProtectedAdmin.jsx';
import ForgetPasswordPage from './ForgetPassword/ForgetPasswordPage.jsx';
import ResetPasswordPage from './Reset Password/ResetPasswordPage.jsx';
import CourierRecommendation from './Courier Recommendation/CourierRecommendation.jsx';
import Help from './Help/help.jsx';
import UserManagement from './Team/team.jsx';
import OrderPage from './Order/OrderPage.jsx';
import MyOrder from './MyOrder/MyOrder.jsx';
import OrderManagement from './MockApi/OrderManagement.jsx';


// import UserRoute  from './ProtectedRoutes.jsx';


function App() {
  return (
    <div>
      
      
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/HomePage" element={<HomePage />}/>
        <Route path="/AdminDashboard" element={<AdminDashboard />}/>
        <Route path="/manageCouriers" element={<ManageCouriers />}/>
        <Route path="/my-team" element={<UserManagement />}/>
        <Route path="/inventory" element={<CrudInventory />}/>
        <Route path="/help" element={<Help />}/>
        <Route path="/manageComplaints" element={<ManageComplaints />}/>
        <Route path="/Place-Order" element={<OrderPage />}/>
        <Route path="/my-orders" element={<MyOrder />}/>
        <Route path="/mock" element={<OrderManagement />}/>









        <Route path="/forgotpassword" element={<ForgetPasswordPage />}/>
        {/* <Route path="/api/auth/reset-password"> */}
        <Route path="/api/auth/reset-password/:email/:resetToken" element={<ResetPasswordPage />}/>
        <Route path="/login" element={<SignIn />}/>
        <Route path="/courier-recommendation" element={<CourierRecommendation />}/>
        {/* <Route path="/opg" element={<CourierRecommendation />}/> */}

        
        <Route path="/manageUsers" element={<ManageUsers />}/>
        <Route path="/signUp" element={<SignUp />}/>
        {/* <Route path="/inventory" element={<Protected component={CrudInventory} />} /> */}
        {/* //Admin */}
        {/* <Route path="/adminDashboard" element={<ProtectedAdmin component={AdminDashboard} />} /> */}
        {/* <Route path="/manageUsers" element={<ProtectedAdmin component={ManageUsers} />} /> */}
        {/* <Route path="/manageCouriers" element={<ProtectedAdmin component={ManageCouriers} />} /> */}
        {/* <Route path="/manageComplaints" element={<ProtectedAdmin component={ManageComplaints} />} /> */}



        


         {/* <Route path="/inventory" element={<UserRoute Component={CrudInventory} />} />   */}
       
       {/* <Route path="/inventory" element={<CrudInventory />}/>   */}
// Other protected routes...
 {/* <Route path="/adminDashboard" element={<Protected Component={AdminDashboard} />} />  */}
         {/* <Route path="/adminDashboard" element={<AdminDashboard />}/> */}
        {/* <Route path="/manageUsers" element={<ManageUsers />}/>
        <Route path="/manageCouriers" element={<ManageCouriers />}/>
        <Route path="/manageComplaints" element={<ManageComplaints />}/> */}



    
       
      </Routes>
      
      
    </div>
  );
}

export default App;
