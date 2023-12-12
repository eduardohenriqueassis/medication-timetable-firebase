import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SuccessProvider } from "./context/CreateUserSuccessContext";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useAuthentication } from "./Hooks/useAuthentication";
import Table from "./components/Table/Table";
import AddEditMedication from "./components/AddMedication/AddEditMedication";
import ResetPassword from "./components/ResetPassword/ResetPassword";

const App = () => {
  const [user, setUser] = React.useState(undefined);
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p className="pLoading">Carregando...</p>;
  }
  return (
    <div className="app">
      <AuthProvider value={{ user }}>
        <SuccessProvider>
          <BrowserRouter>
            <Header />
            <main className="appBody">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/register"
                  element={!user ? <Register /> : <Navigate to="/" />}
                />
                <Route
                  path="/table"
                  element={user ? <Table /> : <Navigate to="/login " />}
                />
                <Route
                  path="/add-edit"
                  element={
                    user ? <AddEditMedication /> : <Navigate to="/login" />
                  }
                />
                <Route path="/resetPassword" element={<ResetPassword />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </SuccessProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
