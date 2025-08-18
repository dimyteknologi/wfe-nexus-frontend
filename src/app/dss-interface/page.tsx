"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/organisms/Navigation";
import { ChevronDown, FileUp, Play, X } from "lucide-react";

import Chart from "@/components/chart";
import Table from "@/components/table";
import FormContainer from "@/components/organisms/DSSInput/DSSInput";
import { sections } from "@/lib/data/dataDummies";

import { InitialValues } from "@/lib/types/dss-input.dummy.types";
import { ProcessedGdpData, processGdpData } from "@/lib/data/economic.data";

type iTableData = {
  year: number;
  baseline_1: number;
  baseline_2: number;
};

const dummyData: iTableData[] = Array.from({ length: 42 }).map((_, i) => ({
  year: new Date().getFullYear() - i,
  baseline_1: Math.random() + 1,
  baseline_2: Math.random() + i,
}));

const DSSPage = () => {
  // console.log(process.env.NEXT_PUBLIC_API_URL);
  // const [data, setData] = useState<ProcessedGdpData | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const processedData = await processGdpData();
  //       setData(processedData);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "Unknown error");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadData();
  // }, []);

  // if (error) {
  //   return (
  //     <div className="alert alert-error">
  //       <h3>Data tidak dapat dimuat</h3>
  //       <p>Error: {error}</p>
  //     </div>
  //   );
  // }

  // if (loading) {
  //   return (
  //     <div className="">
  //       <p>Error: {loading}</p>
  //     </div>
  //   );
  // }

  // const average_base_agriculture_growth = data?.averageGdpCategoryA!;
  // const initialValues: InitialValues = {
  //   "agriculture-growth-2025-2030": average_base_agriculture_growth,
  //   "agriculture-growth-2031-2040": average_base_agriculture_growth,
  //   "agriculture-growth-2041-2045": average_base_agriculture_growth,
  // };

  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isScenarioOpen, setIsScenarioOpen] = useState<boolean>(true);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const start = (page - 1) * pageSize;
  const paginatedData = dummyData.slice(start, start + pageSize);

  const handleChange = (id: string, value: number) => {
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

  const validatePercentage = (value: number): string | undefined => {
    const num = value;
    if (isNaN(num)) return "Must be a number";
    if (num < -100 || num > 100) return "Must be between -100% and 100%";
    return undefined;
  };
  const handleOpenScenarioTab = () => {
    setIsScenarioOpen((current) => !current);
  };

  return (
    <div className="max-h-[100dvh] w-full overflow-hidden">
      <Navigation />
      {/* dashboard menu */}
      <div className="flex max-h-[5dvh] my-2 sm:my-4 justify-between items-center px-8">
        <div>
          <button
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm text-white font-bold ${
              isScenarioOpen ? "bg-green-700" : "bg-green-600"
            }`}
            onClick={handleOpenScenarioTab}
          >
            Scenario Menu
          </button>
        </div>
        <div>
          <button className="cursor-not-allowed" disabled>
            <FileUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* dashboard content */}
      <div className="flex  lg:flex-row justify-between h-[80dvh]">
        {/* scenario menu */}
        <div
          className={`${
            isScenarioOpen
              ? "w-full lg:w-1/3 bg-white border border-gray-200"
              : "w-0 border-none -translate-x-full"
          } rounded-lg lg:rounded-2xl py-2 md:py-4 transition-all duration-200 overflow-hidden h-full flex flex-col items-center`}
        >
          <div className="w-full sticky top-0 z-10 backdrop-blur-lg bg-white/80 supports-[backdrop-filter]:bg-white/60 border-b border-gray-300 pb-2 md:pb-4 px-2 sm:px-4 md:px-6">
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
              <div className="flex justify-between border-b border-gray-600 items-center">
                <h1 className="text-lg md:text-xl">Scenario Menu</h1>
                <button
                  onClick={handleOpenScenarioTab}
                  className="p-1 md:p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6 items-end">
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Simulation Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg outline-none font-medium border bg-white/90 shadow-xs border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      placeholder="Enter simulation name"
                    />
                  </div>
                  <div className="group w-full sm:w-auto">
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
                      className={`w-full sm:w-auto p-2 sm:p-3 rounded-lg md:rounded-xl font-medium transition-all transform hover:scale-105 ${
                        Object.keys(errors).length > 0
                          ? "bg-gray-200 cursor-not-allowed text-gray-400"
                          : "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg"
                      }`}
                      disabled={Object.keys(errors).length > 0}
                      aria-label="Run simulation"
                    >
                      <Play className="w-4 h-4 md:w-5 md:h-5 mx-auto sm:mx-0" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                  <div className="flex-1 min-w-0">
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
                        className="block w-full px-3 py-2 md:px-4 md:py-2.5 text-sm text-gray-700 bg-white/90 border border-gray-300 rounded-lg shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                      >
                        <option value="">-- Select an option --</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <option value="4">Option 4</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
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
                        className="block w-full px-3 py-2 md:px-4 md:py-2.5 text-sm text-gray-700 bg-white/90 border border-gray-300 rounded-lg shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                      >
                        <option value="">-- Select an option --</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <option value="4">Option 4</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FormContainer
            inputs={inputs}
            errors={errors}
            handleChange={handleChange}
            validatePercentage={validatePercentage}
            sections={sections}
          />
        </div>

        {/* chart content */}
        <div
          className={`${isScenarioOpen ? "hidden lg:flex" : "flex"} w-full bg-white min-h-[70vh] lg:min-h-[80dvh] `}
        >
          <div
            className={`w-full h-[70vh] sm:h-[80vh] lg:h-[80dvh] p-2 sm:p-3 md:p-4 overflow-auto lg:overflow-visible ${
              isScenarioOpen
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 grid-flow-row"
            } gap-2 sm:gap-3 md:gap-4 lg:gap-6`}
          >
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`w-full h-full min-h-[150px] sm:min-h-[180px] md:min-h-[200px] max-w-full mx-auto bg-white rounded-lg ${
                  isScenarioOpen
                    ? "sm:col-span-1 xl:col-span-3"
                    : "sm:col-span-1  lg:col-span-3"
                }`}
              >
                <Chart
                  title="Random Data"
                  type="line"
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  series={[
                    { name: "Baseline 1", data: [0, 0, 0, 0, 11, 22, 22, 33] },
                    { name: "Baseline 2", data: [0, 0, 0, 0, 10, 20, 30, 40] },
                  ]}
                  categories={[
                    "2010",
                    "2011",
                    "2012",
                    "2013",
                    "2014",
                    "2015",
                    "2016",
                    "2017",
                    "2018",
                    "2019",
                    "2020",
                    "2021",
                    "2022",
                  ]}
                  height={200}
                  colors={["#1E90FF", "#33A1E0"]}
                />
              </div>
            ))}

            {!isScenarioOpen && (
              <div className="w-full h-full min-h-[150px] sm:min-h-[180px] md:min-h-[200px] max-w-full mx-auto bg-white rounded-lg sm:col-span-2 lg:col-span-2 lg:row-span-1 lg:row-start-1 lg:row-end-3 lg:col-start-7">
                <Table<iTableData>
                  columns={[
                    { key: "year", label: "Tahun", className: "w-16" },
                    { key: "baseline_1", label: "Baseline 1" },
                    { key: "baseline_2", label: "Baseline 2" },
                  ]}
                  data={paginatedData}
                  page={page}
                  pageSize={pageSize}
                  total={dummyData.length}
                  onPageChange={setPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSSPage;
