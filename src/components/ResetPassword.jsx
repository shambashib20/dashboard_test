import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 using react-icons
import { authService } from "../services/auth.service";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            await authService.resetPassword({ otp, newPassword: password });
            setMessage("Password reset successfully!");
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            setError(err.message || "Reset failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Reset Password</h2>

                {message && <p className="text-green-600 mb-4">{message}</p>}
                {error && <p className="text-red-600 mb-4">{error}</p>}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm mb-1">Otp received</label>
                        <input
                            type="text"
                            required
                            className="block w-full px-3 py-3 border rounded-lg"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm mb-1">New Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            className="block w-full px-3 py-3 border rounded-lg pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 top-6 flex items-center text-gray-500"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 rounded-lg text-white bg-[#032768] hover:bg-[#2d5396]"
                    >
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
