import { atom } from "recoil";

export type farmStateAtomType = {
  id: number;
  farmName: string;
  farmCrop: string;
  createdDate: string;
  temperature: number;
  airHumidity: number;
  soilHumidity: number;
  isWater: number;
  isLight: number;
  lastCycleDate: number;
  waterCycleResponses: string[];
  lightCycleResponses: string[];
  year: number;
  month: number;
};

export const farmStateAtom = atom<farmStateAtomType>({
  key: "farmState",
  default: {
    id: 0,
    farmName: "",
    farmCrop: "",
    createdDate: "",
    temperature: 0,
    airHumidity: 0,
    soilHumidity: 0,
    isWater: 0,
    isLight: 0,
    lastCycleDate: 0,
    waterCycleResponses: [],
    lightCycleResponses: [],
    year: 0,
    month: 0,
  },
});
