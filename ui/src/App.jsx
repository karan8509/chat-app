import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePages from "./pages/HomePages";
import Singup from "./pages/Singup-user";
import Login from "./pages/Login-user";
import { ToggleLeft, User } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ChatComponent from "./component/ChatComponent";

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setUser(true); // Ya decoded ID set karo if needed
    }
  }, []);

  return (
    <div className="bg-gray-900 h-screen text-white flex justify-center items-center relative">
      <div className="absolute top-5  right-10  text-2xl">
        <ToggleLeft
          onClick={() => {
            console.log("hello");
          }}
        />
      </div>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route index element={<Singup />} />
        <Route
          path="/login"
          element={user ? <ChatComponent /> : <Login setUser={setUser} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;



