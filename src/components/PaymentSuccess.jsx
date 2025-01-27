import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get all possible parameters
        const data = searchParams.get('data');
        const oid = searchParams.get('oid');
        const amt = searchParams.get('amt');
        const refId = searchParams.get('refId');

        // Construct verification URL with available parameters
        let verificationUrl = `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`;
        let params = {};

        if (data) {
          params.data = data;
        } else if (oid && amt && refId) {
          params = { oid, amt, refId };
        } else {
          // If no valid parameters found, check the payment status directly
          const transactionId = searchParams.get('txn') || searchParams.get('transaction_id');
          if (transactionId) {
            params = { transaction_id: transactionId };
          }
        }

        console.log('Verification params:', params); // Debug log

        const response = await axios.get(verificationUrl, { params });

        if (response.data.success) {
          setTimeout(() => {
            navigate('/my-contributions');
          }, 3000);
        } else {
          navigate('/payment/failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        // Don't navigate away immediately on error
        // The payment might still be processing
        setTimeout(() => {
          navigate('/my-contributions');
        }, 3000);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        {verifying ? (
          <div className="space-y-4">
            <Loader2 className="w-16 h-16 text-green-500 animate-spin mx-auto" />
            <p className="text-lg">Verifying your payment...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-2xl font-semibold">Payment Successful!</h1>
            <p className="text-gray-600">
              Thank you for your contribution. You will be redirected to your contributions page shortly.
            </p>
            <button
              onClick={() => navigate('/my-contributions')}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              View My Contributions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;