import styled from "styled-components";
import { pxToRem } from "../../utils/functions/pxToRem";

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
  background-color: ${({ theme }) => theme.color.bg3f};

  padding: ${pxToRem(25)}rem;

  width: ${pxToRem(512)}rem;
  max-width: calc(50vw - ${pxToRem(50)}rem);
  height: ${pxToRem(64)}rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSize.subText};

  border-radius: 1.5rem;
  border: none;

  transition: filter 0.25s ease;
  ${({ theme }) => theme.common.hoverEffect}
`;

const SmallButton = styled.button`
  background-color: ${({ theme }) => theme.color.bg3f};

  padding: ${pxToRem(16)}rem;

  height: ${pxToRem(40)}rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSize.description};

  border-radius: 1.5rem;
  border: none;

  transition: filter 0.25s ease;
  ${({ theme }) => theme.common.hoverEffect}
`;
