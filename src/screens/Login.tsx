import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user.uid);
                navigate('/expenseForm'); // Redirect to expense form after successful login
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            });
    };

    const signInWithEmailAndPasswordHandler = async () => {
        setAuthing(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log(response.user.uid);
                navigate('/expenseForm'); // Redirect to expense form after successful login
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-2xl font-bold mb-4">Login Page</p>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-64 p-2 mb-4 border rounded-md"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-64 p-2 mb-4 border rounded-md"
            />
            <button onClick={() => signInWithEmailAndPasswordHandler()} disabled={authing} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Sign in with Email and Password
            </button>
            <br />
            <button onClick={() => signInWithGoogle()} disabled={authing} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4">
                Sign in with Google
            </button>
            <p className="mt-4">
                Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</Link>
            </p>
        </div>
    );
};

export default LoginPage;
