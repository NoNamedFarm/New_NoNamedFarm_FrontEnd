import { atom } from "recoil";

export type diaryStateAtomType = {
  id: number;
  date: string;
  content: string;
};

export const diaryStateAtom = atom<diaryStateAtomType>({
  key: "diaryState",
  default: {
    id: 0,
    date: "",
    content: "",
  },
});
