export interface IBaseResponse<T> {
  data: T;
}

export interface IApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface IBaseData<TParams = Record<string, unknown>> {
  label: string;
  unit: string;
  years: number[];
  parameters: TParams;
}
// export interface Params {
// id: string;
//   name: string;
//   values: (number | null)[];
// }

export interface Params {
  name: string;
  average: number;
  growth: (number | null)[];
  values: (number | null)[];
}

export type IApiData = IBaseData<Omit<Params, "average" | "growth">[]>;
// export type IApiData = IBaseData<Params[]>
export type IBaselineData = IBaseData<Params[]>;
export type IApiRes = IBaseResponse<IApiData>;

export interface IPopulationData {
  laki: number[];
  perempuan: number[];
}

export type IPopResData = IBaseData<IPopulationData>;

export type GDPParameters = {
  [key: string]: (number | null)[];
  values: number[];
  "A.Pertanian, Kehutanan, dan Perikanan": number[];
  "B.Pertambangan dan Penggalian": number[];
  "C.Industri Pengolahan": number[];
  "D.Pengadaan Listrik dan Gas": number[];
  "E.Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang": number[];
  "F.Konstruksi": number[];
  "G.Perdagangan Besar dan Eceran; Reparasi Mobil dan Sepeda Motor": number[];
  "H.Transportasi dan Pergudangan": number[];
  "I.Penyediaan Akomodasi dan Makan Minum": number[];
  "J.Informasi dan Komunikasi": number[];
  "K.Jasa Keuangan dan Asuransi": number[];
  "L.Real Estate": number[];
  "M,N.Jasa Perusahaan": number[];
  "O.Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib": number[];
  "P.Jasa Pendidikan": number[];
};

export type IGDPResData = IBaseData<GDPParameters>;

export interface IAgricultureParameters {
  "Lahan Panen Padi": number[];
}

export type IAgricultureResData = IBaseData<IAgricultureParameters>;

export interface ILivestockParameters {
  "sapi": (number | null)[];
  "kambing": (number | null)[];
  "ayam": (number | null)[];
}

export type ILivestockResData = IBaseData<ILivestockParameters>;

export interface IFisheriesParameters {
  "area perikanan": (number | null)[];
}

export type IFisheriesResData = IBaseData<IFisheriesParameters>;

// Response types remain the same
export type IPopulationResponse = IBaseResponse<IPopResData>;
export type IGDPResponse = IBaseResponse<IGDPResData>;
export type IAgricultureResponse = IBaseResponse<IAgricultureResData>;
export type ILivestockResponse = IBaseResponse<ILivestockResData>;
export type IFisheriesResponse = IBaseResponse<IFisheriesResData>;

export interface ICombinedApiResponse {
  populationData: IPopulationResponse;
  gdpData: IGDPResponse;
  agricultureData: IAgricultureResponse;
  livestockData: ILivestockResponse;
  fisheryData: IFisheriesResponse;
}
