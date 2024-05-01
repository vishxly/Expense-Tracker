import React from "react";
import { getAuth} from "firebase/auth";
import { Link } from "react-router-dom";

const HomePage: React.FunctionComponent = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Expense Tracker</h1>
      <p className="text-lg mb-6">
        Manage your expenses easily with Expense Tracker.
      </p>
      <div className="flex space-x-4">
        {!user && (
          <Link
            to="/login"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Sign in
          </Link>
        )}
        {user && (
          <Link
            to="/expenseForm"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Add Expense
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
