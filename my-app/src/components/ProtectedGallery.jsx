import React, { useEffect, useState } from "react";
import { auth } from "../firebase"; // Import the Firebase auth instance

import LoginPage from "./LoginPage";

const ProtectedGallery = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is authenticated, set the user
        setUser(authUser);
      } else {
        // User is not authenticated, handle redirection or display a login message
        setUser(null);
        alert("Please Sign in to access the gallery :)");
      }
    });

    return () => {
      // Clean up the subscription when the component unmounts
      unsubscribe();
    };
  }, []);

  return <>{user ? children : <LoginPage />}</>;
};

export default ProtectedGallery;
