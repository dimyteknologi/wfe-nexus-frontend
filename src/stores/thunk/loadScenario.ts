import { store } from "..";
import { setError } from "../slicers/agricultureSlicer";
import {
  setScenariosFromStorage,
  STORAGE_KEY,
} from "../slicers/dssScenarioSlicer";

export const loadScenarios = () => (dispatch: typeof store.dispatch) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    dispatch(setScenariosFromStorage(parsed));
  } catch (err) {
    dispatch(setError("Fail loading scenarios"));
  }
};

export const convertScenariosVersion = () => (dispatch: typeof store.dispatch) => {
    const persistKey = "persist:root";
    const persistData = localStorage.getItem(persistKey);

    if (persistData) {
      const parsed = JSON.parse(persistData);
      const scenariosParsed = JSON.parse(parsed.scenarios);

      if (
        Array.isArray(scenariosParsed.data) &&
        scenariosParsed.data.length === 0
      ) {
        const newScenarios = {
          data: { siteSpecific: [], contextSpecific: [] },
        };
        parsed.scenarios = JSON.stringify(newScenarios);
        localStorage.setItem(persistKey, JSON.stringify(parsed));
      }
    }
}
