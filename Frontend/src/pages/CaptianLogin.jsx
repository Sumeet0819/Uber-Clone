import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginCaptain, clearCaptainError } from "../store/captainSlice";

const CaptianLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.captain);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginCaptain({ email, password }));
      if (loginCaptain.fulfilled.match(resultAction)) {
        navigate('/captain/home'); // Redirect to captain dashboard
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleInputChange = () => {
    if (error) {
      dispatch(clearCaptainError());
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
          <h3 className="text-lg mb-2 font-medium">Captain Email</h3>
          <input
            className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleInputChange();
            }}
            placeholder="captain@example.com"
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
            {isLoading ? "Logging In..." : "Captain Login"}
          </button>
          <p className="text-center mb-2">
            Onboard fleet? 
            <Link to='/captian-signup' className="text-blue-600"> Register as Captian</Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/login"
          className="flex items-center justify-center rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-amber-500 text-white"
        >
          Sign-In as User
        </Link>
      </div>
    </div>
  );
};

export default CaptianLogin;
