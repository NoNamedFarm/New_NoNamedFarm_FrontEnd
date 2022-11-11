import styled from "styled-components";
import { pxToRem } from "../../utils/pxToRem";

interface SwitchProps {
  label: string;
  id: string;
}

const Switch = ({ label, id }: SwitchProps) => {
  return (
    <Background>
      <span>{label}</span>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>
        <button />
      </label>
    </Background>
  );
};

export default Switch;

const Background = styled.div`
  margin-right: ${pxToRem(25)}rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  > span {
    color: ${({ theme }) => theme.colors.grey1f};
    font-size: ${({ theme }) => theme.fontSizes.subText};
  }

  input:checked + label button {
    transform: translateX(1.5rem) translateY(-0.1vh);
  }

  input:checked + label {
    background-color: ${({ theme }) => theme.colors.green};
  }

  label {
    filter: opacity(75%);
  }

  label {
    background-color: ${({ theme }) => theme.colors.black};

    margin-left: 0.5rem;

    width: 3rem;
    height: 1.5rem;

    border: 1px solid ${({ theme }) => theme.colors.grey1f};
    border-radius: 1.5rem;

    transition: background-color 0.25s ease;
    cursor: pointer;
  }

  button {
    background-color: ${({ theme }) => theme.colors.white};

    position: absolute;

    transform: translateX(-0.1rem) translateY(-0.1vh);

    width: 1.5rem;
    height: 1.5rem;

    border: 1px solid ${({ theme }) => theme.colors.grey1f};
    border-radius: 50%;

    transition: transform 0.25s ease;
    pointer-events: none;
  }

  input {
    position: absolute;

    display: none;
  }
`;
