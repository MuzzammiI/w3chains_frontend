import React from 'react';
import PropTypes from 'prop-types';

const DotIndicators = ({ count, activeIndex, onDotClick }) => {
  return (
    <div className="flex justify-center items-center space-x-2 absolute bottom-4 w-full z-30">
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={`
            block rounded-full cursor-pointer transition-all duration-300 ease-in-out
            ${index === activeIndex ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-gray-400'}
          `}
          onClick={() => onDotClick(index)}
        ></span>
      ))}
    </div>
  );
};

DotIndicators.propTypes = {
  count: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onDotClick: PropTypes.func.isRequired,
};

export default DotIndicators;