import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "@/stores/storage";

import { listenerMiddleware } from "@/stores/listenerMiddleware";
import { DssPageListener } from "./listener/dssPageListener";

import { gdpApi } from "@/stores/api/gdpApi";
import { livestockApi } from "@/stores/api/livestockApi";
import { populationApi } from "@/stores/api/populationApi";
import { fisheryApi } from "@/stores/api/fisheryApi";
import { agricultureApi } from "@/stores/api/agricultureApi";

import scenarioReducer from "@/stores/slicers/dssScenarioSlicer";
import agricultureReducer from "@/stores/slicers/agricultureSlicer";
import gdpReducer from "@/stores/slicers/gdrpSlicer";
import livestockReducer from "@/stores/slicers/livestockSlicer";
import populationReducer from "@/stores/slicers/populationSlicer";
import fisheryReducer from "@/stores/slicers/fisherySlicer";
import simulationReducer from "@/stores/slicers/dssInputSlicer";
import waterDemandReducer from "@/stores/slicers/waterDemandSlicer";
import energyDemandReducer from "@/stores/slicers/EnergyDemandSlicer";
import landCoverReducer from "@/stores/slicers/landCoverSlicer";
import landPortionReducer from "@/stores/slicers/landPortionSlicer";
import alertReducer from "@/stores/slicers/alertSlicer";
import { dssModalReducer } from "./slicers/dssModalSlicer";
import dashboardReducer from "@/stores/slicers/dashboardSlicer";
import foodDemandReducer from "@/stores/slicers/foodDemandSlicer";
import resourceReducer from "@/stores/slicers/resourceSlicer";
import { apAreaReducer } from "./slicers/intermediateOuput";

DssPageListener();
// addGdpListeners();
// addPopulationListeners();
// addAgricultureListener();
// addLivestockListeners();
// addFisheryListeners();

export const appReducer = combineReducers({
  scenarios: scenarioReducer,
  dashboard: dashboardReducer,
  simulation: simulationReducer,
  gdrp: gdpReducer,
  resource: resourceReducer,
  livestock: livestockReducer,
  population: populationReducer,
  fishery: fisheryReducer,
  agriculture: agricultureReducer,
  waterDemand: waterDemandReducer,
  foodDemand: foodDemandReducer,
  energyDemand: energyDemandReducer,
  landCover: landCoverReducer,
  landPortion: landPortionReducer,
  dssModal: dssModalReducer,
  alert: alertReducer,
  apArea: apAreaReducer,
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
  whitelist: ["scenarios"],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, appReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(
        gdpApi.middleware,
        livestockApi.middleware,
        populationApi.middleware,
        agricultureApi.middleware,
        fisheryApi.middleware,
      )
      .prepend(listenerMiddleware.middleware),
});

export const persistor = persistStore(store);
export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
