import ProjectHealthCard from './ProjectHealthCard';
import PropTypes from 'prop-types';
const SearchResults = ({ results }) => {
  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold">Trends News</h3>
          <ul className="list-disc pl-5">
            {results.trendsNews.map((news, index) => (
              <li key={index} className="text-gray-300">{news}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Trends Projects</h3>
          <ul className="list-disc pl-5">
            {results.trendsProjects.map((project, index) => (
              <li key={index} className="text-gray-300">{project}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Trends Blogs</h3>
          <ul className="list-disc pl-5">
            {results.trendsBlogs.map((blog, index) => (
              <li key={index} className="text-gray-300">{blog}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Upcoming Tokens</h3>
          <ul className="list-disc pl-5">
            {results.upcomingTokens.map((token, index) => (
              <li key={index} className="text-gray-300">{token}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Released Tokens</h3>
          <ul className="list-disc pl-5">
            {results.releasedTokens.map((token, index) => (
              <li key={index} className="text-gray-300">{token}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Funding Details</h3>
          <ul className="list-disc pl-5">
            {results.fundingDetails.map((funding, index) => (
              <li key={index} className="text-gray-300">{funding}</li>
            ))}
          </ul>
        </div>
        <ProjectHealthCard health={results.projectHealth} />
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Related Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.relatedProjects.map((project, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <p className="text-gray-300">{project}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


SearchResults.propTypes = {
    results: PropTypes.shape({
        trendsNews: PropTypes.arrayOf(PropTypes.string).isRequired,
        trendsProjects: PropTypes.arrayOf(PropTypes.string).isRequired,
        trendsBlogs: PropTypes.arrayOf(PropTypes.string).isRequired,
        upcomingTokens: PropTypes.arrayOf(PropTypes.string).isRequired,
        releasedTokens: PropTypes.arrayOf(PropTypes.string).isRequired,
        fundingDetails: PropTypes.arrayOf(PropTypes.string).isRequired,
        projectHealth: PropTypes.shape({
        score: PropTypes.number.isRequired,
        metrics: PropTypes.arrayOf(PropTypes.string).isRequired
        }).isRequired,
        relatedProjects: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
    };
    

export default SearchResults;