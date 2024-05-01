import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
            Expense Tracker
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/home"
                className="text-white hover:text-gray-200 font-semibold bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition duration-300"
              >
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
