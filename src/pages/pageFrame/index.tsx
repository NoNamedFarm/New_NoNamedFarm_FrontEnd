import moment from "moment";
import { Link } from "react-router-dom";
import { useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Return } from "../../assets/images";
import Header from "../../components/header";
import { getRegisterDate } from "../../utils/getRegisterDate";
import { pxToRem } from "../../utils/pxToRem";

interface PageFrameProps {
  children: JSX.Element | JSX.Element[];
}

function PageFrame({ children }: PageFrameProps) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const contents = searchParams.get("contents");

  const date = "2022-10-18";
  const crop = "상추";

  const farmAmount = 0;
  const journalAmount = 0;

  const temp = new Date().setDate(new Date().getDate() - 10);
  const yesterday = new Date(moment(temp).format("MM/DD/YYYY"));

  return (
    <>
      <Header />
      <Wrapper>
        <Title>
          <h1>홍길동전</h1>
          {location.pathname.includes("/farm") ? (
            <div>
              <span>{date}</span>
              <span>
                작물 : <strong>{crop}</strong>
              </span>
            </div>
          ) : (
            <div>
              <div>
                <span>
                  보유 농장 <strong>{farmAmount}</strong>
                </span>
                <span>
                  농장 일지 <strong>{journalAmount}</strong>
                </span>
              </div>
              <span>
                가입한지 <strong>{getRegisterDate(yesterday)}</strong> 되었어요.
              </span>
            </div>
          )}
        </Title>
        <Menu
          contents={
            location.pathname.includes("/menu") && contents === "farm"
              ? 1
              : contents === "journal"
              ? 2
              : 0
          }
        >
          {!location.pathname.includes("/menu") && (
            <div>
              <Link to="/menu">
                <img src={Return} alt="create journal" />
                돌아가기
              </Link>
            </div>
          )}
          {location.pathname.includes("/menu") && (
            <>
              <button onClick={() => setSearchParams({ contents: "farm" })}>
                나의 농장
              </button>
              <button onClick={() => setSearchParams({ contents: "journal" })}>
                나의 일지
              </button>
            </>
          )}
        </Menu>
        {children}
      </Wrapper>
    </>
  );
}

export default PageFrame;

const Wrapper = styled.div`
  padding-top: ${pxToRem(80)}rem;
  margin-bottom: ${pxToRem(50)}rem;
  margin-left: 20%;
  margin-right: 20%;

  width: 60%;
  height: auto;
  min-height: calc(100vh - 6rem);
`;

const Title = styled.div`
  margin-top: ${pxToRem(50)}rem;
  margin-bottom: ${pxToRem(25)}rem;

  display: flex;
  align-items: center;

  > h1 {
    transform: translateY(-0.1rem);

    margin-right: ${pxToRem(8)}rem;

    display: inline-flex;

    font-size: ${({ theme }) => theme.fontSizes.subTitle};

    ${({ theme }) => theme.common.gb};
  }

  span {
    color: ${({ theme }) => theme.colors.grey1f};
    font-size: ${({ theme }) => theme.fontSizes.subText};

    :last-of-type {
      margin-right: 0;
    }
  }

  strong {
    color: ${({ theme }) => theme.colors.grey2f};
    font-size: ${({ theme }) => theme.fontSizes.subText};
  }

  > div {
    display: flex;
    flex-direction: column;

    > div {
      display: flex;
      justify-content: space-between;
    }
  }
`;

interface MenuProps {
  contents?: number;
}

const Menu = styled.div<MenuProps>`
  margin-bottom: ${pxToRem(25)}rem;

  height: ${pxToRem(48)}rem;

  display: flex;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey1f};

  > div {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    > a {
      display: flex;
      align-items: center;

      color: ${({ theme }) => theme.colors.grey1f};
      font-size: ${({ theme }) => theme.fontSizes.subText};
      text-decoration: none;

      ${({ theme }) => theme.common.hoverEffect}

      > img {
        transform: translateY(0.1rem);

        margin-right: ${pxToRem(8)}rem;

        width: ${({ theme }) => theme.fontSizes.subText};
      }
    }
  }

  button {
    background-color: transparent;

    width: ${pxToRem(136)}rem;
    height: ${pxToRem(48)}rem;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: ${({ theme }) => theme.fontSizes.subText};
    text-decoration: none;

    border: none;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    transition: transform 0.25s ease, height 0.25s ease,
      background-color 0.25s ease;
    cursor: pointer;

    :hover {
      transform: translateY(-0.5rem);
      height: ${pxToRem(56)}rem;

      background-color: #eee;
    }

    :nth-child(${(props) => props.contents}) {
      color: ${({ theme }) => theme.colors.green};

      border: 1px solid ${({ theme }) => theme.colors.grey1f};
      border-bottom: 1px solid ${({ theme }) => theme.colors.white};
    }
  }
`;
