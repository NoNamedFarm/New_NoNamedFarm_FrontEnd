import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Close } from "../../assets/images";
import { modalStateAtom, modalStateAtomType } from "../../atoms/modalState";
import { pxToRem } from "../../utils/pxToRem";
import FarmDeleteModal from "../modal/farmDelete";

interface FarmCardProps {
  farmId: number;
  farmName: string;
  farmCrop: string;
  createdDate: string;
  temperature: number;
  airHumidity: number;
  soilHumidity: number;
}

const FarmCard = ({
  farmId,
  farmName,
  farmCrop,
  createdDate,
  temperature,
  airHumidity,
  soilHumidity,
}: FarmCardProps) => {
  const [, setModalState] = useRecoilState<modalStateAtomType>(modalStateAtom);

  return (
    <Background to={`/farm/${farmId}`}>
      <Wrapper>
        <h1>{farmName}</h1>
        <div>
          <span>{farmCrop}</span>
          <span>{createdDate}</span>
        </div>
        <img
          src={Close}
          alt="close"
          onClick={(e: React.MouseEvent<HTMLImageElement>) => {
            e.preventDefault();

            setModalState({
              title: "",
              modalContents: <FarmDeleteModal farmId={farmId} />,
            });
          }}
        />
      </Wrapper>
      <Wrapper>
        <ul>
          <li>토양 습도 : {Math.round((soilHumidity / 4095) * 100)}%</li>
          <li>온도 : {temperature}°C</li>
          <li>공기 습도 : {Math.round(airHumidity)}%</li>
        </ul>
      </Wrapper>
    </Background>
  );
};

export default FarmCard;

const Background = styled(Link)`
  @media screen and (max-width: 1260px) {
    margin-right: 2.5%;
    width: 45.8%;
  }
  @media screen and (max-width: 640px) {
    width: 100%;
  }

  padding: calc(0.5rem + 1vh);
  margin-bottom: ${pxToRem(25)}rem;
  margin-right: 2.5%;

  width: 29.8%;

  display: inline-flex;
  flex-direction: column;

  text-decoration: none;

  ${({ theme }) => theme.common.boxShadow}

  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;

  :hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 0 0.5rem ${({ theme }) => theme.colors.grey1f};
  }
`;

const Wrapper = styled.div`
  width: 100%;

  display: flex;

  :first-of-type {
    padding-bottom: 0.625vh;
    margin-bottom: 1.25vh;

    border-bottom: 0.1px solid ${({ theme }) => theme.colors.grey1f};
  }

  > h1 {
    margin-right: ${pxToRem(16)}rem;

    font-size: 4.65vh;
    ${({ theme }) => theme.common.gb};
    word-break: keep-all;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  > img {
    margin-left: auto;

    width: 1.25vh;
    height: 1.25vh;

    filter: grayscale(1);

    ${({ theme }) => theme.common.hoverEffectRed}
  }

  ul {
    display: flex;
    flex-flow: row wrap;

    > li {
      width: 50%;

      display: flex;

      list-style-position: inside;
    }
  }

  span,
  li {
    font-size: 2vh;
  }
`;
