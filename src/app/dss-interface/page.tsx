"use client";

import { useRef, useState } from "react";
import Navigation from "@/components/organisms/Navigation";
import { FileUp, File, X } from "lucide-react";
import SimulationForm from "@/components/form/simulation";
import ScenarioMenu from "@/components/organisms/Menu/Scenario";
import ChartWidget from "@/components/chart/widget";
import { useAppDispatch, useAppSelector } from "../../stores/root-reducer";
import {
  setImportModal,
  setScenarioModal,
} from "@/stores/slicers/dssModalSlicer";
import Link from "next/link";
import ImportModal from "@/components/importModal";

const DSSPage = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [uploadMessage, setUploadMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();
  const dssModalState = useAppSelector((state) => state.dssModal);

  const isImportOpen = dssModalState.importModal;
  const isScenarioOpen = dssModalState.scenarioModal;
  const isAssumptionOpen = dssModalState.assumptionModal;

  // Konstanta untuk validasi file
  const maxSizeMB = 10;
  const acceptedFileTypes = ".csv,.xlsx,.xls";

  const handleOpenScenarioTab = () => {
    dispatch(setScenarioModal(!dssModalState.scenarioModal));
  };

  const handleOpenImportTab = () => {
    dispatch(setImportModal(!dssModalState.importModal));

    setUploadMessage("");
  };

  const mouseHover = () => {
    setIsDropdownOpen((current) => !current);
  };

  return (
    <div className="w-full px-6 pt-28 overflow-hidden">
      {/* dashboard menu */}
      <div className="relative flex my-2 sm:my-4 justify-between items-center">
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
        <div
          className="relative"
          onMouseEnter={mouseHover}
          onMouseLeave={mouseHover}
        >
          <p className="text-sm">Configuration</p>
          {isDropdownOpen && (
            <div className="absolute flex flex-col border border-green-600 p-2 rounded-2xl gap-2 w-42 right-0 top-5 z-100 bg-white">
              <Link
                href="https://docs.google.com/spreadsheets/d/1Jb9pmjGoUmvh2Q2npCZscegkp5dpqrs1o-PHWOQoBoI/edit?gid=357400504#gid=357400504"
                target="_blank"
              >
                <div className="flex gap-2">
                  <File className="w-4 h-4 sm:w-5 sm:h-5" />
                  <p className="text-sm">Get csv template</p>
                </div>
              </Link>
              <div
                className="flex gap-2 cursor-pointer"
                onClick={handleOpenImportTab}
              >
                <FileUp className="w-4 h-4 sm:w-5 sm:h-5" />
                <p className="text-sm">Import csv</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {isImportOpen && <ImportModal />}

      {/* dashboard content */}
      <div className="flex h-full lg:flex-row justify-between gap-2">
        {/* scenario menu */}
        <div
          className={`${
            isScenarioOpen
              ? "w-full lg:w-1/3 bg-white border border-gray-200"
              : "w-0 border-none -translate-x-full"
          } rounded-lg lg:rounded-2xl py-2 md:py-4 transition-all duration-200 overflow-hidden h-[70dvh] flex flex-col items-center`}
        >
          <ScenarioMenu
            handleOpenScenarioTab={handleOpenScenarioTab}
            errors={errors}
          />
          <SimulationForm />
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
            <ChartWidget
              data={[]}
              categories={[]}
              isScenarioOpen={isScenarioOpen}
            />
            <ChartWidget
              data={[]}
              categories={[]}
              isScenarioOpen={isScenarioOpen}
            />
            <ChartWidget
              data={[]}
              categories={[]}
              isScenarioOpen={isScenarioOpen}
            />
            <ChartWidget
              data={[]}
              categories={[]}
              isScenarioOpen={isScenarioOpen}
            />

            {!isScenarioOpen && (
              <div className="w-full h-full min-h-[150px] sm:min-h-[180px] md:min-h-[200px] max-w-full mx-auto bg-white rounded-lg sm:col-span-2 lg:col-span-2 lg:row-span-1 lg:row-start-1 lg:row-end-3 lg:col-start-7">
                {/* Table<iTableData>
                  columns={[
                    { key: "year", label: "Years", className: "w-16" },
                    { key: "baseline_1", label: "Baseline 1" },
                    { key: "baseline_2", label: "Baseline 2" },
                  ]}
                  data={[]}
                /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSSPage;
