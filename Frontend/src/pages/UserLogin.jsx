import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearUserError } from "../store/userSlice";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate('/home'); // Redirect to user dashboard
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleInputChange = () => {
    if (error) {
      dispatch(clearUserError());
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
          <h3 className="text-lg mb-2 font-medium">What's Your Email</h3>
          <input
            className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleInputChange();
            }}
            placeholder="email@example.com"
            required
          />
          <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
          <input
            className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange();
            }}
            placeholder="password"
            required
          />
          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-black text-white disabled:bg-gray-600"
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
          <p className="text-center mb-2">
            New Here?
            <Link to='/signup' className="text-blue-600"> Create new account</Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captian-login"
          className="flex items-center justify-center rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-emerald-500 text-white"
        >
          Sign-In as Captian
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
