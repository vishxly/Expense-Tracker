import React, { useState, useEffect } from "react";
import { Expense } from "../types";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      const expensesCollection = collection(db, "expenses");
      const snapshot = await getDocs(expensesCollection);
      const expensesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Expense),
      }));
      setExpenses(expensesData);
    };

    fetchExpenses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !category.trim() || !amount.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const newExpense: Expense = {
      title,
      category,
      amount: parseFloat(amount),
    };

    try {
      const docRef = await addDoc(collection(db, "expenses"), {
        ...newExpense,
        createdAt: Timestamp.now(),
      });
      newExpense.id = docRef.id;

      setExpenses([...expenses, newExpense]);
      onAddExpense(newExpense);

      setTitle("");
      setCategory("");
      setAmount("");
    } catch (error) {
      console.error("Error adding expense: ", error);
    }
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div className="flex bg-slate-200">
      <div className="w-1/2 mr-4 border-x-2 border-black"> 
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-slate-200 rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-4 ml-4 ">
            Add Expense
            <button
              onClick={handleSignOut}
              className="mt-4 ml-10 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 "
            >
              Sign Out
            </button>
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="ml-4">
              <label htmlFor="title" className="block text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 p-2 w-3/4 border rounded-md "
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-gray-700">
                Category
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 p-2 w-3/4 border rounded-md"
              />
            </div>
          </div>
          <div className="mt-4 ml-4">
            <label htmlFor="amount" className="block text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 w-3/4 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="mt-12 ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Expense
          </button>
        </form>
      </div>

      <div className="w-1/2 ml-4 "> 
        <div className="mt-8 bg-slate-200 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Expenses</h2>
          <ul className="font-semibold">
            {expenses.map((expense) => (
              <li key={expense.id}>
                {expense.title} - {expense.category} - $
                {expense.amount.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Display expenses */}
    </div>
  );
};

export default ExpenseForm;
