import styled from "styled-components";
import { pxToRem } from "../../../utils/pxToRem";

interface ModalInputProps {
  id: string;
  label: string;
  placeholder?: string;
  warning?: string;
  value?: string;
  setValue?: (v: string) => void;
}

const ModalInput = ({
  id,
  label,
  placeholder,
  warning,
  value,
  setValue,
}: ModalInputProps) => {
  return (
    <Wrapper>
      <div>
        <label htmlFor={id}>{label}</label>
        <span>{warning}</span>
      </div>
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue!(e.currentTarget.value)
        }
      />
    </Wrapper>
  );
};

export default ModalInput;

const Wrapper = styled.div`
  > div {
    margin-bottom: ${pxToRem(10)}rem;

    > label {
      font-size: ${({ theme }) => theme.fontSizes.description};
    }
    > span {
      margin-left: ${pxToRem(10)}rem;

      color: ${({ theme }) => theme.colors.error};
    }
  }

  > input {
    padding-left: ${pxToRem(25)}rem;
    padding-right: ${pxToRem(25)}rem;

    width: ${pxToRem(548)}rem;
    height: ${pxToRem(67)}rem;

    font-size: ${({ theme }) => theme.fontSizes.description};

    border: none;
    border-radius: 1.5rem;
    box-shadow: 0 0 0.5rem ${({ theme }) => theme.colors.translucent};

    ::placeholder {
      color: ${({ theme }) => theme.colors.grey1f};
    }
  }
`;
