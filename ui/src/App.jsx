import { useEffect, useState } from "react";
import {  Route, Routes, useNavigate,  } from "react-router-dom";
import HomePages from "./pages/HomePages";
import SingupPages from "./pages/Singup-user";
import Login from "./pages/Login-user";
import { ToggleLeft } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ChatComponent from "./component/ChatComponent";
import { useBearStore } from "./store/auth";
import Cookies from "js-cookie";

const App = () => {
  const { user } = useBearStore();
  const navigate = useNavigate();
  const token = Cookies.get("token")
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
        <Route path="/message-box" element={<ChatComponent />} />
        <Route
          index
          element={!token ?    <SingupPages />  :  navigate("/message-box")}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
