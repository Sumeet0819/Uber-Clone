import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/vector-1755257875948-46f857d061b2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex bg-red-400 justify-between w--full flex-col">
          <img className="w-25 relative left-2 -top-5" src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt=""/>
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started wit Uber</h2>
          <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"> Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Start;

