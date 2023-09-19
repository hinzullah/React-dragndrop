import React from "react";
import NavBar from "../components/NavBar";
import ImageGallery from "../components/ImageGallery";

const Home = () => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <ImageGallery />
    </div>
  );
};

export default Home;
