import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Close } from "../../assets/images";
import { modalStateAtom, modalStateAtomType } from "../../atoms/modalState";
import { pxToRem } from "../../utils/pxToRem";
import JournalDeleteModal from "../modal/journalDelete";

interface JournalCardProps {
  journalId: number;
  date: string;
}

const JournalCard = ({ journalId, date }: JournalCardProps) => {
  const [, setModalState] = useRecoilState<modalStateAtomType>(modalStateAtom);

  return (
    <Background to={`/journal/read/${journalId}`}>
      <h1>{date}</h1>
      <img
        src={Close}
        alt="close"
        onClick={(e: React.MouseEvent<HTMLImageElement>) => {
          e.preventDefault();

          setModalState({
            title: "",
            modalContents: <JournalDeleteModal journalId={journalId} />,
          });
        }}
      />
    </Background>
  );
};

export default JournalCard;

const Background = styled(Link)`
  padding: calc(0.5rem + 1vh);
  margin-bottom: ${pxToRem(25)}rem;

  width: 100%;
  height: ${pxToRem(60)}rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  text-decoration: none;

  ${({ theme }) => theme.common.boxShadow}

  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;

  :hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 0 0.5rem ${({ theme }) => theme.colors.grey1f};
  }

  > h1 {
    font-size: 2.375vh;
  }

  > img {
    margin-left: auto;

    width: 1.25vh;
    height: 1.25vh;

    filter: grayscale(1);

    ${({ theme }) => theme.common.hoverEffectRed}
  }
`;
