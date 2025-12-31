import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

/**
 * Generic Input atom component
 * Base input with consistent styling and error state support
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, fullWidth = true, className = '', ...props }, ref) => {
    const baseStyles = 'px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all';
    const widthStyles = fullWidth ? 'w-full' : '';
    const stateStyles = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
      : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20';

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${widthStyles} ${stateStyles} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
