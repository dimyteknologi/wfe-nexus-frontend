import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

/**
 * Generic Label atom component
 * Consistent label styling with optional required indicator
 */
export const Label: React.FC<LabelProps> = ({ 
  required, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = 'block text-sm font-semibold text-gray-700 mb-2';

  return (
    <label className={`${baseStyles} ${className}`} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;
