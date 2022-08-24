import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../component/Loader";
import { app, fireDB } from "../firebaseConfig";

function Login() {
  const { loading } = useSelector((store) => store);

  const dispach = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = () => {
    dispach({ type: "showLoading" });

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        getDoc(doc(fireDB, "users", user.uid)).then((user) => {
          localStorage.setItem(
            "moment-user",
            JSON.stringify({ ...user.data(), id: user.id })
          );
          toast.success("login Successfull");
        });
        dispach({ type: "hideLoading" });
        navigate("/");
      })
      .catch((error) => {
        toast.error("Login Failed");
        dispach({ type: "hideLoading" });
      });
  };
  return (
    <div className="bg-sky-500 h-screen ">
      {loading && <Loader />}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className=" border border-gray-300 h-10 rounded-sm focus: border-gray-500 pl-5 mx-5 mt-10"
          ></input>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className=" border border-gray-300 h-10 rounded-sm focus: border-gray-500 pl-5 mx-5 mt-4 "
          ></input>
          <div className=" flex justify-end">
            <button
              type="submit"
              className=" bg-sky-500 h-10 rounded-md text-white px-10 mt-5 mr-5 "
              onClick={login}
            >
              Login
            </button>
          </div>
          <Link
            to="/register"
            className=" text-sm w-fit flex justify-start mt-5 ml-10 text-black hover:text-sky-500"
          >
            Click here to register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
