import React from "react";
import { useState } from "react";

const NavBar = ({ handleSignOut }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled); // Toggle the like state
  };
  return (
    <div className="flex items-center justify-between bg-gray-600 shadow-lg py-5 md:py-3 px-5  ">
      <div className=" flex flex-col gap-3">
        <p className="font-semibold text-white">Image Gallery</p>
        <h3 className="text-white">Drag and drop photos to rearrange</h3>
      </div>
      <div
        onClick={handleToggle}
        className=" bg-blue-400 rounded-full shadow-sm cursor-pointer"
      >
        <button
          onClick={() => handleSignOut()}
          className="hover:bg-blue-400 bg-blue-600 py-1 px-2 text-white font-semibold rounded-md"
        >
          Log Out
        </button>
      </div>

      <div
        className={
          isToggled
            ? "absolute right-5 top-20 bg-white shadow-lg h-1/6 w-40 rounded-md z-40"
            : "hidden"
        }
      ></div>
    </div>
  );
};

export default NavBar;
