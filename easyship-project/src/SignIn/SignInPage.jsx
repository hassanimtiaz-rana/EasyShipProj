import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signInImage from './signIn.jpeg';
// import jwt_decode from 'jwt-decode';



function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useHistory
    const handleSignIn = () => {
        const url = 'https://localhost:7279/api/Auth/login';
        const data = {
            username: email,
            password: password,
            email: "string",
            storename: "string"
        };

        axios.post(url, data)
            .then((response) => {
               
                
                console.log('Logged in:', response.data);
                    
                toast.success('Login successful!');
                console.log('Before redirection');
                // navigate('/inventory');
                if (email === 'admin' && password === 'admin') {
                    navigate('/adminDashboard'); // Redirect to the admin dashboard
                } else {
                    navigate('/inventory', { state: { email } }); // Redirect to the inventory page for regular users
                }
                //  navigate('/inventory');
                 console.log('After redirection');
               // history.push('/inventory');
                // Store token in local storage or state for future use
            })
            .catch((error) => {
                console.error('Login error:', error.response.data);

                if (error.response.status === 400) {
                    toast.error('Wrong password or user not found.');
                } else {
                    toast.error('Login failed.');
                }
            });
    };

    return (
        <>
            <ToastContainer />
            <br></br>
            <br></br>
            <br></br>

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
                                placeholder="Email Address"
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
                            <a href="/signUp" className="text-xs text-gray-500 uppercase">or sign up</a>
                            <span className="border-b w-1/5 md:w-1/4"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignInPage;
