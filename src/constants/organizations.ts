export interface Organization {
  id: number;
  name: string;
  imgSrc: string;
}

export const ORGANIZATIONS: Organization[] = [
  {
    id: 1,
    name: "Kementerian PPN/Bappenas",
    imgSrc: "./assets/logo-bappenas.svg",
  },
  {
    id: 2,
    name: "Kementerian ESDM",
    imgSrc: "./assets/logo-esdm.svg",
  },
  {
    id: 3,
    name: "Pemerintah Kabupaten Karawang",
    imgSrc: "./assets/logo-karawang.svg",
  },
  {
    id: 4,
    name: "Pemerintah Kabupaten Samosir",
    imgSrc: "./assets/logo-samosir.svg",
  },
  {
    id: 5,
    name: "Pemerintah Kabupaten Tanggamus",
    imgSrc: "./assets/logo-tanggamus.svg",
  },
];
