import React, { useState, useEffect } from "react";
import { Expense } from "../types";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
// import { useNavigate } from "react-router-dom";

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  // const navigate = useNavigate();

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
      remark: remark.trim(),
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
      setRemark("");
    } catch (error) {
      console.error("Error adding expense: ", error);
    }
  };

  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.error("Error signing out: ", error);
  //     });
  // };

  return (
    <div className="flex bg-slate-200 h-full overflow-hidden">
      <div className="w-1/2 mr-4 border-x-2 border-black">
  <form onSubmit={handleSubmit} className="mt-8 bg-white rounded-lg shadow-md p-4">
    <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <div>
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
      <div>
        <label htmlFor="remark" className="block text-gray-700">
          Remark
        </label>
        <textarea
          id="remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
    </div>
    <button
      type="submit"
      className="mt-12 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
    >
      Add Expense
    </button>
  </form>
</div>


      <div className="w-1/2 ml-4 overflow-y-auto ">
        <div className="mt-8 bg-slate-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Expenses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="bg-white shadow-md p-4 rounded-lg">
                <h3 className="font-semibold">{expense.title}</h3>
                <p>Category: {expense.category}</p>
                <p>Amount: ${expense.amount.toLocaleString()}</p>
                {expense.remark && <p>Remark: {expense.remark}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
