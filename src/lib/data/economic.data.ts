import fetchDashboardData from "../api/fetchAllData";
import { selectData, TYPE_DATA_SELECT } from "../utils/selectData";

const { gdpData } = await fetchDashboardData();

const getGdpLabel = selectData(gdpData.data, TYPE_DATA_SELECT.SELECT_TABLE);

const getGdpUnit = selectData(gdpData.data, TYPE_DATA_SELECT.SELECT_UNIT);

const getGdpYear = selectData(gdpData.data, TYPE_DATA_SELECT.SELECT_YEAR);

const getGdpData = selectData(gdpData.data, TYPE_DATA_SELECT.SELECT_PARAMETERS);
