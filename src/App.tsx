import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ThemeProvider } from "styled-components";
import { userLoad } from "./apis/user/load";
import { modalStateAtom, modalStateAtomType } from "./atoms/modalState";
import { userStateAtom, userStateAtomType } from "./atoms/userState";
import Modal from "./components/modal";
import FarmPage from "./pages/farmPage";
import JournalPage from "./pages/journalPage";
import LoginPage from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import MenuPage from "./pages/menuPage";
import PageFrame from "./pages/pageFrame";
import SignUpPage from "./pages/registerPage";
import { GlobalStyle } from "./styles/globalStyle";
import theme from "./styles/theme";

function App() {
  const [modalState] = useRecoilState<modalStateAtomType>(modalStateAtom);
  const [, setUserState] = useRecoilState<userStateAtomType>(userStateAtom);

  useEffect(() => {
    const fetchData = async () => setUserState(await userLoad());
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {modalState.modalContents !== null && (
        <Modal
          title={modalState.title}
          modalContents={modalState.modalContents}
        />
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/farm/:id"
            element={
              <PageFrame>
                <FarmPage />
              </PageFrame>
            }
          />
          <Route
            path="/journal/read/:id"
            element={
              <PageFrame>
                <JournalPage />
              </PageFrame>
            }
          />
          <Route
            path="/journal/write"
            element={
              <PageFrame>
                <JournalPage />
              </PageFrame>
            }
          />
          <Route
            path="/menu"
            element={
              <PageFrame>
                <MenuPage />
              </PageFrame>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
