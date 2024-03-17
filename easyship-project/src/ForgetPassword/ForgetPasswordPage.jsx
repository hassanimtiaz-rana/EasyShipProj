import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const handleForgetPassword = () => {
        const url = 'https://localhost:7279/api/Auth/forgot-password';
        const params = { email };

        axios.post(url, null, { params })
            .then((response) => {
                console.log('Password reset email sent:', response.data);
                toast.success('Password reset email sent successfully!');
            })
            .catch((error) => {
                console.error('Forget password error:', error.response ? error.response.data : error);
                toast.error('Error occurred during password reset.');
            });
    };

    return (
        <>
            <ToastContainer />
            <div className="py-16">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="py-8 px-4">
                        <h2 className="text-2xl font-semibold text-gray-700 text-center">Forget Password</h2>
                        <div className="mt-6">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none mb-4"
                            />
                            <button
                                className="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-700"
                                onClick={handleForgetPassword}
                            >
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPasswordPage;
