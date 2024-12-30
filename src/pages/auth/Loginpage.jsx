import React, { useState } from "react";
import { loginUserApi } from "../../apis/Api"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom"; // Make sure you have react-router-dom installed

const Loginpage = () => {
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
        // Store the token
        localStorage.setItem("token", response.data.token);
        // Store user data if needed
        localStorage.setItem("userData", JSON.stringify(response.data.userData));
        // Redirect to dashboard or home page
        navigate("/"); // Adjust the route as needed
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative flex flex-wrap lg:h-[90.6vh] lg:items-center">
        <div className="relative hidden md:block h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://www.ideaplotting.com/wp-content/uploads/2017/12/tips-crowdfunding.jpeg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="w-full border-2 border-gray-200 shadow-md rounded-lg px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-12 lg:h-full">
          <div className="mx-auto mb-0 mt-8 max-w-lg space-y-5">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Get started today!
            </h1>

            <p className="mt-6 text-gray-500">
              Crowdfunding way to build your fortune and organization
            </p>
          </div>

          {error && (
            <div className="mx-auto mt-4 max-w-lg">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-12 max-w-lg space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter email"
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter a password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-10 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          
          <div className="mx-auto mb-0 mt-10 max-w-md space-y-4">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="/signup" className="text-gray-900 font-medium">
              Sign Up
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Loginpage;