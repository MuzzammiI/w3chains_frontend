import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ButtonCard = ({
  children,
  styles = "",
  background = "",
  icon = null,
  size = "medium",
  animationType = "scale",
  iconPosition = "left",
  onClick,
}) => {
  // Size configurations
  const sizeStyles = {
  small: 'px-3 py-1.5 text-xs sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-sm',
    medium: 'px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-base',
    large: 'px-5 py-2.5 text-base sm:px-6 sm:py-3 sm:text-lg md:px-8 md:py-4 md:text-lg'
  };


  // Icon size based on button sizes
  const iconSize = {
    small: 16,
    medium: 20,
    large: 24,
  };

  // Animation configurations
  const animations = {
    scale: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      transition: { duration: 0.2, ease: "easeOut" },
    },
    bounce: {
      whileHover: { y: -5 },
      whileTap: { y: 2 },
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    fade: {
      whileHover: { opacity: 0.9 },
      whileTap: { opacity: 0.7 },
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    pulse: {
      whileHover: {
        scale: 1.1,
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
      },
      whileTap: { scale: 0.9 },
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
    rotate: {
      whileHover: { rotate: 5, scale: 1.05 },
      whileTap: { rotate: -5, scale: 0.95 },
      transition: { duration: 0.3, type: "spring", stiffness: 200 },
    },
    glow: {
      whileHover: {
        boxShadow:
          "0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(59, 130, 246, 0.5)",
      },
      whileTap: { scale: 0.98 },
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Combine base styles with custom styles
  const baseStyles = `
    ${background}
    ${sizeStyles[size] || sizeStyles.medium}
    text-white font-semibold rounded-lg shadow-lg
    flex items-center justify-center gap-2 cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300
    ${styles}
  `;

  return (
    <motion.button
      className={baseStyles}
      {...(animations[animationType] || animations.scale)}
      onClick={onClick}
    >
      {icon && iconPosition === "left" && (
        <span className="flex items-center">
          {React.createElement(icon, {
            size: iconSize[size] || iconSize.medium,
          })}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="flex items-center">
          {React.createElement(icon, {
            size: iconSize[size] || iconSize.medium,
          })}
        </span>
      )}
    </motion.button>
  );
};

ButtonCard.propTypes = {
  children: PropTypes.node.isRequired,
  styles: PropTypes.string,
  background: PropTypes.string,
  icon: PropTypes.elementType,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  animationType: PropTypes.oneOf([
    "scale",
    "bounce",
    "fade",
    "pulse",
    "rotate",
    "glow",
  ]),
  iconPosition: PropTypes.oneOf(["left", "right"]),
  onClick: PropTypes.func,
};

export default ButtonCard;
