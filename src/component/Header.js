import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
function Header() {
  const user = JSON.parse(localStorage.getItem("moment-user"));
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
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
      path: `/profile/${user.id}`,
    },
  ];

  return (
    <div className=" px-3 py-2 bg-sky-500 rounded-md">
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
        <div>
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <h1 className=" text-3xl font-semibold text-white hover:text-sky-200 hover:text-4xl transition-color duration-200">
              moment
            </h1>
            <span className="text-white font-semibold">
              {user.email.substring(0, user.email.length - 10)}
            </span>
          </div>
        </div>

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
          <h1
            className="text-white cursor-pointer  hover:bg-sky-700 hover:rounded hover:p-2 transition-color duration-200"
            onClick={() => {
              localStorage.removeItem("moment-user");
              navigate("/login");
            }}
          >
            Logout
          </h1>
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
            <h1
              className="text-white cursor-pointer  hover:bg-sky-700 hover:rounded hover:p-2 transition-color duration-200"
              onClick={() => {
                localStorage.removeItem("moment-user");
                navigate("/login");
              }}
            >
              Logout
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
