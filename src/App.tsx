import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import AuthProvider from "./helpers/AuthProvider";
import RequireAuth from "./helpers/RequireAuth";
import ItemPage from "./pages/ItemPage";
import ItemsUpload from "./pages/ItemsUpload";
import Login from "./pages/Login";
import SaleList from "./pages/SaleList";
import appTheme from "./utils/theme";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={appTheme}>
        <Navbar />
        <Container component="main">
          <CssBaseline />
          <Routes>
            <Route
              index
              element={
                <RequireAuth>
                  <SaleList />
                </RequireAuth>
              }
            />
            <Route
              path="item/:itemId"
              element={
                <RequireAuth>
                  <ItemPage />
                </RequireAuth>
              }
            />
            {import.meta.env.DEV && (
              <Route path="upload" element={<ItemsUpload />} />
            )}
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
