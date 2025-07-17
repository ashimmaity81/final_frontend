import { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            if (!email || !password) {
                ErrorToast("Email & password are required!");
                return;
            }

            const dataObj = { email, password };
            const result = await axiosInstance.post("/auth/login", dataObj);

            if (result.status === 200) {
                SuccessToast(result.data.message);
                window.open("/", "_self");
            } else {
                ErrorToast(result.data.message);
            }
        } catch (err) {
            ErrorToast(`Cannot signup: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-teal-200 to-emerald-300 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-emerald-800">Login to Your Account</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="user-email" className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            id="user-email"
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="user-password" className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            id="user-password"
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
                            placeholder="Enter your password"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={handleRegister}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                    >
                        Login
                    </button>

                    <p className="text-sm text-gray-600 text-center">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-emerald-700 font-medium underline hover:text-emerald-900">
                            Signup here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export { LoginPage };
