import React from 'react';
import { Select } from '@/components/atoms/Select';
import { Label } from '@/components/atoms/Label';
import { ErrorMessage } from '@/components/atoms/ErrorMessage';

interface SelectFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  children: React.ReactNode;
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
}

/**
 * SelectField molecule component
 * Composes Select + Label + ErrorMessage for consistent select fields
 */
export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  error,
  required,
  helperText,
  children,
  selectProps,
}) => {
  return (
    <div className="space-y-2">
      <Label required={required}>{label}</Label>
      <Select error={!!error} {...selectProps}>
        {children}
      </Select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helperText && !error && (
        <p className="mt-2 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default SelectField;
