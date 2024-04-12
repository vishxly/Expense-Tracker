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
import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    const auth = getAuth();

    return (
        <div>
            <p>Home Page (Protected by Firebase!)</p>
            <button onClick={() => signOut(auth)}>Sign out of Firebase</button>
        </div>
    );
};

export default HomePage;