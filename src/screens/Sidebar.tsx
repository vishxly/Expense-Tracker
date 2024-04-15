import React from "react";

const Sidebar: React.FC = () => {
  const handleSignOut = () => {
    // Your sign-out logic here
    console.log("Signing out...");
  };

  const handleAddExpense = () => {
    // Your add expense logic here
    console.log("Adding expense...");
  };

  const handleSettings = () => {
    // Your settings logic here
    console.log("Opening settings...");
  };

  return (
    <aside className="w-64 bg-white border-r">
      {/* Logo */}
      <div className="py-4 px-6 border-b">
        <img src="logo.png" alt="Logo" className="h-8" />
      </div>
      
      {/* Navigation */}
      <nav className="py-4 px-6">
        <ul>
          <li>
            <button onClick={handleAddExpense} className="block py-2 text-gray-800 hover:bg-gray-200">
              Add Expense
            </button>
          </li>
          <li>
            <button onClick={handleSettings} className="block py-2 text-gray-800 hover:bg-gray-200">
              Settings
            </button>
          </li>
        </ul>
      </nav>

      {/* Sign Out */}
      <div className="absolute bottom-0 w-full border-t">
        <button onClick={handleSignOut} className="w-full py-4 bg-gray-200 text-gray-800 hover:bg-gray-300">
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
