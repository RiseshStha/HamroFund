import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Calendar } from "lucide-react";
import ProfileNavbar from "../../components/ProfileNavbar";
import { getMyContributionsApi } from "../../apis/Api";

const MyContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await getMyContributionsApi();
        if (response.data.success) {
          setContributions(response.data.data);
        } else {
          console.error("Failed to fetch contributions:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching contributions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const getImageUrl = (imageName) => {
    if (!imageName) return "/api/placeholder/400/200";
    return `${import.meta.env.VITE_BACKEND_URL}/campaigns/${imageName}`;
  };

  if (loading) {
    return (
      <div className="h-[89.6vh] flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="h-[89.6vh] bg-gray-50">
      <div className="flex h-full pt-4">
        <ProfileNavbar />
        
        <div className="flex-1 overflow-y-auto max-md:py-7 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold p-6">My Contributions</h1>
            
            <div className="p-6 pt-0">
              {contributions.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-gray-600 mb-4">
                    You haven't made any contributions yet.
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Explore Campaigns
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contributions.map((contribution) => (
                    <div
                      key={contribution._id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-duration-300 border"
                    >
                      <div className="h-40 relative overflow-hidden">
                        <img
                          src={getImageUrl(contribution.campaign?.image)}
                          alt={contribution.campaign?.title}
                          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/400/200";
                          }}
                        />
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                          {contribution.campaign?.title}
                        </h3>
                        <div className="space-y-2">
                          <p className="text-gray-600 text-sm">
                            Rs {contribution.amount.toLocaleString()}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            <span>
                              {new Date(contribution.paymentDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <button
                            onClick={() => navigate(`/campaign/${contribution.campaign?._id}`)}
                            className="mt-3 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm w-full"
                          >
                            View Campaign
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyContributions;