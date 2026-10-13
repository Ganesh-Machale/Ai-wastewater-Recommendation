import React from 'react';
import AnimatedBadge from './AnimatedBadge';

/**
 * Prototype badge adhering to ChaiUI rules:
 * - Glint on animated badge
 * - No em dashes in text
 */
const PrototypeBadge = ({ text = 'Trained Random Forest AI Model Active' }) => {
  // Ensure no em dashes exist in text
  const cleanText = text.replace(/[\u2014\u2013]/g, ': ');
  return <AnimatedBadge>{cleanText}</AnimatedBadge>;
};

export default PrototypeBadge;
