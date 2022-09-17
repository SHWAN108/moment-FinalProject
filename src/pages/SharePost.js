import React, { useEffect, useState } from "react";
import DefaultLayout from "../component/DefaultLayout";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { fireDB } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Sharepost() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [data, setData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getData = async () => {
    dispatch({ type: "showLoading" });
    const querySnapshot = await getDocs(collection(fireDB, "users"));
    const temp = [];
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    });
    setData(temp);
    dispatch({ type: "hideLoading" });
  };
  const getPost = () => {
    dispatch({ type: "showLoading" });
    getDoc(doc(fireDB, "posts", params.id))
      .then((response) => {
        setPost({ ...response.data(), id: response.id });

        dispatch({ type: "hideLoading" });
      })
      .catch(() => {
        dispatch({ type: "hideLoading" });
      });
  };

  useEffect(() => {
    getData();
    getPost();
  }, []);

  const getUserName = (text) => {
    const email = text;
    const username = email.substring(0, email.length - 10);
    return username;
  };

  const addOrRemoveUser = (user) => {
    if (selectedUsers.find((obj) => obj.id === user.id)) {
      const temp = selectedUsers.filter((obj) => obj.id !== user.id);
      setSelectedUsers(temp);
    } else {
      const temp = [...selectedUsers];
      temp.push(user);
      setSelectedUsers(temp);
    }
  };

  const sharePost = async () => {
    selectedUsers.forEach((user) => {
      dispatch({ type: "showLoading" });
      const tempShares = user.shares ?? [];
      tempShares.push({
        ...post,
        sharedBy: JSON.parse(localStorage.getItem("moment-user")),
      });
      setDoc(doc(fireDB, "users", user.id), {
        ...user,
        shares: tempShares,
      }).then(() => {
        dispatch({ type: "hideLoading" });
      });
    });

    toast.success("Post shared successfully");
    navigate("/");
  };

  return (
    <DefaultLayout>
      {" "}
      {post && data && (
        <div>
          <div className="my-5">
            <img src={post.imageURL} className="h-32 w-32" />
          </div>

          <hr />

          <h1 className="text-xl font-semibold text-sky-500">Select users</h1>

          <div className="grid grid-cols-5 md:grid-cols-1 gap-5 mt-5">
            {data.map((user) => {
              const alreadySelected = selectedUsers.find(
                (obj) => obj.id === user.id
              );
              return (
                <div
                  className={`cursor-pointer card p-5 justify-center items-center flex flex-col ${
                    alreadySelected && "border-4 border-primary"
                  }`}
                  onClick={() => {
                    addOrRemoveUser(user);
                  }}
                >
                  <div className="h-24 w-24 rounded-full bg-sky-500 flex justify-center items-center text-white">
                    <span className="text-5xl font-semibold">
                      {getUserName(user.email)[0]}
                    </span>
                  </div>
                  <h1 className="text-xl text-sky-500 mt-5">
                    {getUserName(user.email)}
                  </h1>
                </div>
              );
            })}
          </div>

          <div className="mt-5">
            <button
              className="bg-sky-500 h-10 rounded-sm text-white px-10"
              onClick={sharePost}
            >
              SHARE
            </button>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default Sharepost;
