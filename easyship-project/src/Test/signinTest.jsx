import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        const url = 'https://localhost:7279/api/Auth/login';
        const data = {
            username: email,
            password: password
        };

        axios.post(url, data)
            .then((response) => {
                console.log('Logged in:', response.data);
                toast.success('Login successful!');
                // Store token in local storage or state for future use
            })
            .catch((error) => {
                console.error('Login error:', error.response.data);

                if (error.response.status === 400) {
                    toast.error('Wrong password or user not found.');
                } else {
                    toast.error('Login failed. Please try again later.');
                }
            });
    };

    return (
        <>
            <ToastContainer />
            <div className="py-16">
                {/* Your sign-in form JSX */}
                <div className="w-full p-8 lg:w-1/2">
                    {/* Input fields for email and password */}
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
                    {/* ... */}
                </div>
            </div>
        </>
    );
}

export default SignInPage;
