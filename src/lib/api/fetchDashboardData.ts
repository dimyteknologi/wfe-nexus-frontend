import { ICombinedApiResponse } from "../types/response";

const fetchDashboardData = async (): Promise<ICombinedApiResponse> => {
  try {
    const [population, gdp, agriculture, livestock, fishery] =
      await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-population`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-gdp`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-pertanian`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-peternakan`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-perikanan`),
      ]);

    return {
      populationData: await population.json(),
      gdpData: await gdp.json(),
      agricultureData: await agriculture.json(),
      livestockData: await livestock.json(),
      fisheryData: await fishery.json(),
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw new Error("Failed to load dashboard data");
  }
};

export default fetchDashboardData;
