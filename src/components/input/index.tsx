import styled from "styled-components";
import { pxToRem } from "../../utils/functions/pxToRem";

interface InputFieldProps {
  type: "normal" | "password" | "duplicateCheck" | "checkbox";
  label: string;
  id: string;
}

const InputField = ({ type, label, id }: InputFieldProps) => {
  return (
    <>
      {type === "duplicateCheck" && (
        <OverlayWrapper>
          <label htmlFor={id}>{label}</label>
          <div>
            <input id={id} type="text" autoComplete="DoNotAutoComplete" />
            <button>중복 확인</button>
          </div>
        </OverlayWrapper>
      )}
      {type === "normal" && (
        <InputWrapper>
          <label htmlFor={id}>{label}</label>
          <input id={id} type="text" autoComplete="DoNotAutoComplete" />
        </InputWrapper>
      )}
      {type === "password" && (
        <InputWrapper>
          <label htmlFor={id}>{label}</label>
          <input id={id} type="password" />
        </InputWrapper>
      )}
      {type === "checkbox" && (
        <CheckboxWrapper>
          <input id={id} type="checkbox" />
          <label htmlFor={id}>{label}</label>
        </CheckboxWrapper>
      )}
    </>
  );
};

export default InputField;

const CheckboxWrapper = styled.div`
  margin-bottom: ${pxToRem(8)}rem;

  width: 100%;

  display: flex;
  align-items: center;

  input {
    transform: translateY(0.1rem);

    margin-right: ${pxToRem(8)}rem;

    width: ${({ theme }) => theme.fontSize.description};
    height: ${({ theme }) => theme.fontSize.description};
  }

  label {
    font-size: ${({ theme }) => theme.fontSize.description};
  }
`;

const OverlayWrapper = styled.div`
  margin-bottom: ${pxToRem(25)}rem;

  display: flex;
  flex-direction: column;

  label {
    margin-bottom: ${pxToRem(8)}rem;

    font-size: ${({ theme }) => theme.fontSize.description};
  }

  > div {
    width: ${pxToRem(512)}rem;
    max-width: calc(50vw - ${pxToRem(50)}rem);

    display: flex;
    justify-content: space-between;
  }

  input {
    background-color: ${({ theme }) => theme.color.bg3f};

    padding: ${pxToRem(25)}rem;

    width: ${pxToRem(429)}rem;
    height: ${pxToRem(64)}rem;

    font-size: ${({ theme }) => theme.fontSize.description};

    border-radius: 1.5rem;
    border: none;
  }

  button {
    background-color: ${({ theme }) => theme.color.bg3f};

    padding-left: ${pxToRem(8)}rem;
    padding-right: ${pxToRem(8)}rem;
    margin-left: ${pxToRem(8)}rem;

    width: ${pxToRem(139)}rem;
    max-width: calc(50vw - ${pxToRem(50)}rem);
    height: ${pxToRem(64)}rem;

    font-size: ${({ theme }) => theme.fontSize.description};

    border-radius: 1.5rem;
    border: none;
    transition: filter 0.25s ease;

    ${({ theme }) => theme.common.hoverEffect}
  }
`;

const InputWrapper = styled.div`
  margin-bottom: ${pxToRem(25)}rem;

  display: flex;
  flex-direction: column;

  label {
    margin-bottom: ${pxToRem(8)}rem;

    font-size: ${({ theme }) => theme.fontSize.description};
  }

  input {
    background-color: ${({ theme }) => theme.color.bg3f};

    padding: ${pxToRem(25)}rem;

    width: ${pxToRem(512)}rem;
    max-width: calc(50vw - ${pxToRem(50)}rem);
    height: ${pxToRem(64)}rem;

    font-size: ${({ theme }) => theme.fontSize.description};

    border-radius: 1.5rem;
    border: none;
  }
`;
