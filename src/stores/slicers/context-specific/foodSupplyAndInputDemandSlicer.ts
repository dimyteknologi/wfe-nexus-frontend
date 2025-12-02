import { AGRICULTURE_PRODUCTION_DEMAND } from "@/lib/constant/initialDataContext.constans";
import { IApiRes, IBaselineData } from "@/lib/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FoodSupplyAndInputDemandSliceState {
  data: IApiRes | null;
  baseline: IBaselineData | null;
  error: string | null;
}

const generateValues = (initialValue: number, yearsCount: number): number[] => {
  const values: number[] = [];
  let value = initialValue;

  for (let i = 0; i < yearsCount; i++) {
    values.push(Number(value.toFixed(2)));
    value += initialValue;
  }

  return values;
};

const generateData = (): IApiRes => {
  const years = Array.from({ length: 10 }, (_, i) => 2015 + i);

  return {
    data: {
      label: "Paddy Per Fied Per Seed",
      unit: "ha",
      years,
      parameters: [
        {
          name: "INPARI_32",
          values: generateValues(
            AGRICULTURE_PRODUCTION_DEMAND.INPARI_32.AREA_HA,
            years.length,
          ),
        },
        {
          name: "CIHERANG",
          values: generateValues(
            AGRICULTURE_PRODUCTION_DEMAND.CIHERANG.AREA_HA,
            years.length,
          ),
        },
        {
          name: "MEKONGGA",
          values: generateValues(
            AGRICULTURE_PRODUCTION_DEMAND.MEKONGGA.AREA_HA,
            years.length,
          ),
        },
        {
          name: "HIPPASERIES",
          values: generateValues(
            AGRICULTURE_PRODUCTION_DEMAND.HIPPASERIES.AREA_HA,
            years.length,
          ),
        },
        {
          name: "LOKAL",
          values: generateValues(
            AGRICULTURE_PRODUCTION_DEMAND.LOKAL.AREA_HA,
            years.length,
          ),
        },
      ],
    },
  };
};

const initialState: FoodSupplyAndInputDemandSliceState = {
  data: generateData(),
  baseline: null,
  error: null,
};

const foodSupplyAndInputDemandSlicer = createSlice({
  name: "foodSupplyAndInputDemand",
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

export const { setData, setBaseline, setError } =
  foodSupplyAndInputDemandSlicer.actions;
export default foodSupplyAndInputDemandSlicer.reducer;
