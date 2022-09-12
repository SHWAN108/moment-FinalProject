import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
function Header() {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const menuItems = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Add Post",
      path: "/addpost",
    },
    {
      title: "Shares",
      path: "/shares",
    },
    {
      title: "Profile",
      path: "/profile",
    },
  ];

  return (
    <div className=" p-3 bg-sky-500 rounded-md">
      {!showMenu && (
        <div className=" md:flex justify-end hidden -mb-8">
          <HiMenu
            size={30}
            color="white"
            className="cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
        </div>
      )}
      <div className=" flex items-center justify-between">
        <h1 className=" text-2xl font-semibold text-white hover:text-sky-200 hover:text-3xl transition-color duration-200">
          moment
        </h1>
        {/* web view */}
        <div className=" flex space-x-10 justify-end items-center md:hidden">
          {menuItems.map((item) => {
            return (
              <Link
                to={`${item.path}`}
                className={` text-white hover:bg-sky-700 hover:rounded hover:p-2 transition-color duration-200 ${
                  item.path === location.pathname &&
                  " bg-sky-700 text-white rounded p-2"
                }`}
                onClick={() => setShowMenu(false)}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
        {/* mobile view */}
        {showMenu && (
          <div className=" md:flex space-x-10 justify-end flex-col items-end space-y-2 hidden">
            {menuItems.map((item) => {
              return (
                <Link
                  to={`${item.path}`}
                  className={` text-white hover:bg-sky-700 hover:rounded hover:p-2 transition-color duration-200 ${
                    item.path === location.pathname &&
                    " bg-sky-700 text-white rounded p-2"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
