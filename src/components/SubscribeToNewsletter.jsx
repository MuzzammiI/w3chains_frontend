import React, { useState } from 'react';

const SubscribeToNewsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage('Thank you for subscribing!');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:flex lg:flex-row items-center flex-col justify-between max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-md mx-auto">
            Stay updated with the latest news, insights, and exclusive content delivered straight to your inbox.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage('');
                }}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm sm:text-base"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base font-medium flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
            {message && (
              <p className={`mt-3 text-sm text-center ${message.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeToNewsletter;