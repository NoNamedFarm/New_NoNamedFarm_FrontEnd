import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
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
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
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
            path="/journal/:date"
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
