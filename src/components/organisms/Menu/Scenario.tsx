import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/root-reducer";
import {
  updateValue,
  SimulationState,
  resetSimulation,
  // resetSimulation,
} from "@/stores/slicers/dssInputSlicer";
import { resetToBaseline } from "@/stores/thunk/baselineReset";
import { addScenario, loadScenarios } from "@/stores/slicers/dssScenarioSlicer";
import { X, Play, ChevronDown } from "lucide-react";
import { normalizeKey } from "@/lib/utils";
import { setAlert } from "@/stores/slicers/alertSlicer";

interface ScenarioMenuProps {
  handleOpenScenarioTab: () => void;
  errors: Record<string, string>;
}

const ScenarioMenu: React.FC<ScenarioMenuProps> = ({
  handleOpenScenarioTab,
  errors,
}) => {
  const dispatch = useAppDispatch();
  const simulationState = useAppSelector((state) => state.simulation);
  const {
    data: scenarios,
    success,
    error,
  } = useAppSelector((state) => state.scenarios);

  useEffect(() => {
    dispatch(loadScenarios());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const path = [e.target.name];
    const value = e.target.value;
    dispatch(updateValue({ path, value }));
  };

  const handleSaveSimulation = () => {
    if (Object.keys(errors).length === 0) {
      dispatch(addScenario(simulationState));
      dispatch(
        setAlert({
          message: success ?? "Success to save scenario!",
          type: "success",
        }),
      );
      dispatch(resetToBaseline());
      // dispatch(resetSimulation());
    } else {
      dispatch(
        setAlert({
          message: error ?? "Failed to save scenario!",
          type: "error",
        }),
      );
    }
  };

  const scenarioOptions = useMemo(() => {
    if (!scenarios) {
      return [];
    }
    return scenarios.filter(
      (s: SimulationState, index: number, arr: SimulationState[]) =>
        index === arr.findIndex((t) => t.simulationName === s.simulationName),
    );
  }, [scenarios]);

  const isSaveDisabled =
    Object.keys(errors).length > 0 || !simulationState.simulationName;

  return (
    <div className="w-full sticky top-0 z-10 backdrop-blur-lg bg-white/80 supports-[backdrop-filter]:bg-white/60 border-b border-gray-300 pb-2 md:pb-4 px-2 sm:px-4 md:px-6">
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
        {/* header */}
        <div className="flex justify-between border-b border-gray-600 items-center">
          <h1 className="text-lg md:text-xl">Scenario Menu</h1>
          <button
            onClick={handleOpenScenarioTab}
            className="p-1 md:p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* form */}
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6 items-end">
            <div className="flex-1 min-w-0">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Simulation Name
              </label>
              <input
                type="text"
                name="simulationName"
                value={simulationState.simulationName || ""}
                onChange={handleChange}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg outline-none font-medium border bg-white/90 shadow-xs border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                placeholder="Enter simulation name"
              />
            </div>
            <div className="group w-full sm:w-auto">
              <button
                onClick={handleSaveSimulation}
                className={`w-full sm:w-auto p-2 sm:p-3 rounded-lg md:rounded-xl font-medium transition-all transform hover:scale-105 ${
                  isSaveDisabled
                    ? "bg-gray-200 cursor-not-allowed text-gray-400"
                    : "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg"
                }`}
                disabled={isSaveDisabled}
                aria-label="Save current simulation"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 mx-auto sm:mx-0" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
            <div className="flex-1 min-w-0">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Select Scenario A
              </label>
              <div className="relative">
                <select
                  name="scenario_a"
                  value={simulationState.scenario_a || ""}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 md:px-4 md:py-2.5 text-sm text-gray-700 bg-white/90 border border-gray-300 rounded-lg shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                >
                  <option value="">-- Select an option --</option>
                  {scenarioOptions.map((scenario: SimulationState) => (
                    <option
                      key={normalizeKey(scenario?.simulationName || "default")}
                      value={scenario.simulationName || ""}
                    >
                      {scenario.simulationName}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Select Scenario B
              </label>
              <div className="relative">
                <select
                  name="scenario_b"
                  value={simulationState.scenario_b || ""}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 md:px-4 md:py-2.5 text-sm text-gray-700 bg-white/90 border border-gray-300 rounded-lg shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                >
                  <option value="">-- Select an option --</option>
                  {scenarioOptions.map(
                    (scenario: SimulationState, idx: number) => (
                      <option key={idx} value={scenario.simulationName || ""}>
                        {scenario.simulationName}
                      </option>
                    ),
                  )}
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
  );
};

export default ScenarioMenu;
