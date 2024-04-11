import React, { useState } from 'react';
import { Expense } from '../types'; // Assuming you have a types file defining the Expense type

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !category.trim() || !amount.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const newExpense: Expense = {
      id: Math.random().toString(),
      title,
      category,
      amount: parseFloat(amount),
    };

    // Pass the new expense to the parent component
    onAddExpense(newExpense);

    // Reset form fields
    setTitle('');
    setCategory('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700">Category</label>
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
        <label htmlFor="amount" className="block text-gray-700">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
