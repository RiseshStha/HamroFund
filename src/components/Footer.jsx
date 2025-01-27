import React from "react";
import { Facebook, Github } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="mt-3 py-16 bg-gray-800 text-white lg:px-28 md:px-20">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between text-center">
          {/* Hamro Fund Section */}
          <div className="mb-6 sm:mb-3">
            <h3 className="text-green-600 font-bold text-xl mb-6">Hamro Fund</h3>
            <div className="flex gap-6 justify-center sm:justify-start">
              <Facebook className="w-10 h-10 text-blue-600" />
              <Github className="w-10 h-10" />
            </div>
          </div>

          {/* Discover Section */}
          <div className="mb-6 sm:mb-3">
            <h3 className="font-bold text-lg">Discover</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="https://www.worldbank.org/en/events/2023/04/12/connecting-nepal-with-the-global-digital-economy" className="hover:underline">
                  Tech & Innovation
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Top-Funded Campaigns
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-bold text-lg">Contact</h3>
            <p className="mt-2">hamrofund@gmail.com</p>
            <a href="#" className="hover:underline">
              FAQs & Help Center
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
