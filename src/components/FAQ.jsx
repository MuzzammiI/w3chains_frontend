import { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqData = [
  {
    question: 'What are airdrops?',
    answer:
      'Airdrops are when various web application developers distribute rewards directly to the participants. These rewards can be part of a promotional campaign to spread awareness and increase usage of their web applications.',
  },
  {
    question: 'Why do digital projects distribute rewards to participants?',
    answer:
      "The main reason is 'Marketing'. Web app developers and projects use reward distributions to raise awareness of their digital products. Additionally, this strategy is effective for increasing their products' visibility and reach, as the rewards are distributed to numerous participants globally. By offering rewards tos to participants, projects can encourage users to become active users of their web applications for the long term. This approach can significantly reduce selling pressure and the cost of client acquisition.",
  },
  {
    question: 'Where to find updates on new reward opportunities?',
    answer:
      'At Airdrop.com, our goal is to provide you with the best reward distribution opportunities. We exclusively feature unique promotions that have been thoroughly evaluated by our team.',
  },
];

const FAQSection = () => {
  const [faqState, setFaqState] = useState({
    0: true, // First question is open by default
    1: false,
    2: false,
  });
  const [loading, setLoading] = useState(true);

  // Simulate data fetch with a delay
  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQData();
  }, []);

  const toggleFAQ = (index) => {
    setFaqState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white text-gray-900">
      <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Your questions answered</h1>

        {loading ? (
          // Loading Skeleton
          <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-1/2 h-6 bg-gray-300 rounded blur-sm"></div>
                  <div className="w-6 h-6 bg-gray-300 rounded-full blur-sm"></div>
                </div>
                <div className="w-full h-4 bg-gray-300 rounded blur-sm"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded blur-sm"></div>
              </div>
            ))}
          </div>
        ) : (
          // Actual Data
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <h2 className="text-lg sm:text-xl font-semibold text-blue-600">{faq.question}</h2>
                  <span className="text-gray-500">
                    {faqState[index] ? (
                      <FaMinus className="w-5 h-5" />
                    ) : (
                      <FaPlus className="w-5 h-5" />
                    )}
                  </span>
                </div>
                {faqState[index] && (
                  <p className="mt-2 text-gray-700 text-sm sm:text-base">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQSection;