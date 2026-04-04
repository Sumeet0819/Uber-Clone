import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerCaptain } from "../store/captainSlice";

const CaptianSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.captain);

  const [email, setemail] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [vehicleColor, setvehicleColor] = useState("");
  const [vehiclePlate, setvehiclePlate] = useState("");
  const [vehicleCapacity, setvehicleCapacity] = useState("");
  const [vehicleType, setvehicleType] = useState("car");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: parseInt(vehicleCapacity),
        vehicleType: vehicleType,
      },
    };

    try {
      const result = await dispatch(registerCaptain(captainData));
      
      if (result.payload) {
        // Reset form
        setfirstname("");
        setlastname("");
        setemail("");
        setpassword("");
        setvehicleColor("");
        setvehiclePlate("");
        setvehicleCapacity("");
        setvehicleType("car");
        
        // Navigate to captain dashboard or home
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
          <h3 className="text-lg mb-2 font-medium">Captain's Name</h3>
          <div className="flex flex-row items-center justify-between gap-4">
            <input
              className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
              type="text"
              value={firstname}
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
              placeholder="First Name"
              required
            />
            <input
              className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
              type="text"
              value={lastname}
              onChange={(e) => {
                setlastname(e.target.value);
              }}
              placeholder="Last Name"
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
            placeholder="captain@example.com"
            required
          />

          <h3 className="text-lg mb-2 font-medium">Vehicle Details</h3>
          <div className="flex flex-row items-center justify-between gap-4">
            <input
              className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
              type="text"
              value={vehicleColor}
              onChange={(e) => {
                setvehicleColor(e.target.value);
              }}
              placeholder="Vehicle Color"
              required
            />
            <input
              className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
              type="text"
              value={vehiclePlate}
              onChange={(e) => {
                setvehiclePlate(e.target.value);
              }}
              placeholder="License Plate"
              required
            />
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            <input
              className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
              type="number"
              value={vehicleCapacity}
              onChange={(e) => {
                setvehicleCapacity(e.target.value);
              }}
              placeholder="Seating Capacity"
              min="1"
              required
            />
            <select
              className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
              value={vehicleType}
              onChange={(e) => {
                setvehicleType(e.target.value);
              }}
              required
            >
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <h3 className="text-lg mb-2 font-medium">Create Password</h3>
          <input
            className="rounded px-4 py-2 mb-7 border-gray-100 w-full text-lg placeholder:text-base bg-gray-100"
            type="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder="Enter your password"
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
            {isLoading ? "Signing up..." : "Captain Sign-Up"}
          </button>
          <p className="text-center mb-2">
            Account already exists?
            <Link to="/captian-login" className="text-blue-600">
              {" "}
              Continue
            </Link>
          </p>
        </form>
      </div>
      <div className="text-center text-sm text-gray-600">
        <p>
          By signing up, you agree to our{" "}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptianSignUp;
