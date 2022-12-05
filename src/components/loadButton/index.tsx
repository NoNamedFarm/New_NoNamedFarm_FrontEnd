import styled from "styled-components";
import { pxToRem } from "../../utils/pxToRem";

interface LoadButtonProps {
  loadType: "farm" | "journal";
  loadMore: () => void;
}

const LoadButton = ({ loadType, loadMore }: LoadButtonProps) => {
  return (
    <Background loadType={loadType} onClick={loadMore}>
      <h1>더보기</h1>
    </Background>
  );
};

export default LoadButton;

interface BackgroundProps {
  loadType: "farm" | "journal";
}

const Background = styled.button<BackgroundProps>`
  background-color: transparent;

  padding: calc(0.5rem + 1vh);
  margin-bottom: ${pxToRem(25)}rem;

  width: ${(props) =>
    props.loadType === "farm" ? "calc(100% - 5.75%)" : "100%"};

  display: flex;
  justify-content: center;
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
`;
