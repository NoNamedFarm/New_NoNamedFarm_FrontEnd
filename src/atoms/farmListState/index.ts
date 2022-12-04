import { atom } from "recoil";

type farmType = {
  id: number;
  farmName: string;
  farmCrop: string;
  createdDate: string;
  temperature: number;
  airHumidity: number;
  soilHumidity: number;
};

export type farmListStateAtomType = {
  totalPage: number;
  currentPage?: number;
  farmResponses: farmType[];
};

export const farmListStateAtom = atom<farmListStateAtomType>({
  key: "farmListState",
  default: {
    currentPage: 0,
    totalPage: 0,
    farmResponses: [],
  },
});
