import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useBearStore } from "../store/auth";

const SingupPages = () => {
  const { Singup } = useBearStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevent) => ({
      ...prevent,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await Singup(formData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-gray-900 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-4 text-white">
          Create Account
        </h1>
        <form onSubmit={handleClick}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-3 w-[250px] border-2 border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300" >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-3 w-[250px] border-2 border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your password"
            />
          </div>
          <h5 className="text-1xl font-semibold text-center mb-2 text-white">
            You have an account?{" "}
            <NavLink to="/login" className=" text-blue  hover:text-blue-600">
              Login
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

export default SingupPages;
