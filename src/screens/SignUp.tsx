import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export interface ISignUpPageProps {}

const SignUp: React.FunctionComponent<ISignUpPageProps> = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const signUpWithEmailAndPasswordHandler = async () => {
    setAuthing(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        setSuccessMessage("User signed up successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <p className="text-2xl font-bold mb-4">Sign Up Page</p>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        className="w-64 p-2 mb-4 border rounded-md"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        className="w-64 p-2 mb-4 border rounded-md"
      />
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
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}
      <button
        onClick={() => signUpWithEmailAndPasswordHandler()}
        disabled={authing}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Sign Up
      </button>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
