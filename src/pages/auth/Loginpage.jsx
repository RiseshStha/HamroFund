import React, { useState } from "react";
import { loginUserApi } from "../../apis/Api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUserApi(formData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.userData));
        navigate("/");
        window.location.reload();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () =>{
    navigate("/forgot_password");
  }

  return (
    <div className="lg:h-[90.6vh] bg-gradient-to-br from-green-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-6xl shadow-2xl rounded-2xl overflow-hidden bg-white">
        {/* Left Side - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0 bg-black/40" />
          <img
            className="h-full w-full object-cover"
            src="https://www.ideaplotting.com/wp-content/uploads/2017/12/tips-crowdfunding.jpeg"
            alt="Crowdfunding"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white p-12">
            <div className="space-y-6 max-w-lg">
              <h2 className="text-4xl font-bold">Welcome Back!</h2>
              <p className="text-lg">
                Join our community and make a difference through crowdfunding
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 px-6 py-12 sm:px-12 lg:px-16">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
              <p className="mt-3 text-gray-600">Welcome back! Please enter your details</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-11 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-11 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  onClick={handleForgotPassword}
                  type="button" className="text-sm text-green-600 hover:text-green-700">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-stone-800 text-white py-3 px-4 rounded-lg hover:bg-stone-900 
                transition-colors focus:outline-none focus:ring-2 focus:ring-stone-700 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>

              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;