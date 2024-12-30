import React from "react";
import Footer from "../../components/Footer";

const LandingPage = () => {
  const campaigns = [
    {
      id: 1,
      title: "Gaming Hub",
      author: "Sujan Kc",
      raised: 50000,
      goal: 100000,
      image: "/api/placeholder/400/200",
      bgColor: "bg-purple-400",
    },
    {
      id: 2,
      title: "Chiya Hub",
      author: "Sijan Shrestha",
      raised: 5000,
      goal: 50000,
      image: "/api/placeholder/400/200",
      bgColor: "bg-gray-900",
    },
    {
      id: 3,
      title: "Bargain Bazzar",
      author: "Riseesh Shrestha",
      raised: 50000,
      goal: 150000,
      image: "/api/placeholder/400/200",
      bgColor: "bg-purple-900",
    },
    {
      id: 4,
      title: "Note Take",
      author: "Paribesh",
      raised: 25000,
      goal: 100000,
      image: "/api/placeholder/400/200",
      bgColor: "bg-yellow-200",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="relative flex flex-wrap lg:h-[90.6vh] lg:items-center">
          <div
            className="w-full border-2 border-gray-200 shadow-md rounded-lg px-4 py-12 sm:px-6 sm:py-16 lg:w-2/5 lg:px-8 lg:py-12 lg:h-full
    flex "
          >
            <div className="mx-auto mb-0 mt-24 max-w-lg space-y-6">
              <h1 className="text-2xl font-bold sm:text-4xl">
                Crowdfunding for Nepal
              </h1>
              <p className="mt-10 mb-4 text-gray-500 text-xl sm:text-2xl">
                For individual and charities
              </p>
              <button className="hidden md:block px-12 py-3 bg-green-600 text-white rounded-md">
                See Campaigns
              </button>
            </div>
          </div>
          <div className="relative hidden md:block h-64 w-full sm:h-96 lg:h-full lg:w-3/5">
            <img
              alt=""
              src="https://www.ideaplotting.com/wp-content/uploads/2017/12/tips-crowdfunding.jpeg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Latest Campaigns Section */}
        <div className="mt-12 lg:px-24 md:px-10 px-7 mb-11">
          <h2 className="text-2xl font-semibold text-gray-800 mb-10">
            Latest Campaigns
          </h2>
          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div
                  className={`h-48 ${campaign.bgColor} flex items-center justify-center text-white`}
                >
                  {campaign.title}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{campaign.title}</h3>
                  <p className="text-gray-600">By {campaign.author}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Rs {campaign.raised.toLocaleString()} raised out of Rs{" "}
                    {campaign.goal.toLocaleString()}
                  </p>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700">
                    Contribute
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="text-green-600 hover:underline">
              View More →
            </button>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
