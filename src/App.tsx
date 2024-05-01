import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./screens/Home";
import LoginPage from "./screens/Login";
import SignUp from "./screens/SignUp";
import { initializeApp } from "firebase/app";
import { config } from "./firebase/firebaseConfig";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import Sidebar from "./screens/Sidebar";
import Chart from "./screens/Chart";

initializeApp(config);

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = () => {
  return (
    <div className="flex">
      <BrowserRouter>
        {/* Include the Sidebar component */}
        <Sidebar />

        <div className="flex flex-col w-full h-screen">
          <Header />
          <Routes>
            {/* Render the HomePage component directly for the root path */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/expenseForm" element={<ExpenseForm />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="chart" element={<Chart expenses={[]} />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Application;
