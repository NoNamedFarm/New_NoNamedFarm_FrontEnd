import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Calendar, Edit, GrayClose, Save } from "../../assets/images";
import { DiaryCreateRequestType } from "../../assets/types/diary/create/request";
import { pxToRem } from "../../utils/pxToRem";

interface JournalPageProps {
  openType?: string;
}

function JournalPage({ openType }: JournalPageProps) {
  const [editState, setEditState] = useState<boolean>(true);

  const params = useParams();
  const date = params.date;

  const [inputState, setInputState] = useState<DiaryCreateRequestType>({
    date: date!,
    content: "",
  });

  useEffect(() => {
    if (openType === "read") setEditState(false);
  }, []);

  return (
    <>
      <Title>
        {openType === "read" && (
          <span onClick={() => setEditState(!editState)}>
            <img src={Edit} alt="edit farm" />
            일지 수정
          </span>
        )}
        <span>
          <img src={GrayClose} alt="create farm" />
          일지 삭제
        </span>
      </Title>
      <Background>
        <Head>
          <span>
            <img src={Calendar} alt="calendar" />
            {editState ? <input type="date" /> : <h1>{date}</h1>}
          </span>
        </Head>
        <textarea
          placeholder="내용을 작성해주세요."
          autoComplete="DoNotAutoComplete"
          disabled={!editState}
          value={inputState.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            let temp: DiaryCreateRequestType = Object.assign({}, inputState);
            temp.content = e.currentTarget.value;
            setInputState(temp);
          }}
        />
        <Foot>
          {editState && (
            <span onClick={() => {}}>
              <img src={Save} alt="calendar" />
              <span>일지 저장</span>
            </span>
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
  justify-content: flex-end;
  align-items: center;

  border-top: 1px solid ${({ theme }) => theme.colors.grey1f};

  > span {
    display: flex;
    align-items: center;

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
