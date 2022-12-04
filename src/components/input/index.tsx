import styled from "styled-components";
import { pxToRem } from "../../utils/pxToRem";

interface InputFieldProps {
  id: string;
  type: "normal" | "password" | "duplicateCheck" | "checkbox";
  label: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  warning?: string;
  value?: string;
  setValue?: (v: string) => void;
  duplicateCheckState?: boolean;
  duplicateCheck?: () => void;
  refObj?: React.RefObject<HTMLButtonElement>;
}

const InputField = ({
  id,
  type,
  label,
  placeholder,
  minLength,
  maxLength,
  warning,
  value,
  setValue,
  duplicateCheckState,
  duplicateCheck,
  refObj,
}: InputFieldProps) => {
  return (
    <>
      {type === "checkbox" && (
        <CheckboxWrapper>
          <input
            id={id}
            type="checkbox"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              (refObj!.current!.disabled = !e.currentTarget.checked)
            }
          />
          <label htmlFor={id}>{label}</label>
        </CheckboxWrapper>
      )}
      <General>
        {type === "duplicateCheck" && (
          <OverlayWrapper>
            <div>
              <label htmlFor={id}>{label}</label>
              <span>{warning}</span>
            </div>
            <div>
              <input
                id={id}
                type="text"
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                autoComplete="DoNotAutoComplete"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue!(e.currentTarget.value)
                }
              />
              <button
                type="button"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  duplicateCheck!();
                }}
                disabled={duplicateCheckState}
              >
                중복 확인
              </button>
            </div>
          </OverlayWrapper>
        )}
        {type === "normal" && (
          <InputWrapper>
            <div>
              <label htmlFor={id}>{label}</label>
              <span>{warning}</span>
            </div>
            <input
              id={id}
              type="text"
              placeholder={placeholder}
              minLength={minLength}
              maxLength={maxLength}
              autoComplete="DoNotAutoComplete"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue!(e.currentTarget.value)
              }
            />
          </InputWrapper>
        )}
        {type === "password" && (
          <InputWrapper>
            <div>
              <label htmlFor={id}>{label}</label>
              <span>{warning}</span>
            </div>
            <input
              id={id}
              type="password"
              placeholder="8 ~ 24 글자, 영어 대문자와 소문자, 숫자, 특수문자 조합"
              minLength={minLength}
              maxLength={maxLength}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue!(e.currentTarget.value)
              }
            />
          </InputWrapper>
        )}
      </General>
    </>
  );
};

export default InputField;

const General = styled.div`
  label,
  span,
  input,
  button {
    font-size: ${({ theme }) => theme.fontSizes.description};
  }
  span {
    margin: 0 !important;
    margin-left: ${pxToRem(10)}rem !important;

    color: ${({ theme }) => theme.colors.error};
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
  height: 93px;

  display: flex;
  flex-direction: column;

  > div {
    @media screen and (min-width: 800px) {
      max-width: calc(50vw - ${pxToRem(50)}rem);
    }

    margin-bottom: ${pxToRem(8)}rem;

    width: ${pxToRem(512)}rem;
    max-width: calc(100vw - ${pxToRem(50)}rem);

    display: flex;
  }

  input {
    width: 77.5%;
    min-width: 7rem;
    height: ${pxToRem(64)}rem;

    ::placeholder {
      color: ${({ theme }) => theme.colors.grey1f};
    }
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

    :enabled {
      ${({ theme }) => theme.common.hoverEffect}
    }

    :disabled {
      filter: brightness(85%);
    }
  }
`;

const InputWrapper = styled.div`
  margin-bottom: ${pxToRem(25)}rem;

  display: flex;
  flex-direction: column;

  div {
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

    ::placeholder {
      color: ${({ theme }) => theme.colors.grey1f};
    }
  }
`;
