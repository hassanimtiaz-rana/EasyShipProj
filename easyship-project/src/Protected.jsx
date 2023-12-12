import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

function Protected(props) {
    const { Component } = props;
    const isLoggedIn = localStorage.getItem('login');

    if (!isLoggedIn) {
        return <Navigate to="/signIn" />; // Redirect to the signIn page
    }

    return (
        <div>
            <Component />
        </div>
    );
}

export default Protected;
