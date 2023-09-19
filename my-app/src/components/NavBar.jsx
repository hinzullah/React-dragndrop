import React from "react";
import { useState } from "react";
import { FaBattleNet } from "react-icons/fa";

const NavBar = ({ handleSignOut }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled); // Toggle the like state
  };
  return (
    <div className="flex items-center justify-between shadow-lg py-5 md:py-3 px-5  ">
      <div className=" flex gap-3">
        <FaBattleNet size={32} />
        <p className="font-semibold">Image Gallery</p>
      </div>
      <div
        onClick={handleToggle}
        className=" bg-blue-500 rounded-full shadow-sm cursor-pointer"
      >
        <img src="/5907.jpg" alt="user" className="w-12 rounded-full" />
      </div>

      <div
        className={
          isToggled
            ? "absolute right-5 top-20 bg-white shadow-lg h-1/6 w-40 rounded-md z-40"
            : "hidden"
        }
      >
        <div className="flex items-center justify-center pt-10">
          <button
            onClick={() => handleSignOut()}
            className="hover:bg-blue-800 bg-blue-700 py-2 px-4 text-white font-semibold rounded-md"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
