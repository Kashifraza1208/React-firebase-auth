import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStatus, loadUser } from "./redux/authAction";

import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import store from "./redux/stote";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user data if authenticated
    if (checkAuthStatus()) {
      store.dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
