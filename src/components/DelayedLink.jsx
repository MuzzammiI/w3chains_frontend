import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingBlurOverlay from './LoadingBlurOverlay'; // Your blur overlay

const DelayedLink = ({ to, children, delay = 500, ...props }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const handleClick = useCallback(async (event) => {
    // Prevent default navigation immediately
    event.preventDefault();
    setIsNavigating(true);

    // Simulate component loading delay (can be replaced with actual dynamic import logic)
    // For a real lazy-loaded component, you'd need to somehow ensure it's loaded here
    // before navigating. This is the tricky part with this workaround.
    // In a true lazy-loading scenario, React.lazy handles the import.
    // Here, we're just simulating a delay.
    await new Promise(resolve => setTimeout(resolve, delay));

    // After the delay (simulating component load), then navigate
    navigate(to);
    setIsNavigating(false);
  }, [to, delay, navigate]);

  return (
    <>
      <Link to={to} onClick={handleClick} {...props}>
        {children}
      </Link>
      {isNavigating && <LoadingBlurOverlay />}
    </>
  );
};

DelayedLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  delay: PropTypes.number, // Optional delay in ms
};

export default DelayedLink;
