// library
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

// store
import { store, useTypedSelector } from "./redux/store";

// pages
import Main from "./pages/Main";
import LoginPaper from "./pages/SignIn";
import Error from "./pages/Error";
import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { refresh } from "./redux/store/reducers/auth/auth.action";
import { MainContext } from "./context";
import { defaultState } from "./context/MainContext";
import { checkAuth } from "./checkAuth";

function App() {
  const { isAuth } = useTypedSelector((state) => state.auth);

  React.useEffect(() => {
    if (localStorage.getItem("access_token")) {
      // store.dispatch(refresh());
      checkAuth()
    }
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Context
  const [lastPage, setLastPage] = React.useState(defaultState.lastPage);
  const setPage = (value: number) => {
    setLastPage(value);
  };

  return (
    <>
      {isMobile ? (
        <div style={{ marginLeft: "5px", marginTop: "10px" }}>
          Сайт недоступен на мобильных устройствах
        </div>
      ) : (
        <MainContext.Provider value={{ lastPage, setPage }}>
          <Routes>
            {/* <Route path="/" element={<Navigate to={isAuth ? "/app" : "/auth"} />} /> */}
            <Route
              path="/app/*"
              element={isAuth ? <Main /> : <Navigate to="/auth" />}
            />
            <Route
              path="/auth"
              element={isAuth ? <Navigate to="/app" /> : <LoginPaper />}
            />
            <Route path="*" element={<Navigate to={"/app"} />} />
          </Routes>
        </MainContext.Provider>
      )}
    </>
  );
}

export default App;
