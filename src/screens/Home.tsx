// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home: React.FC = () => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-4">Welcome to Expense Tracker</h1>
//       <p className="text-lg mb-4">Track your expenses easily with our simple and intuitive expense tracker app.</p>
//       <div className="flex justify-center">
//         <Link to="/signin" className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600">Sign In</Link>
//         <Link to="/signup" className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">Sign Up</Link>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const HomePage: React.FunctionComponent = () => {
  const auth = getAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Expense Tracker</h1>
      <p className="text-lg mb-6">
        Manage your expenses easily with Expense Tracker.
      </p>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={() => signOut(auth)}
        >
          Sign out
        </button>
        <Link
          to="/expenseForm"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Add Expense
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
