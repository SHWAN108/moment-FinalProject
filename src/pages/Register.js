import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fireDB, app } from "../firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const register = () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: user.email,
          profilePicUrl: "",
          bio: "Hello World",
        };
        setDoc(doc(fireDB, "users", user.uid), userData);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
          <h1 className=" text-4xl  pt-14 text-sky-500 font-bold">Register</h1>
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
            className=" border border-gray-300 h-10 rounded-sm focus: border-gray-500 pl-5 mx-5 mt-4 "
          ></input>
          <div className=" flex justify-end">
            <button
              type="submit"
              className=" bg-sky-500 h-10 rounded-md text-white px-10 mt-5 mr-5 "
              onClick={register}
            >
              Register
            </button>
          </div>
          <Link
            to="/login"
            className=" text-sm w-fit flex justify-start mt-5 ml-10 text-black hover:text-sky-500"
          >
            Already have an account?, login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
