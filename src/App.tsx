import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
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
          <Route path="/farm" element={<FarmMainPage />} />
          <Route path="/journal" element={<JournalMainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
