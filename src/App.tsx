import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./screens/Home";
import LoginPage from "./screens/Login";
import SignUp from "./screens/SignUp";
import { initializeApp } from "firebase/app";
import { config } from "./firebase/firebaseConfig";
import AuthRoute from "./firebase/AuthRoute";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import {
  Timestamp,
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import Sidebar from "./screens/Sidebar"; // Import the Sidebar component

initializeApp(config);

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = () => {
  const db = getFirestore();

  const onAddExpense = async (expense: { id: string }) => {
    try {
      const docRef = await addDoc(collection(db, "expenses"), {
        ...expense,
        createdAt: Timestamp.now(),
      });

      expense.id = docRef.id;

      console.log("Expense added successfully with ID:", expense.id);
    } catch (error) {
      console.error("Error adding expense: ", error);
    }
  };

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
            <Route
              path="/expenseForm"
              element={<ExpenseForm onAddExpense={onAddExpense} />}
            />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Application;
