import PropTypes from "prop-types";

const ProjectHealthCard = ({ health }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-2">Project Health</h3>
      <p className="text-3xl font-semibold text-green-400">{health.score}/100</p>
      <ul className="mt-2 space-y-1">
        {health.metrics.map((metric, index) => (
          <li key={index} className="text-gray-300">• {metric}</li>
        ))}
      </ul>
    </div>
  );
};

ProjectHealthCard.propTypes = {
  health: PropTypes.shape({
    score: PropTypes.number.isRequired,
    metrics: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ProjectHealthCard;