import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        setError("");

        try {
            // Call your backend API (make sure authService has this endpoint)
            await authService.forgotPassword({ email });
            setMessage("If an account exists with this email, a otp has been sent.");
            setTimeout(() => {
                navigate("/reset-password");
            }, 1500);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
                            Forgot Password
                        </h2>
                        <p className="text-gray-600 text-center mb-6">
                            Enter your email to receive an otp to reset password
                        </p>

                        {message && (
                            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
                                <p className="text-sm text-green-700">{message}</p>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Email Input */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full flex justify-center py-3 px-4 rounded-lg text-white bg-[#032768] hover:bg-[#2d5396] ${isLoading ? "opacity-75 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {isLoading ? "Sending..." : "Send Otp"}
                                </button>
                            </div>
                        </form>

                        {/* Back to Login */}
                        <p className="text-center text-sm text-gray-600 mt-6">
                            Remembered your password?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-[#032768] hover:underline"
                            >
                                Back to login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
