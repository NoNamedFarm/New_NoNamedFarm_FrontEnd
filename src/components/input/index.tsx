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
    ${({ theme }) => theme.common.boxShadow}
  }
  input {
    padding-left: ${pxToRem(16)}rem;
    padding-right: ${pxToRem(16)}rem;
  }
`;

const CheckboxWrapper = styled.div`
  margin-bottom: ${pxToRem(8)}rem;

  width: 100%;

  display: flex;
  align-items: center;

  input {
    margin-right: ${pxToRem(8)}rem;

    width: ${({ theme }) => theme.fontSizes.description};
    height: ${({ theme }) => theme.fontSizes.description};
  }
`;

const OverlayWrapper = styled.div`
  margin-bottom: ${pxToRem(25)}rem;

  min-width: 10rem;

  display: flex;
  flex-direction: column;

  label {
    margin-bottom: ${pxToRem(8)}rem;
  }

  > div {
    @media screen and (min-width: 800px) {
      max-width: calc(50vw - ${pxToRem(50)}rem);
    }

    width: ${pxToRem(512)}rem;
    max-width: calc(100vw - ${pxToRem(50)}rem);

    display: flex;
    justify-content: space-between;
  }

  input {
    width: 77.5%;
    min-width: 7rem;
    height: ${pxToRem(64)}rem;
  }

  button {
    background-color: ${({ theme }) => theme.colors.greenGradient};

    margin-left: 2.5%;

    width: 20%;
    max-width: calc(50vw - ${pxToRem(50)}rem);
    min-width: 3rem;
    height: ${pxToRem(64)}rem;

    color: ${({ theme }) => theme.colors.white};
    word-break: keep-all;

    ${({ theme }) => theme.common.hoverEffect};
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
    @media screen and (min-width: 800px) {
      max-width: calc(50vw - ${pxToRem(50)}rem);
    }

    width: ${pxToRem(512)}rem;
    max-width: calc(100vw - ${pxToRem(50)}rem);
    min-width: 10rem;
    height: ${pxToRem(64)}rem;
  }
`;
