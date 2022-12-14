import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userLoad } from "../../apis/user/load";
import { Return } from "../../assets/images";
import {
  diaryListStateAtom,
  diaryListStateAtomType,
} from "../../atoms/diaryListState";
import {
  farmListStateAtom,
  farmListStateAtomType,
} from "../../atoms/farmListState";
import { farmStateAtom, farmStateAtomType } from "../../atoms/farmState";
import { userStateAtom, userStateAtomType } from "../../atoms/userState";
import Header from "../../components/header";
import { getCookie } from "../../utils/cookie";
import { pxToRem } from "../../utils/pxToRem";

interface PageFrameProps {
  children: JSX.Element | JSX.Element[];
}

function PageFrame({ children }: PageFrameProps) {
  const [userState, setUserState] =
    useRecoilState<userStateAtomType>(userStateAtom);
  const [farmState] = useRecoilState<farmStateAtomType>(farmStateAtom);
  const [farmListState] =
    useRecoilState<farmListStateAtomType>(farmListStateAtom);
  const [diaryListState] =
    useRecoilState<diaryListStateAtomType>(diaryListStateAtom);

  const [searchParams, setSearchParams] = useSearchParams();
  const contents = searchParams.get("contents");

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => setUserState(await userLoad());
    fetchData();

    if (!getCookie("accessToken")) {
      navigate("/");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, farmListState, diaryListState]);

  return (
    <>
      <Header />
      <Wrapper>
        <Title>
          <h1>
            {location.pathname.includes("/farm")
              ? farmState.farmName
              : userState.nickname}
          </h1>
          {location.pathname.includes("/farm") ? (
            <div>
              <span>{farmState.createdDate}</span>
              <span>
                ?????? : <strong>{farmState.farmCrop}</strong>
              </span>
            </div>
          ) : (
            <div>
              <div>
                <span>
                  ?????? ?????? <strong>{userState.totalFarm}</strong>
                </span>
                <span>
                  ?????? ?????? <strong>{userState.totalDiary}</strong>
                </span>
              </div>
              <span>
                ???????????? <strong>{userState.createDate}</strong> ??? ????????????.
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
          {!location.pathname.includes("/menu") &&
          location.pathname.includes("/farm") ? (
            <div>
              <Link to="/menu?contents=farm">
                <img src={Return} alt="create journal" />
                ????????????
              </Link>
            </div>
          ) : (
            location.pathname.includes("/journal") && (
              <div>
                <Link to="/menu?contents=journal">
                  <img src={Return} alt="create journal" />
                  ????????????
                </Link>
              </div>
            )
          )}
          {location.pathname.includes("/menu") && (
            <>
              <button onClick={() => setSearchParams({ contents: "farm" })}>
                ?????? ??????
              </button>
              <button onClick={() => setSearchParams({ contents: "journal" })}>
                ?????? ??????
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
  height: 200%;
  min-height: 100vh;
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
    margin-right: ${pxToRem(6)}rem;
    color: ${({ theme }) => theme.colors.grey1f};
    font-size: ${({ theme }) => theme.fontSizes.subText};

    :last-of-type {
      margin-right: 0;
    }
  }

  strong {
    color: ${({ theme }) => theme.colors.grey1f};
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
