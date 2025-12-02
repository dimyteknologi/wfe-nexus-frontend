import { useEffect } from "react";
import { useAppDispatch } from "@/stores/root-reducer";
import { PayloadAction } from "@reduxjs/toolkit";
import { setData as setGdpData } from "@/stores/slicers/gdrpSlicer";
import { setData as setLivestockData } from "@/stores/slicers/livestockSlicer";
import { setData as setAgricultureData } from "@/stores/slicers/agricultureSlicer";
import { setData as setPopulationData } from "@/stores/slicers/populationSlicer";
import { setData as setFisheryData } from "@/stores/slicers/fisherySlicer";
import { useGetAgriculturesQuery } from "@/stores/api/agricultureApi";
import { useGetFisheriesQuery } from "@/stores/api/fisheryApi";
import { useGetGdpsQuery } from "@/stores/api/gdpApi";
import { useGetLiveStocksQuery } from "@/stores/api/livestockApi";
import { useGetPopulationsQuery } from "@/stores/api/populationApi";

type QueryHookResult =
  | ReturnType<typeof useGetGdpsQuery>
  | ReturnType<typeof useGetFisheriesQuery>
  | ReturnType<typeof useGetAgriculturesQuery>
  | ReturnType<typeof useGetLiveStocksQuery>
  | ReturnType<typeof useGetPopulationsQuery>;

const useSyncToSlice = <P>(
  queryResult: QueryHookResult,
  actionCreator: (payload: P) => PayloadAction<P>,
) => {
  const dispatch = useAppDispatch();
  const { isSuccess, data } = queryResult;
  
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(actionCreator(data));
    }
  }, [isSuccess, data, dispatch, actionCreator]);
};

export const useInitializeData = () => {
  const gdpQuery = useGetGdpsQuery();
  const fisheryQuery = useGetFisheriesQuery();
  const livestockQuery = useGetLiveStocksQuery();
  const agricultureQuery = useGetAgriculturesQuery();
  const populationQuery = useGetPopulationsQuery();

  useSyncToSlice(gdpQuery, setGdpData);
  useSyncToSlice(fisheryQuery, setFisheryData);
  useSyncToSlice(livestockQuery, setLivestockData);
  useSyncToSlice(agricultureQuery, setAgricultureData);
  useSyncToSlice(populationQuery, setPopulationData);

  const allQueries = [
    gdpQuery,
    fisheryQuery,
    livestockQuery,
    agricultureQuery,
    populationQuery,
  ];

  const isLoading = allQueries.some((query) => query.isLoading);
  const isSuccess = allQueries.every((query) => query.isSuccess);
  const isError = allQueries.some((query) => query.isError);

  return { isLoading, isSuccess, isError };
};
