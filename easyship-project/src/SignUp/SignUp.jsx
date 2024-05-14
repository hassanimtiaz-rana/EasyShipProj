import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import animationData from './data.json';
import Navbar from './navbar';



function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [storename, setStorename] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Track loading state

    const handleSignUp = () => {
        if (!validateFields()) return;

        setIsLoading(true); // Set isLoading to true when registering
        const url = 'https://localhost:7279/api/Auth/register';
        const data = {
            username: username,
            password: password,
            email: email,
            storename: storename,
            role: "superuser",
            verified: true,
            verificationToken: "string",
            resetPasswordToken: "string",
            resetPasswordTokenExpiration: "2024-03-16T22:20:00.506Z"
        };

        axios.post(url, data)
            .then((result) => {
                toast.success('User has been added');
            })
            .catch((error) => {
                handleRegistrationError(error);
            })
            .finally(() => {
                setIsLoading(false); // Reset isLoading after registration completes or fails
            });
    };

    const handleInputChange = (e, setterFunc, maxLength) => {
        const value = e.target.value.trim(); // Remove leading and trailing spaces
        if (value.length <= maxLength) {
            setterFunc(value);
        }
    };

    const validateFields = () => {
        if (
            username.length < 5 ||
            password.length < 5 ||
            email.length < 5 ||
            storename.length < 5 ||
            username.length > 15 ||
            password.length > 15 ||
            email.length > 40 ||
            storename.length > 30
        ) {
            toast.error('Character Length Not Enough');
            return false;
        }
        return true;
    };

    const handleRegistrationError = (error) => {
        if (error.response && error.response.status === 400 && error.response.data === 'Username already exists') {
            toast.error('Username already exists');
        } else if (error.response && error.response.status === 400 && error.response.data === 'Email already exists') {
            toast.error('Email already exists');
        } else if (error.response && error.response.status === 400 && error.response.data === 'Storename already exists') {
            toast.error('Storename already exists');
        }else if (error.response && error.response.status === 400 && error.response.data === 'Username must contain only letters and numbers (no special characters).') {
            toast.error('Username must contain only letters and numbers (no special characters).');
        }
        else if (error.response && error.response.status === 400 && error.response.data === 'Invalid email format') {
            toast.error('Invalid Email Entered');
        }
         else {
            toast.error('Error registering user');
        }
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <>
            <Navbar />
            <div className="h-full bg-white dark:bg-gray-900">
                <ToastContainer /> {/* ToastContainer for notifications */}
                <div className="mx-auto">
                    <div className="flex justify-center px-6 py-12">
                        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                            <div className="w-full h-auto bg-white dark:bg-white hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <Lottie options={defaultOptions} height={400} width={400} />
                            </div>
                            <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                                <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Create an Account!</h3>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => handleInputChange(e, setUsername, 15)}
                                        placeholder="Username"
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => handleInputChange(e, setPassword, 15)}
                                        placeholder="Password"
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    <p className
="text-xs italic text-orange-500">Please choose a password.</p>
</div>
<div className="mb-4">
    <input
        type="text"
        value={email}
        onChange={(e) => handleInputChange(e, setEmail, 40)}
        placeholder="Email"
        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        required
    />
</div>
<div className="mb-4">
    <input
        type="text"
        value={storename}
        onChange={(e) => handleInputChange(e, setStorename, 15)}
        placeholder="Storename"
        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        required
    />
</div>
<div className="mb-6 text-center">
    <button
        className={`w-full px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        type="button"
        onClick={handleSignUp}
        disabled={isLoading} // Disable button based on isLoading state
    >
        {isLoading ? 'Registering...' : 'Register Account'}
    </button>
</div>
<hr className="mb-6 border-t" />
<div className="text-center">
    <a className="inline-block text-sm text-orange-500 dark:text-blue-500 align-baseline hover:text-orange-800" href="/login">
        Already have an account? Login!
    </a>
</div>
</div>
</div>
</div>
</div>
</div>
</>
);
}

export default SignUp;
