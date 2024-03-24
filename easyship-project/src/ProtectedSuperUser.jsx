import React from "react";
import { Navigate } from "react-router-dom";


function Protected(props) {
    const { component: Component } = props;

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
        // If not logged in, redirect to the login page
        return <Navigate to="/login" />;
    }

    // Decode the JWT token to extract user information
    const token = localStorage.getItem('token');
    // const decodedToken = jwt_decode(token);
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    // Extract the user role from the decoded token
    const userRole = decodedToken.Role; // Assuming 'role' is stored in the JWT payload
    
    // If the user role is not 'user', redirect to the login page
    if (userRole !== 'superuser') {
        return <Navigate to="/login" />;
    }

    // If logged in and the user role is 'user', render the protected component
    return (
        <div>
            <Component />
        </div>
    );
}

export default Protected;
