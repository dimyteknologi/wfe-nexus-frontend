import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "@/stores/storage";
import { gdpApi } from "@/stores/api/gdpApi";
import { livestockApi } from "@/stores/api/livestockApi";
import { populationApi } from "@/stores/api/populationApi";
import { fisheryApi } from "@/stores/api/fisheryApi";
import { agricultureApi } from "@/stores/api/agricultureApi";
import scenarioReducer from "@/stores/slicers/dssScenarioSlicer";
import agricultureReducer from "@/stores/slicers/agricultureSlicer";
import gdpReducer from "@/stores/slicers/gdpSlicer";
import livestockReducer from "@/stores/slicers/livestockSlicer";
import populationReducer from "@/stores/slicers/populationSlicer";
import fisheryReducer from "@/stores/slicers/fisherySlicer";
import simulationReducer from "@/stores/slicers/dssInputSlicer";
import projectionReducer from "@/stores/slicers/dssProjectionSlicer";

export const appReducer = combineReducers({
  scenarios: scenarioReducer,
  projectionResult: projectionReducer,
  simulation: simulationReducer,
  gdp: gdpReducer,
  livestock: livestockReducer,
  population: populationReducer,
  fishery: fisheryReducer,
  agriculture: agricultureReducer,
  [gdpApi.reducerPath]: gdpApi.reducer,
  [agricultureApi.reducerPath]: agricultureApi.reducer,
  [livestockApi.reducerPath]: livestockApi.reducer,
  [populationApi.reducerPath]: populationApi.reducer,
  [fisheryApi.reducerPath]: fisheryApi.reducer,
});

// custom logic state
// export const rootReducer = (state: any, action: any) => {
//     if (action.type === "LOGOUT") {
//         state = undefined;
//     }
//     return appReducer(state, action);
// };

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["scenarios", "projections"],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, appReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      gdpApi.middleware,
      livestockApi.middleware,
      populationApi.middleware,
      agricultureApi.middleware,
      fisheryApi.middleware,
    ),
});

export const persistor = persistStore(store);
