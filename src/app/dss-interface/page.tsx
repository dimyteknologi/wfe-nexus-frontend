"use client";

import SectionCard from "@/components/card/SectionCard";
import InputGroup from "@/components/basic/input/InputGroup";
import { useState } from "react";
import Navigation from "@/components/organisms/Navigation";
import { ChevronDown, FileUp, Play, X } from "lucide-react";

const DSSPage = () => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isScenarioOpen, setIsScenarioOpen] = useState<boolean>(true);

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
  11;
  const validatePercentage = (value: string) => {
    const num = Number(value);
    if (num < 0 || num > 100) {
      return "Harus antara 0-100";
    }
    return;
  };

  const handleOpenScenarioTab = () => {
    setIsScenarioOpen((current) => !current);
  };

  return (
    <div className="max-h-[100dvh] overflow-hidden">
      <Navigation />
      {/* dashboard mnenu */}
      <div className="flex max-h-[5dvh] my-4 justify-between items-center px-24">
        <div>
          <button
            className={`px-8 py-3 rounded-lg text-xs text-white font-bold  ${isScenarioOpen ? "bg-green-700" : "bg-green-600"}`}
            onClick={handleOpenScenarioTab}
          >
            Scenario Menu
          </button>
        </div>

        <div>
          <button className="cursor-not-allowed" disabled>
            <FileUp />
          </button>
        </div>
      </div>

      {/* dasboard content */}
      <div className="flex justify-end gap-8 h-[85dvh] bg-gray-600 w-full py-2">
        {/* scenario menu */}
        <div
          className={`${isScenarioOpen ? "w-1/3 bg-white border-1 border-gray-200" : "w-0 border-none -translate-x-200"}  rounded-2xl ml-24 mt-3 transition-all duration-200 container overflow-hidden `}
        >
          <div className="mt-4 sticky top-0 z-10 backdrop-blur-lg bg-white/80 supports-[backdrop-filter]:bg-white/60 border-b border-gray-300 pb-4 px-6">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between border-b-1 border-gray-600">
                <h1 className="text-xl">Scenario Menu</h1>
                <button
                  onClick={handleOpenScenarioTab}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end gap-6">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Simulation Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 text-sm rounded-lg outline-none font-medium border bg-white/90 shadow-xs border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      placeholder="Enter simulation name"
                    />
                  </div>

                  <div className="group">
                    <button
                      onClick={() => {
                        if (Object.keys(errors).length === 0) {
                          alert(
                            "Data valid! Simpan: " + JSON.stringify(inputs),
                          );
                        } else {
                          alert("Terdapat error, periksa kembali");
                        }
                      }}
                      className={`p-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                        Object.keys(errors).length > 0
                          ? "bg-gray-200 cursor-not-allowed text-gray-400"
                          : "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg"
                      }`}
                      disabled={Object.keys(errors).length > 0}
                      aria-label="Run simulation"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="flex-1 min-w-[180px]">
                    <label
                      htmlFor="pilihan"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                    >
                      Select Scenario A
                    </label>
                    <div className="relative">
                      <select
                        id="pilihan"
                        name="pilihan"
                        className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white/90 border border-gray-300 rounded-lg shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                      >
                        <option value="">-- Select an option --</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <option value="4">Option 4</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDown />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-[180px]">
                    <label
                      htmlFor="pilihan"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                    >
                      Select Scenario B
                    </label>
                    <div className="relative">
                      <select
                        id="pilihan"
                        name="pilihan"
                        className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white/90 border border-gray-300 rounded-lg shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                      >
                        <option value="">-- Select an option --</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <option value="4">Option 4</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDown />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container pl-4 mt-3 relative max-h-[50dvh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-4 pb-8">
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
        {/* chart content */}
        <div className="w-full p-24 bg-amber-300"></div>
      </div>
    </div>
  );
};

export default DSSPage;
