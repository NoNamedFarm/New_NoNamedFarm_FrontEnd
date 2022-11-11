import styled from "styled-components";
import { pxToRem } from "../../utils/pxToRem";

interface ButtonProps {
  type: "normal" | "small";
  label: string;
}

const Button = ({ type, label }: ButtonProps) => {
  return (
    <General>
      {type === "normal" && <NormalButton type="submit">{label}</NormalButton>}
      {type === "small" && <SmallButton type="submit">{label}</SmallButton>}
    </General>
  );
};

export default Button;

const General = styled.div`
  > button {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const NormalButton = styled.button`
  @media screen and (min-width: 800px) {
    max-width: calc(50vw - ${pxToRem(50)}rem);
  }

  background-color: ${({ theme }) => theme.colors.greenGradient};

  padding: ${pxToRem(25)}rem;

  width: ${pxToRem(512)}rem;
  max-width: calc(100vw - ${pxToRem(50)}rem);
  min-width: 10rem;
  height: ${pxToRem(64)}rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSizes.subText};

  border-radius: 1.5rem;
  border: none;

  ${({ theme }) => theme.common.hoverEffect}
`;

const SmallButton = styled.button`
  background-color: ${({ theme }) => theme.colors.greenGradient};

  padding: ${pxToRem(8)}rem;
  padding-left: ${pxToRem(16)}rem;
  padding-right: ${pxToRem(16)}rem;

  width: ${pxToRem(139)}rem;
  height: ${pxToRem(64)}rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSizes.description};

  border-radius: 1.5rem;
  border: none;

  ${({ theme }) => theme.common.hoverEffect}
`;
