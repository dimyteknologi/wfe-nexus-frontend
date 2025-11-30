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
