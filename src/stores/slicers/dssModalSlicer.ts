import { createSlice } from "@reduxjs/toolkit";

interface IModalProps {
  scenarioModal: boolean;
  importModal: boolean;
  assumptionModal: boolean;
  dssConceptModal: boolean;
}

const initialModalValue: IModalProps = {
  scenarioModal: true,
  importModal: false,
  assumptionModal: false,
  dssConceptModal: false,
};

const dssModalSlice = createSlice({
  name: "dssModal",
  initialState: initialModalValue,
  reducers: {
    setScenarioModal: (state, action) => {
      state.scenarioModal = action.payload;
      if (action.payload) {
        state.importModal = false;
        state.assumptionModal = false;
        state.dssConceptModal = false;
      }
    },
    setImportModal: (state, action) => {
      state.importModal = action.payload;
      if (action.payload) {
        state.scenarioModal = false;
        state.assumptionModal = false;
        state.dssConceptModal = false;
      }
    },
    setAssumptionModal: (state, action) => {
      state.assumptionModal = action.payload;

      if (action.payload) {
        state.scenarioModal = false;
        state.importModal = false;
        state.dssConceptModal = false;
      }
    },
    setDssConceptModal: (state, action) => {
      state.dssConceptModal = action.payload;

      if (action.payload) {
        state.scenarioModal = false;
        state.importModal = false;
        state.assumptionModal = false;
      }
    },
    closeAllModals: (state) => {
      state.scenarioModal = false;
      state.importModal = false;
      state.assumptionModal = false;
      state.dssConceptModal = false;
    },
  },
});

export const {
  setAssumptionModal,
  setImportModal,
  setScenarioModal,
  setDssConceptModal,
} = dssModalSlice.actions;
export const dssModalReducer = dssModalSlice.reducer;
