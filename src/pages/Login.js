import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="bg-sky-500 h-screen ">
      <Link
        to="/"
        className=" m-auto flex justify-center w-fit text-white text-6xl font-bold pt-5 hover:text-sky-300 hover:text-7xl transition-color duration-200"
      >
        moment
      </Link>
      <div className="items-center  justify-center flex mt-24">
        <div className=" w-96 flex flex-col bg-white text-center rounded-xl pb-20">
          <h1 className=" text-4xl  pt-14 text-sky-500 font-bold">LOGIN</h1>
          <input
            type="email"
            placeholder="email"
            className=" border border-gray-300 h-10 rounded-sm focus: border-gray-500 pl-5 mx-5 mt-10"
          ></input>
          <input
            type="password"
            placeholder="password"
            className=" border border-gray-300 h-10 rounded-sm focus: border-gray-500 pl-5 mx-5 mt-4 "
          ></input>
          <div className=" flex justify-end">
            <button
              type="submit"
              className=" bg-sky-500 h-10 rounded-md text-white px-10 mt-5 mr-5 "
            >
              LOGIN
            </button>
          </div>
          <Link
            to="/regester"
            className=" text-sm w-fit flex justify-start mt-5 ml-10 text-sky-500 hover:text-black"
          >
            Click here to register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
