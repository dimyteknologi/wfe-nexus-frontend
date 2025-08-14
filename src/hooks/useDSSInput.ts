"use clinet";
import { useState } from "react";

const useDSSInput = () => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    const newInputs = { ...inputs, [id]: value };
    setInputs(newInputs);

    const newErrors = { ...errors };
    if (!value) {
      newErrors[id] = "Wajib diisi";
    } else if (isNaN(Number(value))) {
      newErrors[id] = "Harus angka";
    } else if (Number(value) < 0) {
      newErrors[id] = "Tidak boleh negatif";
    } else if (Number(value) > 1000) {
      newErrors[id] = "Nilai terlalu besar";
    } else {
      delete newErrors[id];
    }

    setErrors(newErrors);
  };

  const validatePercentage = (value: string) => {
    const num = Number(value);
    if (num < 0 || num > 100) {
      return "Harus antara 0-100";
    }
    return;
  };

  return {
    inputs,
    errors,
    handleChange,
    validatePercentage,
  };
};
export default useDSSInput;
