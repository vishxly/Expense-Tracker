import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./screens/Home";
import LoginPage from "./screens/Login";
import SignUp from "./screens/SignUp";
import { initializeApp } from "firebase/app";
import { config } from "./firebase/firebaseConfig";
import AuthRoute from "./firebase/AuthRoute";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import Sidebar from "./screens/Sidebar";

initializeApp(config);

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col w-full">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <AuthRoute>
                  <HomePage />
                </AuthRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/expenseForm" element={<ExpenseForm />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Application;
