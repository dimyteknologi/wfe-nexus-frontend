import { RAINFALL } from "@/lib/constant/initialDataContext.constans";
import { IApiRes, IBaselineData } from "@/lib/types/response";
import { constantAdd } from "@/lib/utils/formulas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResourceSupplySliceState {
  data: IApiRes | null;
  baseline: IBaselineData | null;
  error: string | null;
}

const generateValues = (yearsCount: number): number[] => {
  const values: number[] = [];

  const increasePerYear =
    (RAINFALL.ANNUAL_RAINFALL / 1000) * RAINFALL.AREA_SIZE * 10000;

  for (let i = 0; i < yearsCount; i++) {
    values.push(Number(increasePerYear.toFixed(2)));
  }

  return values;
};

const generateData = (): IApiRes => {
  const years = Array.from({ length: 10 }, (_, i) => 2015 + i);

  return {
    data: {
      label: "Water Resource Supply",
      unit: "m3/year",
      years,
      parameters: [
        {
          name: "Rainfall Debit",
          values: generateValues(years.length),
        },
        {
          name: "Surface Water Debit",
          values: generateValues(years.length),
        },
        {
          name: "Available Water Surface",
          values: constantAdd(generateValues(years.length), 1),
        },
        {
          name: "Ground Water Debit",
          values: Array.from({ length: 10 }, (_, i) => 0),
        },
        {
          name: "Ground Water Supply",
          values: Array.from({ length: 10 }, (_, i) => 0),
        },
      ],
    },
  };
};

const initialState: ResourceSupplySliceState = {
  data: generateData(),
  baseline: null,
  error: null,
};

const resourceSupplySlicer = createSlice({
  name: "resourceSupply",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IApiRes>) => {
      state.data = action.payload;
    },
    setBaseline: (state, action: PayloadAction<IBaselineData>) => {
      state.baseline = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.baseline = null;
      state.error = action.payload;
    },
  },
});

export const { setData, setBaseline, setError } = resourceSupplySlicer.actions;
export default resourceSupplySlicer.reducer;
