import React, { useState } from 'react';
import { forgotPasswordApi, resetPasswordApi } from '../../apis/Api';
import { useNavigate } from 'react-router-dom';
import { Mail, Key, Lock } from 'lucide-react';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await forgotPasswordApi({ email });
            if (response.data.success) {
                setMessage('OTP sent successfully to your email');
                setStep(2);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await resetPasswordApi({ email, otp, newPassword });
            if (response.data.success) {
                setMessage('Password reset successful');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
                    <p className="mt-2 text-gray-600">
                        {step === 1 ? "Enter your email to receive OTP" : "Enter OTP and new password"}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                        {message}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleRequestOTP} className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-11 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-colors"
                                    placeholder="Enter your email"
                                />
                                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                            </div>
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
                                    Sending OTP...
                                </div>
                            ) : (
                                "Send OTP"
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                                OTP
                            </label>
                            <div className="relative">
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="pl-11 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-colors"
                                    placeholder="Enter OTP"
                                />
                                <Key className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="pl-11 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-colors"
                                    placeholder="Enter new password"
                                />
                                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                            </div>
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
                                    Resetting Password...
                                </div>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>
                )}

                <div className="text-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-green-600 hover:text-green-700 font-medium"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;