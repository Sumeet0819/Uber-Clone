import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Home = () => {
  const [panelOpen, setpanelOpen] = useState(false);
  const paneRef = useRef(null);

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(paneRef.current, {
        height: "70vh",
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(paneRef.current, {
        height: "0vh",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [panelOpen]);
  return (
    <div>
      <div className=" h-screen  pt-2 flex bg-[#1c1c1c] justify-between  w-full flex-col">
        <div className="header flex items-start font-regular text-white justify-center text-3xl">
          Uber
        </div>
        <div className="bottom-section  p-4 mt-2  rounded-t-2xl w-full flex flex-col gap-4 bg-white">
          <div className="content flex flex-col items-center">
            <p className="font-bold text-[#1c1c1c] text-xl">
              Set your destination
            </p>
            <p className="font-regular text-lg">Drag th map to move the pin</p>
          </div>
          <div className="flex flex-col items-center justify-between gap-2 p-2 ">
            <input
              onClick={() => {
                setpanelOpen(true);
              }}
              onBlur={() => {
                setpanelOpen(false);
              }}
              className="bg-[#1c1c1ccc] p-2 rounded-lg w-full text-white outline-0"
              type="text"
              placeholder="Where to go ?"
            />
            <button className="bg-[#1c1c1c] capitalize text-white py-4 w-full rounded-lg font-regular text-lg">
              confirm destination
            </button>
          </div>
          <div ref={paneRef} className="bg-red-200 h-0"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
