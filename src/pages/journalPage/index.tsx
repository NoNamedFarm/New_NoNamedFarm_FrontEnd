import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { diaryCreate } from "../../apis/diary/create";
import { diaryLoad } from "../../apis/diary/load";
import { diaryUpdate } from "../../apis/diary/update";
import { Calendar, Edit, GrayClose, Save } from "../../assets/images";
import { DiaryCreateRequestType } from "../../assets/types/diary/create/request";
import { DiaryLoadResponseType } from "../../assets/types/diary/load/response";
import { diaryStateAtom, diaryStateAtomType } from "../../atoms/diaryState";
import { modalStateAtom, modalStateAtomType } from "../../atoms/modalState";
import JournalDeleteModal from "../../components/modal/journalDelete";
import { pxToRem } from "../../utils/pxToRem";

function JournalPage() {
  const [, setModalState] = useRecoilState<modalStateAtomType>(modalStateAtom);
  const [diaryState, setDiaryState] =
    useRecoilState<diaryStateAtomType>(diaryStateAtom);

  const dateInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const [editState, setEditState] = useState<boolean>(true);
  const [inputState, setInputState] = useState<DiaryCreateRequestType>({
    id: 0,
    date: "",
    content: "",
  });

  const location = useLocation();
  const params = location.pathname.includes("read")
    ? location.pathname.replace("/journal/read/", "")
    : location.pathname.replace("/journal/", "");
  const navigate = useNavigate();

  const validateForm = () => {
    if (inputState.content.length < 2) {
      alert("내용을 최소 2글자 이상 작성해주세요.");
      return false;
    }
    if (inputState.content.length > 1000) {
      alert("알 수 없는 오류가 발생하였습니다.");
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (validateForm()) {
      if (params === "write") {
        const response = await diaryCreate(inputState);
        if (response === true) {
          navigate("/menu?contents=journal");
        } else {
          if (response === 400) {
            alert("선택된 일자가 오늘의 일자보다 앞섭니다.");
          }
        }
      }
      if (params !== "write") {
        const response = await diaryUpdate(inputState);
        if (response === true) {
          setEditState(false);
        } else {
          if (response === 400) {
            alert("선택된 일자가 오늘의 일자보다 앞섭니다.");
          }
          if (response === 403) {
            alert("권한이 없습니다.");
          }
        }
      }
    }
  };

  const fetchData = async () => {
    setDiaryState({
      id: 0,
      date: "",
      content: "",
    });

    const data: DiaryLoadResponseType = (await diaryLoad({
      diaryId: parseInt(params),
    })) as DiaryLoadResponseType;

    setDiaryState(data);
    setInputState(data);

    return data;
  };

  useEffect(() => {
    if (params !== "write") {
      setEditState(false);

      fetchData();
    }

    if (params === "write")
      if (dateInputRef.current) {
        dateInputRef.current.valueAsDate = new Date();

        let temp: DiaryCreateRequestType = Object.assign({}, inputState);
        temp.date = dateInputRef.current.value;
        setInputState(temp);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <Title>
        {params !== "write" && (
          <>
            <span onClick={() => setEditState(!editState)}>
              <img src={Edit} alt="edit farm" />
              일지 수정
            </span>
            <span
              onClick={() =>
                setModalState({
                  title: "",
                  modalContents: (
                    <JournalDeleteModal journalId={diaryState.id} />
                  ),
                })
              }
            >
              <img src={GrayClose} alt="create farm" />
              일지 삭제
            </span>
          </>
        )}
      </Title>
      <Background>
        <Head>
          <span>
            <img src={Calendar} alt="calendar" />
            {editState ? (
              <input
                type="date"
                ref={dateInputRef}
                defaultValue={diaryState.date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let temp: DiaryCreateRequestType = Object.assign(
                    {},
                    inputState
                  );
                  temp.date = e.currentTarget.value;
                  setInputState(temp);
                }}
              />
            ) : (
              <h1>{diaryState.date}</h1>
            )}
          </span>
        </Head>
        <textarea
          key={diaryState.id}
          placeholder={editState === true ? "내용을 작성해주세요." : ""}
          autoComplete="DoNotAutoComplete"
          maxLength={1000}
          defaultValue={inputState.content}
          disabled={!editState}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            let temp: DiaryCreateRequestType = Object.assign({}, inputState);
            temp.content = e.currentTarget.value;
            setInputState(temp);
          }}
          ref={textInputRef}
        />
        <Foot>
          {editState && (
            <>
              <span>{textInputRef.current?.value.length} / 1000</span>
              <button onClick={() => onSubmit()}>
                <img src={Save} alt="calendar" />
                <span>일지 {params === "write" ? "생성" : "저장"}</span>
              </button>
            </>
          )}
        </Foot>
      </Background>
    </>
  );
}

export default JournalPage;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.common.boxShadow}

  textarea {
    all: unset;

    padding: ${pxToRem(25)}rem;

    width: calc(100% - ${pxToRem(50)}rem);
    height: ${pxToRem(400)}rem;

    font-size: ${({ theme }) => theme.fontSizes.subText};

    white-space: pre-wrap;
    overflow-wrap: break-word;

    ::placeholder {
      color: ${({ theme }) => theme.colors.grey1f};
    }
  }
`;

const Title = styled.div`
  margin-bottom: ${pxToRem(25)}rem;

  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  span {
    margin-left: ${pxToRem(36)}rem;

    color: ${({ theme }) => theme.colors.grey1f};
    font-size: ${({ theme }) => theme.fontSizes.subText};

    ${({ theme }) => theme.common.hoverEffect};

    > img {
      margin-right: ${pxToRem(8)}rem;
    }
  }
`;

const Head = styled.div`
  padding-left: ${pxToRem(25)}rem;
  padding-right: ${pxToRem(25)}rem;

  width: 100%;
  height: ${pxToRem(80)}rem;

  display: flex;
  align-items: center;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey1f};

  > span {
    display: flex;
    align-items: center;

    > input {
      padding: ${pxToRem(16)}rem;

      width: ${pxToRem(238)}rem;
      height: ${pxToRem(50)}rem;

      color: ${({ theme }) => theme.colors.grey1f};
      font-size: ${({ theme }) => theme.fontSizes.description};

      border: 1px solid ${({ theme }) => theme.colors.grey1f};
      border-radius: 0.5rem;
    }

    > h1 {
      color: ${({ theme }) => theme.colors.grey1f};
      font-size: ${({ theme }) => theme.fontSizes.text};
    }

    > img {
      margin-right: ${pxToRem(16)}rem;

      transform: translateY(-0.1rem);

      width: ${({ theme }) => theme.fontSizes.text};
      height: ${({ theme }) => theme.fontSizes.text};
    }
  }
`;

const Foot = styled.div`
  padding-left: ${pxToRem(25)}rem;
  padding-right: ${pxToRem(25)}rem;

  width: 100%;
  height: ${pxToRem(80)}rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid ${({ theme }) => theme.colors.grey1f};

  > span {
    color: ${({ theme }) => theme.colors.grey1f};
    font-size: ${({ theme }) => theme.fontSizes.subText};
  }

  > button {
    background-color: transparent;

    display: flex;
    align-items: center;

    border: none;

    ${({ theme }) => theme.common.hoverEffect};

    > img {
      margin-right: ${pxToRem(8)}rem;

      width: ${({ theme }) => theme.fontSizes.subText};
      height: ${({ theme }) => theme.fontSizes.subText};
    }

    > span {
      color: ${({ theme }) => theme.colors.green};
      font-size: ${({ theme }) => theme.fontSizes.subText};
    }
  }
`;
