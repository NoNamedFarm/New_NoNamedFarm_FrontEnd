import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import FarmPage from "./pages/farmPage";
import LoginPage from "./pages/loginPage";
import FarmMainPage from "./pages/mainPage/farm";
import JournalMainPage from "./pages/mainPage/journal";
import SignUpPage from "./pages/signUpPage";
import { GlobalStyle } from "./styles/globalStyle";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/farm" element={<FarmPage />}>
            <Route path=":id" element={<FarmPage />} />
          </Route>
          <Route path="/menu/farm" element={<FarmMainPage />} />
          <Route path="/menu/journal" element={<JournalMainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
