import React from "react";
import { Expense } from "./types"; // Assuming you have a types file defining the Expense type

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Expense List</h2>
      <ul className="divide-y divide-gray-200">
        {expenses.map((expense) => (
          <li key={expense.id} className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{expense.title}</h3>
                <p className="text-gray-500">{expense.category}</p>
              </div>
              <div>
                <span className="text-gray-700">{expense.amount}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
