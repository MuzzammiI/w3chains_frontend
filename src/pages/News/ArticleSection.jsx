import { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaShareAlt } from 'react-icons/fa';
import ScrollToTopButton from '../../components/ScrollToTopButton';


const articleData = {
  title: 'Paul Atkins was picked by Donald Trump in December 2024 as the replacement for Gary Gensler as U.S. SEC Chair.',
  content: [
    {
      type: 'paragraph',
      text: "Due to bureaucratic-related delays, Atkins has yet to begin work. However, a recently published financial disclosure ahead of his confirmation hearing reveals a notable detail: Atkins is an avid crypto investor.",
    },
    {
      type: 'paragraph',
      text: "Gensler's tenure at the Securities and Exchange Commission was marked by an antagonistic approach toward crypto businesses. Many major companies were sued, and digital assets were broadly treated as unregistered securities, making it difficult for U.S. firms to engage with crypto without legal risks.",
    },
    {
      type: 'link',
      text: "Read more: Gary Gensler's political testament: Digesting the SEC chairman's exit interview",
      href: '#',
    },
    {
      type: 'paragraph',
      text: "Trump vowed to make America the crypto capital of the world, and his pick for the SEC chair position was a strong crypto advocate and investor. Paul Atkins, who invests in crypto himself, has even testified in court as an expert witness on behalf of finance companies sued by the Gensler-era SEC. It took too long for Atkins to finally participate in the Senate Banking Committee hearing that should vote on his confirmation as the SEC chair.",
    },
    {
      type: 'heading',
      text: 'Investments of Atkins',
    },
    {
      type: 'paragraph',
      text: "On March 25, 2025, financial disclosures revealed that Paul Atkins and his wife hold between $327 million and $588 million in total assets. The report provides value ranges rather than specific figures.",
    },
    {
      type: 'paragraph',
      text: "Roughly $80 million of their portfolio is tied to crypto investments. Atkins holds about $1 million in equity across two crypto firms and another $5 million in a crypto investment fund. Until February, he held up to $500,000 in call options for BlackRock's tokenization company Securitize, where he also served on the board of directors. He held a similar equity stake in Anchorage Digital, Atkins has also had up to $5 million invested in Off the Chain Capital, where he was a limited partner. He has allegedly agreed to divest these holdings upon confirmation as SEC chair.",
    },
    {
      type: 'heading',
      text: "Elizabeth Warren's Letter",
    },
    {
      type: 'paragraph',
      text: "Atkins' confirmation faces opposition from Senator Elizabeth Warren, a ranking member of the Senate Banking Committee and a vocal critic of cryptocurrencies.",
    },
    {
      type: 'paragraph',
      text: "Warren sent a 32-page letter outlining questions Atkins would need to address during the hearing. She expressed concerns about his role at the SEC during the 2008 financial crisis, his advocacy role in the collapsed FTX exchange, and potential conflicts of interest, citing close ties with corporations advocating for deregulation.",
    },
    {
      type: 'banner',
      image: 'https://via.placeholder.com/728x90?text=AKS+Banner',
      alt: 'AKS Banner',
    },
    {
      type: 'paragraph',
      text: "She also criticized his recent role as the CEO of Patomak Global Partners, a consulting firm that advised multiple companies regulated by the SEC under Gensler. Notably, Patomak had also consulted for FTX, whose collapse in 2022 helped catalyze the SEC's aggressive stance under Gensler.",
    },
    {
      type: 'paragraph',
      text: "While Atkins has promised to divest his assets, Warren argued this was 'not enough' unless he agrees to disclose to Congress who the buyer will be and whether they are paying for access to the SEC chair.",
    },
    {
      type: 'heading',
      text: 'What to expect?',
    },
    {
      type: 'paragraph',
      text: "As both a pro-crypto advocate and an experienced financial insider, Atkins is seen as well-positioned to understand the crypto industry's challenges. He is expected to continue the post-Gensler direction shaped by Hester Peirce, with the SEC already dropping several Gensler-era lawsuits against companies like Ripple, Coinbase, and Kraken.",
    },
    {
      type: 'paragraph',
      text: "More than that, the SEC ruled out that memetokens are not securities but collectibles. It was an important change in the legal perception of crypto tokens. Atkins is expected to work on favorable regulation that will facilitate the introduction of crypto companies. The Atkins January meeting with Sam Altman's crypto-friendly period of the SEC is about to begin. Accordingly to Lummis, Atkins will provide regulatory clarity to the original intent of the law because 'I think the U.S. didn't make our rules accommodating to this new technology.'",
    },
  ],
};

const ArticleSection = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate data fetch with a delay
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setArticle(articleData);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, []);

  return (
    <>

    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto">
        {loading ? (
          // Loading Skeleton
          <div className="space-y-6 animate-pulse">
            {/* Title Skeleton */}
            <div className="w-3/4 h-8 bg-gray-700 rounded blur-sm"></div>
            <div className="w-full h-4 bg-gray-700 rounded blur-sm"></div>
            <div className="w-1/2 h-4 bg-gray-700 rounded blur-sm"></div>
            {/* Social Icons Skeleton */}
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-gray-700 rounded-full blur-sm"></div>
              <div className="w-6 h-6 bg-gray-700 rounded-full blur-sm"></div>
              <div className="w-6 h-6 bg-gray-700 rounded-full blur-sm"></div>
              <div className="w-6 h-6 bg-gray-700 rounded-full blur-sm"></div>
            </div>
            {/* Banner Skeleton */}
            <div className="w-full h-24 bg-gray-700 rounded blur-sm"></div>
            {/* Content Skeleton */}
            <div className="space-y-4">
              <div className="w-full h-4 bg-gray-700 rounded blur-sm"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded blur-sm"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded blur-sm"></div>
              <div className="w-1/3 h-6 bg-gray-700 rounded blur-sm"></div>
              <div className="w-full h-4 bg-gray-700 rounded blur-sm"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded blur-sm"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded blur-sm"></div>
              <div className="w-full h-24 bg-gray-700 rounded blur-sm"></div>
              <div className="w-full h-4 bg-gray-700 rounded blur-sm"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded blur-sm"></div>
            </div>
          </div>
        ) : (
          // Actual Data
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{article.title}</h1>

            {/* Social Share Icons */}
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaShareAlt className="w-6 h-6" />
              </a>
            </div>

            {/* Article Content */}
            <div className="space-y-4">
              {article.content.map((item, index) => {
                switch (item.type) {
                  case 'paragraph':
                    return (
                      <p key={index} className="text-gray-300 text-sm sm:text-base">
                        {item.text}
                      </p>
                    );
                  case 'heading':
                    return (
                      <h2 key={index} className="text-xl sm:text-2xl font-semibold mt-6">
                        {item.text}
                      </h2>
                    );
                  case 'link':
                    return (
                      <p key={index}>
                        <a
                          href={item.href}
                          className="text-blue-500 hover:underline text-sm sm:text-base"
                        >
                          {item.text}
                        </a>
                      </p>
                    );
                  case 'banner':
                    return (
                      <div key={index} className="my-4">
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        )}
      </div>
    </div>
    <ScrollToTopButton />
    
    </>
    
  );
};

export default ArticleSection;