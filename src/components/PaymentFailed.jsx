import React, { useEffect } from 'react';
import { XCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleFailedPayment = async () => {
      try {
        const data = searchParams.get('data');
        // If we have data from eSewa, send it to backend
        if (data) {
          await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/payment/failed`, {
            params: { data }
          });
        }
      } catch (error) {
        console.error('Error handling failed payment:', error);
      }
    };

    handleFailedPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="space-y-6">
          <XCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h1 className="text-2xl font-semibold">Payment Failed</h1>
          <p className="text-gray-600">
            We couldn't process your payment. Please try again or contact support if the problem persists.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate(-2)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;