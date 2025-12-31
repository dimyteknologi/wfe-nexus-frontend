import React from 'react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
  withIcon?: boolean;
}

/**
 * Generic ErrorMessage atom component
 * Animated error message display with optional bullet icon
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  children, 
  className = '',
  withIcon = true
}) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-2 text-sm text-red-600 flex items-center ${className}`}
    >
      {withIcon && <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>}
      {children}
    </motion.p>
  );
};

export default ErrorMessage;
