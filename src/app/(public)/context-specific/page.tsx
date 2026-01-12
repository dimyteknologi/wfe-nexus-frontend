"use client";

import Alert from "@/components/alert";
import { useRef, useState, useCallback } from "react";
import ScenarioMenu from "@/components/organisms/Menu/Scenario";
import ChartWidget from "@/features/simulation/components/SimulationChart/widget";
import SimulationForm from "@/features/simulation/components/SimulationForm";
import { useAppDispatch, useAppSelector } from "@/stores/root-reducer";
import TableWidget from "@/features/simulation/components/SimulationTable/widget";
import ImportModal from "@/components/importModal";
import DSSConceptModal from "@/components/dssConceptModal";

import { contextSpecificInput } from "@/config/form";
import { setChartsToCategoryPreset } from "@/stores/slicers/dashboardSlicer";
import {
  setDssConceptModal,
  setImportModal,
  setScenarioModal,
} from "@/stores/slicers/dssModalSlicer";
import {
  setPowerGeneration,
  setAllActiveInputs,
} from "@/stores/slicers/contextSpecificInputSlicer";
import { ALL_METRICS_CONTEXT_SPECIFICS } from "@/lib/constant/metrics";
import { selectDisplayedMetricsContext } from "@/stores/selectors/dssDashboardSelector";

const ContextSpecificPage = () => {
  // useInitializeData();

  const [isPowerGenDropdownOpen, setIsPowerGenDropdownOpen] = useState(false);
  const simulationState = useAppSelector((state) => state.contextSpecific);
  const selectedPowerGen = simulationState.powerGeneration;
  const displayedMetrics = useAppSelector(selectDisplayedMetricsContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const dssModalState = useAppSelector((state) => state.dssModal);
  const yearsArray = Array.from({ length: 10 }, (_, i) => 2025 + i);
  const isImportOpen = dssModalState.importModal;
  const isScenarioOpen = dssModalState.scenarioModal;
  const isDssConceptOpen = dssModalState.dssConceptModal;
  const uniqueCategories = [
    ...new Set(ALL_METRICS_CONTEXT_SPECIFICS.map((metric) => metric.category)),
  ];
  
  const handleOpenScenarioTab = useCallback(() => {
    dispatch(setScenarioModal(!isScenarioOpen));
  }, [dispatch, isScenarioOpen]);

  const handleOpenDssConceptTab = useCallback(() => {
    dispatch(setDssConceptModal(!isDssConceptOpen));
  }, [dispatch, isDssConceptOpen]);

  const handleOpenImportTab = useCallback(() => {
    dispatch(setImportModal(!isImportOpen));
  }, [dispatch, isImportOpen]);

  const handlePreset = (category: string) => {
    dispatch(setChartsToCategoryPreset({ target: "context", category }));
  };

  const powerGenOptions = [
    { value: "both" as const, label: "Solar PV + Geothermal" },
    { value: "solar" as const, label: "Solar PV Only" },
    { value: "geothermal" as const, label: "Geothermal Only" },
    { value: "none" as const, label: "None" },
  ];

  const handlePowerGenSelect = (option: "solar" | "geothermal" | "both" | "none") => {
    dispatch(setPowerGeneration(option));
    setIsPowerGenDropdownOpen(false);
    
    // Update input values based on power generation selection
    const updatedInputs = { ...simulationState.active };
    
    switch (option) {
      case "both":
        // Set defaults for both
        updatedInputs.solarPV = {
          installedCapacity: { "2025-2034": updatedInputs.solarPV.installedCapacity["2025-2034"] || 63 },
          fee: { "2025-2034": 150000 },
        };
        updatedInputs.geothermal = {
          installedUnit: { "2025-2034": updatedInputs.geothermal.installedUnit["2025-2034"] || 0 },
          capacityPerUnit: { "2025-2034": 50 },
          utilizationOfSurfaceWater: { "2025-2034": updatedInputs.geothermal.utilizationOfSurfaceWater["2025-2034"] || 0 },
        };
        break;
      
      case "solar":
        // Enable Solar PV, disable Geothermal
        updatedInputs.solarPV = {
          installedCapacity: { "2025-2034": updatedInputs.solarPV.installedCapacity["2025-2034"] || 63 },
          fee: { "2025-2034": 150000 },
        };
        updatedInputs.geothermal = {
          installedUnit: { "2025-2034": 0 },
          capacityPerUnit: { "2025-2034": 0 },
          utilizationOfSurfaceWater: { "2025-2034": 0 },
        };
        break;
      
      case "geothermal":
        // Enable Geothermal, disable Solar PV
        updatedInputs.solarPV = {
          installedCapacity: { "2025-2034": 0 },
          fee: { "2025-2034": 0 },
        };
        updatedInputs.geothermal = {
          installedUnit: { "2025-2034": updatedInputs.geothermal.installedUnit["2025-2034"] || 0 },
          capacityPerUnit: { "2025-2034": 50 },
          utilizationOfSurfaceWater: { "2025-2034": updatedInputs.geothermal.utilizationOfSurfaceWater["2025-2034"] || 0 },
        };
        break;
      
      case "none":
        // Disable both
        updatedInputs.solarPV = {
          installedCapacity: { "2025-2034": 0 },
          fee: { "2025-2034": 0 },
        };
        updatedInputs.geothermal = {
          installedUnit: { "2025-2034": 0 },
          capacityPerUnit: { "2025-2034": 0 },
          utilizationOfSurfaceWater: { "2025-2034": 0 },
        };
        break;
    }
    
    dispatch(setAllActiveInputs(updatedInputs));
  };

  return (
    <div className="w-full px-6 pt-28 overflow-hidden">
      <Alert />
      {/* dashboard menu */}
      <div className="relative flex my-2 sm:my-4 justify-between items-center">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-xs text-white font-bold ${isDssConceptOpen ? "bg-green-700" : "bg-green-600"
              }`}
            onClick={handleOpenDssConceptTab}
            aria-expanded={isDssConceptOpen}
            aria-controls="dss-concept-modal"
          >
            DSS Concept
          </button>
          <button
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-xs text-white font-bold ${isScenarioOpen ? "bg-green-700" : "bg-green-600"
              }`}
            onClick={handleOpenScenarioTab}
            aria-expanded={isScenarioOpen}
            aria-controls="scenario-menu"
          >
            Scenario Menu
          </button>
          {/* Power Generation Toggle */}
          <div className="relative">
            <button
              className="px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-xs text-white font-bold bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2"
              onClick={() => setIsPowerGenDropdownOpen(!isPowerGenDropdownOpen)}
              aria-expanded={isPowerGenDropdownOpen}
            >
              {powerGenOptions.find(opt => opt.value === selectedPowerGen)?.label}
              <svg
                className={`w-4 h-4 transition-transform ${isPowerGenDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isPowerGenDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                {powerGenOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handlePowerGenSelect(option.value)}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${
                      selectedPowerGen === option.value
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                    {selectedPowerGen === option.value && (
                      <svg
                        className="inline-block w-4 h-4 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-4">
            {uniqueCategories.map((category) => (
              <div
                key={category}
                onClick={() => handlePreset(category)}
                className={`cursor-pointer border border-green-700 rounded-xl py-1 px-4`}
              >
                <p className={`text-xs capitalize`}>
                  {category == "SE" ? "Socio Economic" : category}
                </p>
              </div>
            ))}
          </div>
          {/* <div
            className="relative p-2"
            onMouseEnter={mouseHover}
            onMouseLeave={mouseHover}
          >
            <p className="text-xs">Configuration</p>
            {isDropdownOpen && (
              <div className="absolute flex flex-col border border-green-600 p-2 rounded-2xl gap-2 w-42 right-0 top-5 z-50 bg-white shadow-lg">
                <Link
                  href="https://docs.google.com/spreadsheets/d/1Jb9pmjGoUmvh2Q2npCZscegkp5dpqrs1o-PHWOQoBoI/edit?gid=357400504#gid=357400504"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 p-2 hover:bg-green-50 rounded-lg"
                >
                  <File className="w-4 h-4 sm:w-5 sm:h-5" />
                  <p className="text-sm">Get csv template</p>
                </Link>
                <div
                  className="flex gap-2 p-2 cursor-pointer hover:bg-green-50 rounded-lg"
                  onClick={handleOpenImportTab}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleOpenImportTab();
                    }
                  }}
                >
                  <FileUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  <p className="text-sm">Import csv</p>
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
      {/* Import Modal */}
      {isImportOpen && (
        <ImportModal
          isOpen={isImportOpen}
          onClose={handleOpenImportTab}
          fileInputRef={fileInputRef}
        />
      )}

      {/* DSS Concept Modal */}
      {isDssConceptOpen && (
        <DSSConceptModal
          isOpen={isDssConceptOpen}
          onClose={handleOpenDssConceptTab}
        />
      )}

      {/* dashboard content */}
      <div className="flex h-full lg:flex-row justify-between gap-2">
        {/* scenario menu */}
        <div
          id="scenario-menu"
          className={`${isScenarioOpen
            ? "w-full lg:w-1/3 bg-white border border-gray-200"
            : "w-0 border-none -translate-x-full"
            } rounded-lg lg:rounded-2xl py-2 md:py-4 transition-all duration-200 overflow-hidden h-[70dvh] flex flex-col items-center`}
        >
          <ScenarioMenu
            simulationState={simulationState}
            category="contextSpecific"
            handleOpenScenarioTab={handleOpenScenarioTab}
          />
          <SimulationForm
            category="contextSpecific"
            simulationState={simulationState}
            FormInputs={contextSpecificInput}
          />
        </div>

        {/* chart content */}
        <div
          className={`${isScenarioOpen ? "hidden lg:flex" : "flex"} w-full bg-white overflow-auto h-[70dvh] rounded-2xl`}
        >
          <div
            className={`w-full p-2 overflow-auto lg:overflow-visible ${isScenarioOpen
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 grid-flow-row"
              } gap-2 sm:gap-3 md:gap-4 lg:gap-6`}
          >
            {displayedMetrics.map((metric, index) => (
              <ChartWidget
                category={"context"}
                key={metric.id}
                metric={metric}
                chartIndex={index}
                categories={yearsArray}
                isScenarioOpen={isScenarioOpen}
              />
            ))}
            {!isScenarioOpen && (
              <div className="w-full h-full min-h-[150px] sm:min-h-[180px] md:min-h-[200px] max-w-full mx-auto bg-white rounded-lg sm:col-span-2 lg:col-span-2 lg:row-span-1 lg:row-start-1 lg:row-end-3 lg:col-start-7">
                <TableWidget category={"context"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextSpecificPage;
