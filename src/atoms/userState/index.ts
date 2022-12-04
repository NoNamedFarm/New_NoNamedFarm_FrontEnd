import { atom } from "recoil";

export type userStateAtomType = {
  nickname: string;
  createDate: number;
  totalFarm: number;
  totalDiary: number;
};

export const userStateAtom = atom<userStateAtomType>({
  key: "userState",
  default: {
    nickname: "",
    createDate: 0,
    totalFarm: 0,
    totalDiary: 0,
  },
});
