import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/root-reducer";
import {
  updateSimulationSelect as updateSimulationSelectSiteSpecific,
  // SimulationState,
  // updateSimulationName,
  // resetSimulation,
} from "@/stores/slicers/siteSpecificInputSlicer";
import {
  SiteSpecificState,
  DssSiteSpecificState,
} from "@/stores/slicers/siteSpecificInputSlicer";
import {
  ContextSpecificState,
  DssContextSpecificState,
  updateSimulationName,
  updateSimulationSelect as updateSimulationSelectContextSpecific,
} from "@/stores/slicers/contextSpecificInputSlicer";
import { resetToBaseline } from "@/stores/thunk/baselineReset";
// import { addScenario, loadScenarios } from "@/stores/slicers/dssScenarioSlicer";
import { addScenario } from "@/stores/thunk/addScenario";
import { convertScenariosVersion, loadScenarios } from "@/stores/thunk/loadScenario";
import { X, Play, ChevronDown, RefreshCcw, Info } from "lucide-react";
import { normalizeKey } from "@/lib/utils";
import { setAlert } from "@/stores/slicers/alertSlicer";
import { ScenarioItem } from "@/stores/slicers/dssScenarioSlicer";
import { useCreateScenarioMutation, useGetScenariosQuery } from "@/stores/api/scenarioApi";

interface ScenarioMenuProps {
  simulationState: DssSiteSpecificState | DssContextSpecificState;
  category: "siteSpecific" | "contextSpecific";
  handleOpenScenarioTab: () => void;
  errors: Record<string, string>;
}

const ScenarioMenu: React.FC<ScenarioMenuProps> = ({
  handleOpenScenarioTab,
  category,
  errors,
  simulationState,
}) => {
  const dispatch = useAppDispatch();
  const {
    data: scenarios,
    success,
    error,
  } = useAppSelector((state) => state.scenarios);
  const [simulationName, setSimulationName] = useState("");
  const { contextSpecific } = useAppSelector((state) => state.scenarios);
  const [createScenario] = useCreateScenarioMutation();
  const { data: siteScenarios = [] } = useGetScenariosQuery({});
  const [isHover, setIsHover] = useState(false);
  const mouseHover = useCallback(() => setIsHover((current) => !current), []);
  const handleSimulationName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setSimulationName(e.target.value);
    },
    [simulationName],
  );

  useEffect(() => {
    convertScenariosVersion();
  }, []);

  useEffect(() => {
    dispatch(loadScenarios());
  }, [dispatch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (category === "siteSpecific") {
        dispatch(
          updateSimulationSelectSiteSpecific({
            name: e.target.name,
            value: e.target.value,
          }),
        );
      } else {
        dispatch(
          updateSimulationSelectContextSpecific({
            name: e.target.name,
            value: e.target.value,
          }),
        );
      }
      setSimulationName(e.target.value);
    },
    [],
  );

  // const handleSaveSimulation = () => {
  //   if (Object.keys(errors).length === 0) {
  //     dispatch(updateSimulationName(simulationName));
  //     dispatch(
  //       addScenario({ simulationName, category, data: simulationState.active }),
  //     );
  //     dispatch(
  //       setAlert({
  //         message: success ?? "Success to save scenario!",
  //         type: "success",
  //       }),
  //     );
  //     dispatch(resetToBaseline(category));
  //     setSimulationName("");
  //   } else {
  //     dispatch(
  //       setAlert({
  //         message: error ?? "Failed to save scenario!",
  //         type: "error",
  //       }),
  //     );
  //   }
  // };

  const handleSaveSimulation = async () => {
    if (Object.keys(errors).length !== 0) {
      dispatch(setAlert({ message: "Failed to save scenario!", type: "error" }));
      return;
    }

    try {
      dispatch(updateSimulationName(simulationName));

      if (category === "siteSpecific") {
        await createScenario(
          {...simulationState.active, simulationName},
        ).unwrap();
      } else {
        dispatch(
          addScenario({
            simulationName,
            category,
            data: simulationState.active,
          })
        );
      }

      dispatch(
        setAlert({
          message: "Success to save scenario!",
          type: "success",
        })
      );

      dispatch(resetToBaseline(category));
      setSimulationName("");

    } catch (err) {
      dispatch(
        setAlert({
          message: "Failed to save scenario!",
          type: "error",
        })
      );
    }
  };

  // const scenarioOptions = useMemo(() => {
  //   if (!scenarios) {
  //     return [];
  //   }
  //   const data =
  //     category == "siteSpecific"
  //       ? scenarios.siteSpecific
  //       : scenarios.contextSpecific;
  //   return data?.filter(
  //     (s: ScenarioItem, index: number, arr: ScenarioItem[]) =>
  //       index === arr.findIndex((t) => t.simulationName === s.simulationName),
  //   );
  // }, [scenarios]);
  const scenarioOptions = useMemo(() => {
    let data: SiteSpecificState[] | ContextSpecificState[] = [];

    if (category === "siteSpecific") {
      data = siteScenarios.data ?? [];
    } else {
      data = contextSpecific ?? [];
    }

    return data.filter(
      (s, index, arr) =>
        index === arr.findIndex((t) => t.simulationName === s.simulationName)
    );
  }, [category, siteScenarios, contextSpecific]);


  const isSaveDisabled = Object.keys(errors).length > 0 || !simulationName;

  return (
    <div className="w-full sticky top-0 z-10 backdrop-blur-lg bg-white/80 supports-[backdrop-filter]:bg-white/60 border-b border-gray-300 pb-2 md:pb-4 px-2 sm:px-4 md:px-6">
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
        {/* header */}
        <div className="flex justify-between border-b border-gray-600 items-center">
          <div
            className="relative"
            onMouseEnter={mouseHover}
            onMouseLeave={mouseHover}
          >
            <div>
              <Info size={15} />
            </div>
            {isHover && (
              <div className="absolute z-500 left-0 top-0 w-75 translate-y-5 bg-white border-2 border-green-600 rounded-xl p-2 shadow-xl">
                <p className="text-sm font-bold">
                  Simulation Name :{" "}
                  <span className="font-normal">
                    Please enter your simulation name to be saved in the system
                  </span>
                </p>
                <p className="text-sm font-bold">
                  Scenario :{" "}
                  <span className="font-normal">
                    You can select scenario already named and simulated
                  </span>
                </p>
              </div>
            )}
          </div>
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
                value={simulationName || ""}
                onChange={handleSimulationName}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg outline-none font-medium border bg-white/90 shadow-xs border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                placeholder="Enter simulation name"
              />
            </div>
            <div className="group w-full sm:w-auto">
              <button
                onClick={() => {
                  (dispatch(resetToBaseline(category)), setSimulationName(""));
                }}
                className={`w-full sm:w-auto p-2 sm:p-3 rounded-lg md:rounded-xl font-medium transition-all transform hover:scale-105 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg`}
                aria-label="Save current simulation"
              >
                <RefreshCcw className="w-4 h-4 md:w-5 md:h-5 mx-auto sm:mx-0" />
              </button>
            </div>
            <div className="group w-full sm:w-auto">
              <button
                onClick={handleSaveSimulation}
                className={`w-full sm:w-auto p-2 sm:p-3 rounded-lg md:rounded-xl font-medium transition-all transform hover:scale-105 ${isSaveDisabled
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
                  <option value="">-- select --</option>
                  {scenarioOptions?.map(
                    (scenario: SiteSpecificState | ContextSpecificState) => (
                      <option
                        key={normalizeKey(
                          scenario?.simulationName || "default",
                        )}
                        value={scenario.simulationName || ""}
                      >
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
                  <option value="">-- select --</option>
                  {scenarioOptions?.map(
                    (
                      scenario: SiteSpecificState | ContextSpecificState,
                      idx: number,
                    ) => (
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

export default React.memo(ScenarioMenu);
