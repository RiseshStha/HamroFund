import React, { useState } from "react";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
              Sign Up
            </h1>

            <p className="mt-6 text-gray-500">
              Create your account to get started
            </p>
          </div>

          <form action="#" className="mx-auto mb-0 mt-12 max-w-lg space-y-4">
          <div>
              <label htmlFor="email" className="sr-only">
                Full Name
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your FullName"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter email"
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
                    placeholder="Enter a password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
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
            <div>
              <label htmlFor="password" className="sr-only">
                Confirm Password
              </label>

              <div className="relative">
              <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
              </div>
            </div>

            <button
              type="submit"
              className=" mt-10 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Sign Up
            </button>
          </form>
          <div className="mx-auto mb-0 mt-8 max-w-lg space-y-5">
            <span className="text-gray-600">Already have an account? </span>
            <a href="/login" className="text-gray-900 font-medium">
              Login
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
