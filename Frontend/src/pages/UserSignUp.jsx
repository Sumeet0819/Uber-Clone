import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/userSlice";

const UserSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);

  const [email, setemail] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    try {
      const result = await dispatch(registerUser(userData));
      
      if (result.payload) {
        // Reset form
        setfirstname("");
        setlastname("");
        setemail("");
        setpassword("");
        
        // Navigate to user home
        navigate("/home");
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="h-screen p-7 flex flex-col justify-between">
      <div>
        <img
          className="w-25 relative -left-2  mb-10"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt=""
        />

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="text-lg mb-2 font-medium">What's Your Name ?</h3>
          <div className="flex flex-row items-center justify-between gap-4">
            <input
              className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
              type="text"
              value={firstname}
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
              placeholder="John"
              required
            />
            <input
              className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
              type="text"
              value={lastname}
              onChange={(e) => {
                setlastname(e.target.value);
              }}
              placeholder="John"
              required
            />
          </div>
          <h3 className="text-lg mb-2 font-medium">Enter Your Email</h3>

          <input
            className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
            type="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            placeholder="email@example.com"
            required
          />
          <h3 className="text-lg mb-2 font-medium">Create Password</h3>
          <input
            className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
            type="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder="password"
            required
          />
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <button 
            className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-black text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign-Up"}
          </button>
          <p className="text-center mb-2">
            Account already exists?  
            <Link to="/login" className="text-blue-600"> Continue</Link>
          </p>
        </form>
      </div>
    <div className="text-center text-sm text-gray-600">
      <p>
        By signing up, you agree to our{" "}
        <Link to="/terms" className="text-blue-600 hover:underline">
          Terms of Service
        </Link>
        {" "}and{" "}
        <Link to="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
    </div>
  );
};

export default UserSignUp;
