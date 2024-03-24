import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import NavbarUser from "./navbarUser";
import Faq from "./faq";

function Help() {
    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const email = decodedToken.Email;
    const username = decodedToken.Username;
    const storename = decodedToken.Storename;

    const [selectedIssue, setSelectedIssue] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            Username: username,
            Email: email,
            Message: message,
            Storename: storename,
            Type: selectedIssue,
            Status: "Pending",
            Time: new Date().toISOString()
        };

        try {
            setIsSubmitting(true); // Set isSubmitting to true when form is submitted
            const response = await axios.post("https://localhost:7279/api/HelpRequest/submit", formData);
            console.log(response.data);
            toast.success('Request Submitted');
        } catch (error) {
            toast.error(error.message);
            console.error("Error submitting help request:", error);
        } finally {
            setIsSubmitting(false); // Set isSubmitting back to false after request is completed
        }
    };

    useEffect(() => {
        if (isSubmitting) {
            // Clear fields after toast success message is displayed
            setTimeout(() => {
                setSelectedIssue("");
                setMessage("");
            }, 3000); // 3000 milliseconds = 3 seconds (adjust as needed)
        }
    }, [isSubmitting]);

    return (
        <>
        <NavbarUser/>
        <br/>
        <br/>
        <br/>
        <br/>
            <div className="mx-14 mt-10 border-2 border-orange-500 rounded-lg">
                <div className="mt-10 text-center font-bold">Help Portal</div>
                <div className="mt-3 text-center text-2xl font-bold">Get Help from Us...</div>
                <div className="p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                name="name"
                                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                                placeholder="Full Name *"
                                value={username}
                                disabled
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                                placeholder="Email *"
                                value={email}
                                disabled
                                required
                            />
                        </div>
                        <div className="my-6">
                            <select
                                name="select"
                                id="select"
                                className="block w-full rounded-md border border-slate-300 bg-white px-3 py-4 font-semibold text-gray-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                                value={selectedIssue}
                                onChange={(e) => setSelectedIssue(e.target.value)}
                                required
                            >
                                <option value="">Select an Issue</option>
                                <option value="inventory">Inventory Management Issue</option>
                                <option value="order">Order Management Issue</option>
                                <option value="payment">Payment Issue</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div className="">
                            <textarea
                                name="textarea"
                                id="text"
                                cols="30"
                                rows="10"
                                className="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-300"
                                placeholder="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`cursor-pointer rounded-lg bg-orange-700 px-6 py-4 text-sm font-semibold text-white ${
                                    isSubmitting ? "opacity-50" : ""
                                }`}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
            <Faq/>
        </>
    );
}

export default Help;
