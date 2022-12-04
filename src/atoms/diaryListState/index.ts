import { atom } from "recoil";

type diaryType = {
  id: number;
  date: string;
};

export type diaryListStateAtomType = {
  totalPage: number;
  currentPage?: number;
  diaryResponses: diaryType[];
};

export const diaryListStateAtom = atom<diaryListStateAtomType>({
  key: "diaryListState",
  default: {
    currentPage: 0,
    totalPage: 0,
    diaryResponses: [],
  },
});
