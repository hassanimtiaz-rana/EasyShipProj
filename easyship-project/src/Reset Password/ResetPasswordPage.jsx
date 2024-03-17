import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { email, resetToken } = useParams();

    useEffect(() => {
        if (!email || !resetToken) {
            toast.error('Email or reset token missing.');
            // Optionally, redirect the user to an error page or another page
        }
    }, [email, resetToken]);

    const handleResetPassword = () => {
        // Validate password and confirm password
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        const url = 'https://localhost:7279/api/Auth/reset-password';
        const data = { email, newPassword: password, resetToken };

        axios.post(url, null, { params: data })
            .then((response) => {
                console.log('Password reset successful:', response.data);
                toast.success('Password reset successful!');
                // Optionally, redirect the user to a login page or another page
            })
            .catch((error) => {
                console.error('Reset password error:', error.response ? error.response.data : error);
                toast.error('Error occurred during password reset.');
            });
    };

    return (
        <div>
            <ToastContainer />
            <div className="py-16">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="py-8 px-4">
                        <h2 className="text-2xl font-semibold text-gray-700 text-center">Reset Password</h2>
                        <div className="mt-6">
                    
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none mb-4"
                            />
                             <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none mb-4"
                            />
                            <button
                                className="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-700"
                                onClick={handleResetPassword}
                            >
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
