import styled from "styled-components";
import { pxToRem } from "../../../utils/pxToRem";

interface ModalButtonProps {
  type?: "submit";
  label: string;
  onClick?: () => void;
}

const ModalButton = ({ type, label, onClick }: ModalButtonProps) => {
  return (
    <>
      <Button
        type={type ? type : "button"}
        onClick={() => onClick && onClick()}
      >
        {label}
      </Button>
    </>
  );
};

export default ModalButton;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.green};

  width: ${pxToRem(264)}rem;
  height: ${pxToRem(67)}rem;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.text};

  border: none;
  border-radius: 1.5rem;

  ${({ theme }) => theme.common.hoverEffect}
`;
