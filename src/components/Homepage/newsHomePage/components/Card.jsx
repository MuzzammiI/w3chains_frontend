import React from 'react';

const Card = ({ article, onNavigate, className = '', children }) => (
  <div
    className={`bg-[#1e1e2d] rounded-lg cursor-pointer transform hover:scale-[1.02] transition-transform duration-300 ${className}`}
    onClick={() => onNavigate(article)}
  >
    {children}
  </div>
);

export default Card;