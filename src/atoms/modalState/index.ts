import { atom } from "recoil";

export type modalStateAtomType = {
  title: string;
  modalContents: JSX.Element | JSX.Element[] | null;
};

export const modalStateAtom = atom<modalStateAtomType>({
  key: "modalState",
  default: {
    title: "",
    modalContents: null,
  },
});
