export interface IBaseResponse<T> {
  data: T;
}

export interface IBaseData<TParams = Record<string, unknown>> {
  tabel: string;
  unit: string;
  tahun: number[];
  parameters: TParams;
}

export interface IPopulationData {
  laki: number[];
  perempuan: number[];
}

export type IPopResData = IBaseData<IPopulationData>;

export type GDPParameters = {
  [key: string]: (number | null)[];
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
  "ternak sapi": (number | null)[];
  "ternak kambing": (number | null)[];
  "ternak ayam": (number | null)[];
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
