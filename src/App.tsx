import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./screens/Home";
import LoginPage from "./screens/Login";
import SignUp from "./screens/SignUp";
import { initializeApp } from "firebase/app";
import { config } from "./firebase/firebaseConfig";
import AuthRoute from "./firebase/AuthRoute";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import { addDoc, collection, getFirestore } from 'firebase/firestore';

initializeApp(config);

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  // Initialize Firestore
  const db = getFirestore();

  // Function to add an expense to Firestore
  const onAddExpense = async (expense) => {
    try {
      await addDoc(collection(db, 'expenses'), expense);
      console.log('Expense added successfully');
    } catch (error) {
      console.error('Error adding expense: ', error);
    }
  };

  return (
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
        <Route
          path="/expenseForm"
          element={<ExpenseForm onAddExpense={onAddExpense} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
