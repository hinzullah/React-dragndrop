import React from "react";

const ImageItem = ({ image }) => {
  return (
    <div>
      <div className=" w-full relative" key={image.id}>
        <img src={image.img} alt={image.title} className=" rounded-xl" />
        <div className=" bottom-3 left-3 absolute">
          <p className="text-l font-bold text-white">{image.title}</p>
          {image.tags.map((tag, index) => (
            <p className="text-white text-sm" key={index}>
              {tag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageItem;
