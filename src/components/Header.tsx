import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-6xl font-bold">Expense Tracker</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white hover:text-gray-200">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200">
                About
              </a>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
