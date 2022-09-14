import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../component/DefaultLayout";
import Post from "../component/Post";
import { fireDB } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
function Home() {
  const [data, setData] = useState([]);
  const dispach = useDispatch();
  const getData = async () => {
    dispach({ type: "showLoading" });
    const querySnapshot = await getDocs(collection(fireDB, "posts"));
    const temp = [];
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    });
    setData(temp);
    dispach({ type: "hideLoading" });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <DefaultLayout>
      <div className=" grid grid-cols-4 md:grid-cols-1">
        {data.map((post) => {
          return <Post post={post} />;
        })}
      </div>
    </DefaultLayout>
  );
}

export default Home;
