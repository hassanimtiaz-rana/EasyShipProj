import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signInImage from './signIn.jpeg';

//@ts-ignore  
// import jwt_decode from "jwt-decode";
//import jwtdecode from 'jwt-decode';
//import * as jwt_decode from 'jwt-decode';
// CommonJS require syntax
// const jwt_decode = require("jwt-decode");
// import {jwtDecode,JwtPayload} from 'jwt-decode';


function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = () => {
        const url = 'https://localhost:7279/api/Auth/login';
        const data = {
            username: email,
            password: password,
            email: "string",
            storename: "string",
            role:"string",
            verified: true,
            verificationToken: "string",
             resetPasswordToken: "string",
             resetPasswordTokenExpiration: "2024-03-16T22:20:00.506Z"
            
        };

        axios.post(url, data)
            .then((response) => {
                

                const token = response.data;
                localStorage.setItem('token', JSON.stringify(token));
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                // Storing the decoded token in local storage
                
                console.log('Decoded token',decodedToken);

                const role=decodedToken.Role;
               
                console.log('Logged in:', token);
                toast.success('Login successful!');
                // navigate('/HomePage');
                if (role === 'admin' ) {
                    navigate('/adminDashboard');
                } else {
                    navigate('/inventory', { state: { email } });
                }
            })
            .catch((error) => {
                console.error('Login error:', error.response ? error.response.data : error);
                if (error.response && error.response.status === 400) {
                    toast.error('Wrong password or user not found.');
                } else {
                    toast.error('Login failed.');
                }
            });
    };

    return (
        <>
        <br></br>
        <br></br>
        <br></br>

            <ToastContainer />
            <div className="py-16">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: `url(${signInImage})` }}>
                    </div>
                    <div className="w-full p-8 lg:w-1/2">
                        <h2 className="text-2xl font-semibold text-gray-700 text-center">Easy Ship</h2>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                            <a href="#" className="text-xs text-center text-gray-500 uppercase">login with Username</a>
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                        </div>
                        <div className="mt-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Username"
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none mb-4"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none mb-4"
                            />
                            <button
                                className="bg-orange-600 text-white font-bold py-2 px-4 w-full rounded hover:bg-orange-700"
                                onClick={handleSignIn}
                            >
                                Login
                            </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 md:w-1/4"></span>
                            <a href="/signUp" className="text-xs text-orange-500 uppercase">or sign up</a>
                            <span className="border-b w-1/5 md:w-1/4"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignInPage;
