import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

/**
 * Generic Select atom component
 * Base select dropdown with consistent styling and error state support
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, fullWidth = true, className = '', children, ...props }, ref) => {
    const baseStyles = 'px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all';
    const widthStyles = fullWidth ? 'w-full' : '';
    const stateStyles = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
      : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20';

    return (
      <select
        ref={ref}
        className={`${baseStyles} ${widthStyles} ${stateStyles} ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export default Select;
