import { atom } from "recoil";

export type searchStateAtomType = {
  searchQuery: string;
};

export const searchStateAtom = atom<searchStateAtomType>({
  key: "searchState",
  default: {
    searchQuery: "",
  },
});
