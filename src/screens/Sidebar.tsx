import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSettings = () => {
    console.log("Opening settings...");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to the homepage
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <aside className="w-64 bg-gradient-to-r from-indigo-100 via-red-100 to-yellow-100 border-r">
      <div className="py-4 px-6 border-b">
        <img
          src="https://raw.githubusercontent.com/yadavvshall/Expense-Tracker/main/src/assets/logo.jpg"
          alt="Logo"
          className="h-10 w-auto object-contain rounded-md ml-5"
        />
      </div>

      <nav className="py-4 px-6 ">
        <ul>
          <li>
            <Link to="/chart" className="block py-2 px-4 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-colors duration-300 w-24 mb-4">
              Chart
            </Link>
          </li>
          <li>
            <button
              onClick={handleSettings}
              className="block py-2 px-4 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
            >
              Settings
            </button>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="block py-2 px-4 mt-4 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
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
