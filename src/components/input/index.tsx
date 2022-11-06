import styled from "styled-components";
import { pxToRem } from "../../utils/pxToRem";

interface InputFieldProps {
  type: "normal" | "password" | "duplicateCheck" | "checkbox";
  label: string;
  id: string;
}

const InputField = ({ type, label, id }: InputFieldProps) => {
  return (
    <>
      {type === "checkbox" && (
        <CheckboxWrapper>
          <input id={id} type="checkbox" />
          <label htmlFor={id}>{label}</label>
        </CheckboxWrapper>
      )}
      <General>
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
      </General>
    </>
  );
};

export default InputField;

const General = styled.div`
  label,
  input,
  button {
    font-size: ${({ theme }) => theme.fontSizes.description};
  }
  input,
  button {
    padding-left: ${pxToRem(8)}rem;
    padding-right: ${pxToRem(8)}rem;

    border-radius: 1.5rem;
    box-shadow: 0 0 0.5rem ${({ theme }) => theme.colors.grey2f};
    border: none;
  }
`;

const CheckboxWrapper = styled.div`
  margin-bottom: ${pxToRem(8)}rem;

  width: 100%;

  display: flex;
  align-items: center;

  input {
    transform: translateY(0.1rem);

    margin-right: ${pxToRem(8)}rem;

    width: ${({ theme }) => theme.fontSizes.description};
    height: ${({ theme }) => theme.fontSizes.description};
  }
`;

const OverlayWrapper = styled.div`
  margin-bottom: ${pxToRem(25)}rem;

  display: flex;
  flex-direction: column;

  label {
    margin-bottom: ${pxToRem(8)}rem;
  }

  > div {
    width: ${pxToRem(512)}rem;
    max-width: calc(50vw - ${pxToRem(50)}rem);

    display: flex;
    justify-content: space-between;
  }

  input {
    width: ${pxToRem(429)}rem;
    height: ${pxToRem(64)}rem;
  }

  button {
    margin-left: ${pxToRem(8)}rem;

    width: ${pxToRem(139)}rem;
    max-width: calc(50vw - ${pxToRem(50)}rem);
    height: ${pxToRem(64)}rem;

    ${({ theme }) => theme.common.hoverEffect}
  }
`;

const InputWrapper = styled.div`
  margin-bottom: ${pxToRem(25)}rem;

  display: flex;
  flex-direction: column;

  label {
    margin-bottom: ${pxToRem(8)}rem;
  }

  input {
    width: ${pxToRem(512)}rem;
    max-width: calc(50vw - ${pxToRem(50)}rem);
    height: ${pxToRem(64)}rem;
  }
`;
