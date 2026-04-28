import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

import { authService } from "../services/auth.service";
function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({

    password: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await authService.login(formData);
      const { token, student } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("student", JSON.stringify(student));

        const details = await authService.student_details({
          mobile_number: student.phone_number,
        });

        console.log("Student details:", details);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {/* Logo + Heading */}
            <div className="text-center mb-8">
              <div className="mx-auto h-32 w-32 flex items-center justify-center">
                <img
                  src={logo}
                  alt="company"
                  className="h-full w-full object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Student Login</h2>
              <p className="mt-2 text-gray-600">Sign in to your account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}

   {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm"
                  placeholder="Enter phone number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>
              {/* Password */}
              <div>
                {/* <div className="mt-2 text-sm bg-blue-50 text-blue-800 border border-blue-300 px-3 py-2 rounded-md shadow-sm">
                  <p>
                    <strong>Note:</strong> Enter your Aadhaar number as the password.
                    If Aadhaar was not provided during admission, use the default password:
                    <strong>12345678</strong>.
                  </p>
                </div> */}
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiLockPasswordFill />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                {/* Information Box */}

              </div>

           

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 rounded-lg text-white bg-[#032768] hover:bg-[#2d5396] ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </div>

              {/* Signup Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Don’t have an account?{" "}
                <Link
                  to="/"
                  className="font-semibold text-[#032768] hover:underline"
                >
                  Create one
                </Link>
              </p>


              <div className="text-center text-sm text-gray-600 mt-4">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#032768] hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
