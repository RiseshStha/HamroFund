import React, { useEffect, useState } from "react";
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const [showMobileMenu, setShowmobileMenu] = useState(false);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  return (
    <>
      <div className="relative top-0 left-0 w-full z-10 bg-white">
        <div className="mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-20 bg-transparent">
          <img src={logo} alt="HamroFund" className="w-16"/>

          <div className="flex gap-20 items-center">
            <button className="hidden md:block px-10 py-2 bg-green-600 text-white rounded-md">
              Start a Campaign
            </button>
            <div className="hidden md:flex gap-20">
              <a
                href="/how-it-works"
                className="cursor-pointer hover:text-gray-400 text-black"
              >
                How it works
              </a>
              <a
                href="/signup"
                className="cursor-pointer hover:text-gray-400 text-green-700"
              >
                Sign Up
              </a>
            </div>
          </div>

          <img
            onClick={() => setShowmobileMenu(true)}
            src=""
            className="md:hidden w-7 cursor-pointer"
            alt="menu icon"
          />
        </div>
        {/* ------------mobile-menu--------- */}
        <div
          className={`md:hidden ${
            showMobileMenu ? "fixed w-full" : "h-0 w-0"
          } right-0 top-0 bottom-0 overflow-hidden
            bg-white transition-all`}
        >
          <div className="flex justify-end p-6 cursor-pointer">
            <img
              onClick={() => {
                setShowmobileMenu(false);
              }}
              scr=""
              className="w-6"
              alt="X"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <button
              onClick={() => setShowmobileMenu(false)}
              className="bg-green-700 px-8 py-2
                    rounded-full"
            >
              Start a Campaign
            </button>
            <a
              onClick={() => setShowmobileMenu(false)}
              href="/how-it-works"
              className="px-4 py rounded-full inline-block"
            >
              How it works
            </a>
            <a
              onClick={() => setShowmobileMenu(false)}
              href="/signup"
              className="px-4 py rounded-full inline-block"
            >
              Sign Up
            </a>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
