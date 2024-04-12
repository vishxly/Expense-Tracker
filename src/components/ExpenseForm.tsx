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
    <div>
      <form onSubmit={handleSubmit} className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
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
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="amount" className="block text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Expense
        </button>
      </form>

      <button
        onClick={handleSignOut}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
      >
        Sign Out
      </button>
      {/* Display expenses */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Expenses</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.title} - {expense.category} - $
              {expense.amount.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseForm;
