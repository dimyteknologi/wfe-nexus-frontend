import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Constants
const PERIODES: Periode[] = ["2025-2030", "2031-2040", "2041-2045"];
const SEKTOR_LIST: Sektor[] = [
  "AGRICULTURE",
  "LIVESTOCK",
  "ENERGY",
  "INDUSTRY",
  "WATER_MANAGEMENT",
  "DEMOGRAPHY",
];

const createInitialData = (): DataSkenario[] =>
  PERIODES.map((periode) => ({ nilai: 0, periode }));

const createInitialSkenario = (): Skenario => ({
  nama: "baseline",
  data: createInitialData(),
});

const createInitialSektorData = (sektor: Sektor): SektorData => ({
  sektor,
  skenario: [createInitialSkenario()],
});

const INITIAL_STATE: StateSimulasi = SEKTOR_LIST.map(createInitialSektorData);

export const simulasiSlice = createSlice({
  name: "simulasi",
  initialState: INITIAL_STATE,
  reducers: {
    updateNilai: {
      reducer: (
        state,
        action: PayloadAction<{
          sektor: Sektor;
          namaSkenario: string;
          periode: Periode;
          nilai: number;
        }>,
      ) => {
        const { sektor, namaSkenario, periode, nilai } = action.payload;

        const sektorObj = state.find((s) => s.sektor === sektor);
        if (!sektorObj) return;

        const skenario = sektorObj.skenario.find(
          (s) => s.nama === namaSkenario,
        );
        if (!skenario) return;

        const dataItem = skenario.data.find((d) => d.periode === periode);
        if (dataItem) dataItem.nilai = nilai;
      },
      prepare: (payload: {
        sektor: Sektor;
        namaSkenario: string;
        periode: Periode;
        nilai: number;
      }) => ({ payload }),
    },

    addSkenario: (
      state,
      {
        payload: { sektor, namaSkenario },
      }: PayloadAction<{
        sektor: Sektor;
        namaSkenario: string;
      }>,
    ) => {
      const sektorObj = state.find((s) => s.sektor === sektor);
      if (!sektorObj) return;

      const exists = sektorObj.skenario.some((s) => s.nama === namaSkenario);
      if (!exists) {
        sektorObj.skenario.push({
          nama: namaSkenario,
          data: createInitialData(),
        });
      }
    },

    resetSkenario: () => INITIAL_STATE,
  },
});

export const { updateNilai, addSkenario, resetSkenario } =
  simulasiSlice.actions;
export const simulasiReducer = simulasiSlice.reducer;
