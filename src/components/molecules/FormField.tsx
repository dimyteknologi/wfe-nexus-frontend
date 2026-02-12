import React from 'react';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import { ErrorMessage } from '@/components/atoms/ErrorMessage';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

/**
 * FormField molecule component
 * Composes Input + Label + ErrorMessage for consistent form fields
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  helperText,
  inputProps,
}) => {
  return (
    <div className="space-y-2">
      <Label required={required}>{label}</Label>
      <Input error={!!error} {...inputProps} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helperText && !error && (
        <p className="mt-2 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default FormField;
