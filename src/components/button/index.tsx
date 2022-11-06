import styled from "styled-components";
import { pxToRem } from "../../utils/pxToRem";

interface ButtonProps {
  type: "normal" | "small";
  label: string;
}

const Button = ({ type, label }: ButtonProps) => {
  return (
    <>
      {type === "normal" && <NormalButton type="submit">{label}</NormalButton>}
      {type === "small" && <SmallButton type="submit">{label}</SmallButton>}
    </>
  );
};

export default Button;

const NormalButton = styled.button`
  background-color: ${({ theme }) => theme.colors.green};

  padding: ${pxToRem(25)}rem;

  width: ${pxToRem(512)}rem;
  max-width: calc(50vw - ${pxToRem(50)}rem);
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
  background-color: ${({ theme }) => theme.colors.green};

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
