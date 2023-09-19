import { createContext, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import LoginPage from "./components/LoginPage";
import Home from "./pages/Home";
import SignupPage from "./components/SignupPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/gallery" element={<Home />} />
    </>
  )
);

export const UserContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  //fires everytime that a user signs in or out
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });
  return (
    <>
      <UserContext.Provider value={{ auth, currentUser, setCurrentUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
