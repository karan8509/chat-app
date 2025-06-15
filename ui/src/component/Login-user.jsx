import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });
      // console.log("->", res);
      const { success, message } = res.data;
      toast.success(success);
    } catch (error) {
      console.log("error in login Routes");
      toast.error(error.message?.name);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-gray-900 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-4 text-white">
          Private Chat Room
        </h1>
        <form onSubmit={handleClick}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input      
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 p-3 w-[250px] border-2 border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 p-3 w-[250px] border-2 border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your password"
            />
          </div>
          <h5 className="text-1xl font-semibold text-center mb-2 text-white">
            Don't have an account?{" "}
            <NavLink to="/" className=" text-blue  hover:text-blue-600">
              {" "}
              Sign up
            </NavLink>
          </h5>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
