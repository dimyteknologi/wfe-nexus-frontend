"use client";

import SectionCard from "@/components/card/SectionCard";
import InputGroup from "@/components/basic/input/InputGroup";
import { useState } from "react";

export default function DSSPage() {
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

  return (
    <div className="w-2/3 overflow-hidden">
      <div className="mb-8 pt-8 flex flex-col items-center sticky top-0 z-10 backdrop-blur-md bg-white/70 supports-[backdrop-filter]:bg-white/50 border-b border-gray-200 pb-4">
        <div className="relative">
          <button
            onClick={() => {
              if (Object.keys(errors).length === 0) {
                alert("Data valid! Simpan: " + JSON.stringify(inputs));
              } else {
                alert("Terdapat error, periksa kembali");
              }
            }}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              Object.keys(errors).length > 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={Object.keys(errors).length > 0}
          >
            Save Simulation
          </button>
        </div>
      </div>

      <div className="container p-4 relative max-h-[80dvh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
          <SectionCard title="Agriculture">
            <InputGroup
              label="Growth scenario [%/year]"
              periods={["1990-1999", "2000-2010", "2011-2020"]}
              onChange={(id, value) => {
                handleChange(id, value);
                const err = validatePercentage(value);
                if (err) setErrors((prev) => ({ ...prev, [id]: err }));
              }}
              values={inputs}
              errors={errors}
            />
            <InputGroup
              label="Agriculture land conversion [%/year]"
              periods={["1990-1999", "2000-2010", "2011-2020"]}
              onChange={(id, value) => {
                handleChange(id, value);
                const err = validatePercentage(value);
                if (err) setErrors((prev) => ({ ...prev, [id]: err }));
              }}
              values={inputs}
              errors={errors}
            />
          </SectionCard>

          {/* Livestock */}
          <SectionCard title="Livestock">
            <InputGroup
              label="Livestock growth: Cattle [%/year]"
              periods={["1990-1999", "2000-2010", "2011-2020"]}
              onChange={handleChange}
              values={inputs}
              errors={errors}
            />
            <InputGroup
              label="Livestock growth: Poultry [%/year]"
              periods={["1990-1999", "2000-2010", "2011-2020"]}
              onChange={handleChange}
              values={inputs}
              errors={errors}
            />
            <InputGroup
              label="Livestock growth: Goat [%/year]"
              periods={["1990-1999", "2000-2010", "2011-2020"]}
              onChange={handleChange}
              values={inputs}
              errors={errors}
            />
          </SectionCard>

          {/* Energy */}
          <SectionCard title="Energy">
            <InputGroup
              label="Solar PV Coverage (%)"
              periods={["1990-1999", "2000-2010", "2011-2020"]}
              onChange={(id, value) => {
                handleChange(id, value);
                const err = validatePercentage(value);
                if (err) setErrors((prev) => ({ ...prev, [id]: err }));
              }}
              values={inputs}
              errors={errors}
            />
            <InputGroup
              label="Solar PV Area Percentage on Industrial (%)"
              periods={["1990-1999", "2000-2010", "2011-2020"]}
              onChange={(id, value) => {
                handleChange(id, value);
                const err = validatePercentage(value);
                if (err) setErrors((prev) => ({ ...prev, [id]: err }));
              }}
              values={inputs}
              errors={errors}
            />
            <InputGroup
              label="Solar PV Area Percentage on Housing (%)"
              periods={["1990-1999", "2000-2010", "2011-2020"]}
              onChange={(id, value) => {
                handleChange(id, value);
                const err = validatePercentage(value);
                if (err) setErrors((prev) => ({ ...prev, [id]: err }));
              }}
              values={inputs}
              errors={errors}
            />
          </SectionCard>
          {/* Industrial */}
          <SectionCard title="Industry">
            <InputGroup
              label="Industrial growth scenario [%/year]"
              periods={["1990-1999", "2000-2010", "2011-2020"]}
              onChange={(id, value) => {
                handleChange(id, value);
                const err = validatePercentage(value);
                if (err) setErrors((prev) => ({ ...prev, [id]: err }));
              }}
              values={inputs}
              errors={errors}
            />
          </SectionCard>
          {/* Water Management */}
          <SectionCard title="Water Management">
            <InputGroup
              label="Aquaculture land growth [%/year]"
              periods={["1990-1999", "2000-2010", "2011-2020"]}
              onChange={(id, value) => {
                handleChange(id, value);
                const err = validatePercentage(value);
                if (err) setErrors((prev) => ({ ...prev, [id]: err }));
              }}
              values={inputs}
              errors={errors}
            />
            <InputGroup
              label="Artificial Pond Percentage in Industrial Area (%)"
              periods={["1990-1999", "2000-2010", "2011-2020"]}
              onChange={(id, value) => {
                handleChange(id, value);
                const err = validatePercentage(value);
                if (err) setErrors((prev) => ({ ...prev, [id]: err }));
              }}
              values={inputs}
              errors={errors}
            />
            <InputGroup
              label="Artificial Pond Percentage in Housing Area (%)"
              periods={["1990-1999", "2000-2010", "2011-2020"]}
              onChange={(id, value) => {
                handleChange(id, value);
                const err = validatePercentage(value);
                if (err) setErrors((prev) => ({ ...prev, [id]: err }));
              }}
              values={inputs}
              errors={errors}
            />
          </SectionCard>
          {/* Demography */}
          <SectionCard title="Demography">
            <InputGroup
              label="Population Growth [%/year]"
              periods={["1990-1999", "2000-2010", "2011-2020"]}
              onChange={(id, value) => {
                handleChange(id, value);
                const err = validatePercentage(value);
                if (err) setErrors((prev) => ({ ...prev, [id]: err }));
              }}
              values={inputs}
              errors={errors}
            />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
