import { createSlice } from "@reduxjs/toolkit";

interface IModalProps {
  scenarioModal: boolean;
  importModal: boolean;
  assumptionModal: boolean;
}

const initialModalValue: IModalProps = {
  scenarioModal: false,
  importModal: false,
  assumptionModal: false,
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
      }
    },
    setImportModal: (state, action) => {
      state.importModal = action.payload;
      if (action.payload) {
        state.scenarioModal = false;
        state.assumptionModal = false;
      }
      console.log(state.importModal);
    },
    setAssumptionModal: (state, action) => {
      state.assumptionModal = action.payload;

      if (action.payload) {
        state.scenarioModal = false;
        state.importModal = false;
      }
    },
    closeAllModals: (state) => {
      state.scenarioModal = false;
      state.importModal = false;
      state.assumptionModal = false;
    },
  },
});

export const { setAssumptionModal, setImportModal, setScenarioModal } =
  dssModalSlice.actions;
export const dssModalReducer = dssModalSlice.reducer;
