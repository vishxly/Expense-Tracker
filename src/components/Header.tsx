import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-400 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-6xl font-bold">Expense Tracker</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/home" className="text-white hover:text-gray-200 font-semibold bg-slate-300 p-2 rounded-md">
                Home
              </Link>
            </li>
            {/* <li>
              <a href="#" className="text-white hover:text-gray-200">
                About
              </a>
            </li> */}
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
