import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const SignupPage = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (isOtpSent) {
            try {
                if (!email || !password || !otp) {
                    ErrorToast("Email, password & otp are required!");
                    return;
                }

                const dataObj = { email, password, otp };
                const result = await axiosInstance.post("/auth/signup", dataObj);

                if (result.status === 201) {
                    SuccessToast(result.data.message);
                    navigate("/login");
                } else {
                    ErrorToast(result.data.message);
                }
            } catch (err) {
                ErrorToast(`Cannot signup: ${err.response?.data?.message || err.message}`);
            }
        } else {
            ErrorToast(`Cannot signup before sending otp`);
        }
    };

    const handleSendOtp = async () => {
        try {
            const resp = await axiosInstance.post("/auth/send-otp", { email });
            if (resp.data.isSuccess) {
                SuccessToast(resp.data.message);
                setIsOtpSent(true);
            } else {
                SuccessToast(resp.data.message);
            }
        } catch (err) {
            console.log(err);
            ErrorToast(`Cannot send otp: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-teal-200 to-emerald-300 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-emerald-800">Create an Account</h2>

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

                    {isOtpSent && (
                        <>
                            <div>
                                <label htmlFor="user-otp" className="block text-gray-700 font-medium mb-1">
                                    OTP
                                </label>
                                <input
                                    id="user-otp"
                                    type="text"
                                    name="otp"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter the OTP"
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
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="flex flex-col items-center gap-4">
                    {isOtpSent ? (
                        <button
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    ) : (
                        <button
                            onClick={handleSendOtp}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                        >
                            Send OTP
                        </button>
                    )}

                    <p className="text-sm text-gray-600 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-emerald-700 font-medium underline hover:text-emerald-900">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export { SignupPage };
