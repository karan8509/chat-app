import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import HomePages from "./pages/HomePages";
import SingupPages from "./pages/Singup-user";
import Login from "./pages/Login-user";
import { ToggleLeft, User } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ChatComponent from "./component/ChatComponent";
import { useBearStore } from "./store/auth";

const App = () => {
  const { user } = useBearStore();
  const navigate = useNavigate();

  useEffect(()=>{
    navigate("/message")
  } , [user])

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
        <Route path="/message" element={<ChatComponent />} />
        <Route
          index
          element={user ? <ChatComponent /> : <SingupPages />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
