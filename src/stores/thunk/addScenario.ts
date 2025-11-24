import { IRootState, store } from "..";
import { setError } from "../slicers/agricultureSlicer";
import {
  addScenarioSuccess,
  ScenarioItem,
  STORAGE_KEY,
} from "../slicers/dssScenarioSlicer";

export const addScenario =
  (item: ScenarioItem) =>
  (dispatch: typeof store.dispatch, getState: IRootState) => {
    try {
      // update Redux state
      dispatch(addScenarioSuccess(item));

      // persist to localStorage
      const state = getState().scenarios.data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      dispatch(setError("Fail saving scenario"));
    }
  };
