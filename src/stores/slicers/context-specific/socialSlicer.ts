import { IApiRes, IBaselineData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FOOD_DEMAND_SIDE } from "@/lib/constant/initialDataContext.constans";

interface PopulationSliceState {
  data: IApiRes | null;
  baseline: IBaselineData | null;
  error: string | null;
}

const generateData = (): IApiRes => {
  const years = Array.from({ length: 10 }, (_, i) => 2015 + i);

  const values: number[] = [];
  let value = FOOD_DEMAND_SIDE.POPULATION_INITIAL;

  const increasePerYear =
    FOOD_DEMAND_SIDE.POPULATION_INITIAL * FOOD_DEMAND_SIDE.POPULATION_GROWTH;

  for (let i = 0; i < years.length; i++) {
    values.push(Number(value.toFixed(2)));
    value += increasePerYear;
  }

  return {
    data: {
      label: "Social",
      unit: "People",
      years,
      parameters: [
        {
          name: "Population",
          values,
        },
      ],
    },
  };
};

const initialState: PopulationSliceState = {
  data: generateData(),
  baseline: null,
  error: null,
};

const socialSlice = createSlice({
  name: "social",
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

export const { setData, setError, setBaseline } = socialSlice.actions;
export default socialSlice.reducer;
