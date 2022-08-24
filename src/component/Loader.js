import React from "react";

function Loader() {
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <div className=" h-28 w-28 border-gray-300 border-8 rounded-full border-t-gray-500 animate-spin"></div>
    </div>
  );
}

export default Loader;
