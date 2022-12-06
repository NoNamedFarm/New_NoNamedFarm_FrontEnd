import { useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Search } from "../../assets/images";
import { searchStateAtom, searchStateAtomType } from "../../atoms/searchState";
import { pxToRem } from "../../utils/pxToRem";

interface SearchInputProps {
  searchType: "farm" | "journal";
  placeholder: string;
}

const SearchInput = ({ searchType, placeholder }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setSearchState] =
    useRecoilState<searchStateAtomType>(searchStateAtom);

  return (
    <Background
      searchType={searchType}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSearchState({ searchQuery: inputRef.current?.value! });
      }}
    >
      <button type="submit">
        <img src={Search} alt="search" />
      </button>
      <input placeholder={placeholder} ref={inputRef} />
    </Background>
  );
};

export default SearchInput;

interface BackgroundProps {
  searchType: "farm" | "journal";
}

const Background = styled.form<BackgroundProps>`
  margin-right: ${pxToRem(6)}rem;

  width: ${(props) =>
    props.searchType === "farm" ? "calc(100% - 5.75%)" : "100%"};

  display: flex;
  justify-content: center;
  align-items: center;

  > input {
    margin-left: ${pxToRem(6)}rem;

    width: 100%;

    color: ${({ theme }) => theme.colors.grey1f};
    font-size: 2.375vh;

    border: none;

    ::placeholder {
      color: ${({ theme }) => theme.colors.grey1f};
    }
  }

  > button {
    all: unset;

    display: flex;
    align-items: center;

    ${({ theme }) => theme.common.hoverEffect}

    > img {
      width: 2.375vh;
      height: 2.375vh;
    }
  }
`;
