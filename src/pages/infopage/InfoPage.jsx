import React from "react";
import Footer from "../../components/Footer";

const InfoPage = () => {
  return (
    <>
      <div className="bg-gray-50 lg:h-[90.6vh] flex items-center justify-center py-8">
        <div className="w-full max-w-5xl p-10 bg-white rounded-xl shadow-2xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create a campaign
              </h1>
              <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">
                Follow the prompts to set up your fundraiser
              </h2>

              <ul className="space-y-4 text-gray-700 text-lg">
                <li className="flex items-start">
                  <span className="block">
                    • Click the 'Start a Fundraiser' button and answer a few
                    questions to get started
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="block">
                    • In your fundraiser description, share the reason you are
                    fundraising in 1-3 paragraphs
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="block">• Add details such as:</span>
                </li>
                <li className="flex items-start ml-8">
                  <span className="block">
                    • Who or what you're fundraising for
                  </span>
                </li>
                <li className="flex items-start ml-8">
                  <span className="block">
                    • A main image or video that represents your fundraiser
                  </span>
                </li>
                <li className="flex items-start ml-8">
                  <span className="block">
                    • Set your fundraising goal, and remember you can always
                    change it later
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Post updates and thank contributors
              </h2>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li className="flex items-start">
                  <span className="block">
                    • Throughout your fundraising journey, you can post
                    fundraiser updates to help increase donations and keep
                    donors informed
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="block">
                    • Easily thank contributors within your fundraising
                    dashboard
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InfoPage;
