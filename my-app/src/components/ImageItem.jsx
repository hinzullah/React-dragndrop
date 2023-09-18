import React from "react";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

const ImageItem = ({ image, id }) => {
  const [isToggled, setIsToggled] = useState(true);

  const handleToggle = () => {
    setIsToggled(!isToggled); // Toggle the like state
  };
  return (
    <div className="">
      <div className=" w-5/6 relative" key={id}>
        <img src={image.img} alt="test" className=" rounded-xl" />
        {/* <!-- Overlay --> */}
        <div className="rounded-xl absolute inset-0 bg-black opacity-20 hover:opacity-10"></div>

        <div className=" bottom-3 left-3 absolute">
          {/* Image title  & Tag*/}
          <p className="text-xl font-bold text-white">{image.title}</p>
          {image.tags.map((tag, index) => (
            <p className="text-white text-sm" key={index}>
              {tag}
            </p>
          ))}
        </div>
        {/* image type */}
        <p className="absolute top-3 left-3 bg-gray-800 text-white text-xs p-1 rounded-md bg-opacity-50">
          {image.type}
        </p>
        {/* Like/heart button */}
        <button onClick={handleToggle} className="absolute bottom-3 right-3">
          {isToggled ? (
            <span className="  text-white ">
              <AiFillHeart size={24} />
            </span>
          ) : (
            <span className="  text-red-500 ">
              <AiFillHeart size={24} />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ImageItem;
