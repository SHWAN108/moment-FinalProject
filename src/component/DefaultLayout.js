import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Loader from "./Loader";
function DefaultLayout(props) {
  const { loading } = useSelector((store) => store);
  return (
    <div className=" mx-20 my-5 md:mx-5">
      {loading && <Loader />}
      <Header />
      <div className="content mt-5 border-2 h-fit rounded-md p-5">
        {props.children}
      </div>
    </div>
  );
}

export default DefaultLayout;
