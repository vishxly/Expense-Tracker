import React from "react";
import { getAuth, signOut } from "firebase/auth";
const Sidebar: React.FC = () => {
  const auth = getAuth();
  // const handleSignOut = () => {
  //   // Your sign-out logic here
  //   console.log("Signing out...");
  // };

  const handleAddExpense = () => {
    console.log("Adding expense...");
  };

  const handleSettings = () => {
    console.log("Opening settings...");
  };

  return (
    <aside className="w-64 bg-gray-400 border-r">
      <div className="py-4 px-6 border-b">
        <img
          src="https://raw.githubusercontent.com/yadavvshall/Expense-Tracker/main/src/assets/logo.jpg"
          alt="Logo"
          className="h-8"
        />
      </div>

      <nav className="py-4 px-6">
        <ul>
          <li>
            <button
              onClick={handleAddExpense}
              className="block py-4 text-gray-800 hover:bg-gray-200"
            >
              Add Expense
            </button>
          </li>
          <li>
            <button
              onClick={handleSettings}
              className="block py-4 text-gray-800 hover:bg-gray-200"
            >
              Settings
            </button>
          </li>
          <li>
            <button
              onClick={() => signOut(auth)}
              className="block py-4 text-gray-800 hover:bg-gray-200"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
