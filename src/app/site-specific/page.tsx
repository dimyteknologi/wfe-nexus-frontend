"use client";

// import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { FileUp, File } from "lucide-react";
import { useInitializeData } from "@/hooks/useInitDummy";
import SimulationForm from "@/components/form/simulation";
import ScenarioMenu from "@/components/organisms/Menu/Scenario";
import ChartWidget from "@/components/chart/widget";
import { useAppDispatch, useAppSelector } from "../../stores/root-reducer";
import { selectDisplayedMetrics } from "@/stores/selectors/dssDashboardSelector";
import { shallowEqual } from "react-redux";
import {
  setDssConceptModal,
  setImportModal,
  setScenarioModal,
} from "@/stores/slicers/dssModalSlicer";
import Link from "next/link";
import ImportModal from "@/components/importModal";
import DSSConceptModal from "@/components/dssConceptModal";
import Alert from "@/components/alert";
import { setChartsToCategoryPreset } from "@/stores/slicers/dashboardSlicer";
import { ALL_METRICS } from "@/lib/constant/metrics";
import TableWidget from "@/components/table/widget";
import { siteSpecificInput } from "@/config/form";

const DSSPage = () => {
  // init data
  useInitializeData();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const dssModalState = useAppSelector((state) => state.dssModal);
  const simulationState = useAppSelector(
    (state) => state.siteSpecific,
    shallowEqual,
  );
  const displayedMetrics = useAppSelector(selectDisplayedMetrics);
  const yearsArray = Array.from({ length: 36 }, (_, i) => 2010 + i);
  const isImportOpen = dssModalState.importModal;
  const isScenarioOpen = dssModalState.scenarioModal;
  const isDssConceptOpen = dssModalState.dssConceptModal;
  const uniqueCategories = [
    ...new Set(ALL_METRICS.map((metric) => metric.category)),
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

  const mouseHover = useCallback(() => {
    setIsDropdownOpen((current) => !current);
  }, []);

  const handlePreset = (category: string) => {
    dispatch(setChartsToCategoryPreset(category));
  };

  return (
    <div className="w-full px-6 pt-28 overflow-hidden">
      <Alert />
      {/* dashboard menu */}
      <div className="relative flex my-2 sm:my-4 justify-between items-center">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-xs text-white font-bold ${
              isDssConceptOpen ? "bg-green-700" : "bg-green-600"
            }`}
            onClick={handleOpenDssConceptTab}
            aria-expanded={isDssConceptOpen}
            aria-controls="dss-concept-modal"
          >
            DSS Concept
          </button>
          <button
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-xs text-white font-bold ${
              isScenarioOpen ? "bg-green-700" : "bg-green-600"
            }`}
            onClick={handleOpenScenarioTab}
            aria-expanded={isScenarioOpen}
            aria-controls="scenario-menu"
          >
            Scenario Menu
          </button>
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
          <div
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
          </div>
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
          className={`${
            isScenarioOpen
              ? "w-full lg:w-1/3 bg-white border border-gray-200"
              : "w-0 border-none -translate-x-full"
          } rounded-lg lg:rounded-2xl py-2 md:py-4 transition-all duration-200 overflow-hidden h-[70dvh] flex flex-col items-center`}
        >
          <ScenarioMenu
            simulationState={simulationState}
            category="siteSpecific"
            handleOpenScenarioTab={handleOpenScenarioTab}
            errors={errors}
          />
          <SimulationForm
            category="siteSpecific"
            simulationState={simulationState}
            FormInputs={siteSpecificInput}
          />
        </div>

        {/* chart content */}
        <div
          className={`${isScenarioOpen ? "hidden lg:flex" : "flex"} w-full bg-white overflow-auto h-[70dvh] rounded-2xl`}
        >
          <div
            className={`w-full p-2 overflow-auto lg:overflow-visible ${
              isScenarioOpen
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 grid-flow-row"
            } gap-2 sm:gap-3 md:gap-4 lg:gap-6`}
          >
            {displayedMetrics.map((metric, index) => (
              <ChartWidget
                key={metric.id}
                metric={metric}
                chartIndex={index}
                categories={yearsArray}
                isScenarioOpen={isScenarioOpen}
              />
            ))}
            {!isScenarioOpen && (
              <div className="w-full h-full min-h-[150px] sm:min-h-[180px] md:min-h-[200px] max-w-full mx-auto bg-white rounded-lg sm:col-span-2 lg:col-span-2 lg:row-span-1 lg:row-start-1 lg:row-end-3 lg:col-start-7">
                <TableWidget />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSSPage;
