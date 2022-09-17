import React, { useEffect, useState } from "react";
import DefaultLayout from "../component/DefaultLayout";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { fireDB, fireDb } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "../component/Post";

function Profile() {
  const dispatch = useDispatch();
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const getPosts = async () => {
    dispatch({ type: "showLoading" });
    const querySnapshot = await getDocs(collection(fireDB, "posts"));
    const temp = [];
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    });
    const filteredPosts = temp.filter((post) => post.user.id === params.id);
    console.log(filteredPosts);
    setPosts(filteredPosts);
    dispatch({ type: "hideLoading" });
  };

  const getUser = async () => {
    const result = await getDoc(doc(fireDB, "users", params.id));
    setUser(result.data());
  };

  useEffect(() => {
    getPosts();
    getUser();
  }, []);

  const getUserName = (text) => {
    const email = text;
    const username = email.substring(0, email.length - 10);
    return username;
  };
  return (
    <DefaultLayout>
      {user && (
        <>
          {" "}
          <div>
            <div className="flex item items-center card-sm p-2">
              <div className="h-24 w-24 rounded-full bg-sky-500 flex justify-center items-center text-white mr-2">
                <span className="text-7xl">{getUserName(user.email)[0]}</span>
              </div>
              <div className="flex flex-col space-y-1 text-sky-500 font-semibold">
                <span>{getUserName(user.email)}</span>
                <span>{user.email}</span>
                <hr />
                <span>{user.bio}</span>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="card-sm p-2">
              <h1 className=" text-sky-500 font-semibold">
                Posts uploaded by {getUserName(user.email)}
              </h1>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-1 gap-10 mt-5">
              {posts.map((post) => {
                return <Post post={post} />;
              })}
            </div>
          </div>
        </>
      )}
    </DefaultLayout>
  );
}

export default Profile;
