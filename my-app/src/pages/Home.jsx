import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { UserContext } from "../App";
import NavBar from "../components/NavBar";
import ImageGallery from "../components/ImageGallery";
import ProtectedGallery from "../components/ProtectedGallery";
import FooterCredit from "../components/FooterCredit";

const Home = () => {
  const navigate = useNavigate();
  const { auth, setCurrentUser } = useContext(UserContext);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      alert("Signed out succesfully!");
      navigate("/");
    } catch (error) {
      alert("There was an error!");
    }
  };

  return (
    <div className="flex flex-col relative">
      <ProtectedGallery>
        <NavBar handleSignOut={handleSignOut} />
        <ImageGallery />
        <FooterCredit />
      </ProtectedGallery>
    </div>
  );
};

export default Home;
