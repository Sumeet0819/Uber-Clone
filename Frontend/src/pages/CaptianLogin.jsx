import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CaptianLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState();
  const [captianData, setcaptianData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setcaptianData({
      email: email,
      password: password,
    });
    setemail("");
    setpassword("");
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
          <h3 className="text-lg mb-2 font-medium">What's Your phone number</h3>
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
          <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
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
          <button className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-black text-white">
            Login
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
