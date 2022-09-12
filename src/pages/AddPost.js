import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultLayout from "../component/DefaultLayout";
import { fireDB } from "../firebaseConfig";
function AddPost() {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const dispach = useDispatch();
  const addPost = () => {
    dispach({ type: "showLoading" });
    const storage = getStorage();
    const storageRef = ref(storage, `/posts/${image.name}`);
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        getDownloadURL(ref(storage, `/posts/${image.name}`)).then((url) => {
          addDoc(collection(fireDB, "posts"), {
            description,
            imageURL: url,
            likes: [],
            comment: [],
            user: JSON.parse(localStorage.getItem("moment-user")),
          })
            .then(() => {
              toast.success("Post created successfully");
              dispach({ type: "hideLoading" });
              navigate("/");
            })
            .catch(() => {
              dispach({ type: "hideLoading" });
              toast.error("something went wrong");
            });
        });
      })

      .catch(() => {
        toast.error("Error uploading");
      });
  };
  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <DefaultLayout>
      <div>
        <h1 className=" text-3xl text-sky-500">Add New Post</h1>
        <div className=" w-screen flex flex-col">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" border-dashed border-black border-2 w-1/2 md:w-full my-5 p-5 rounded"
            rows="3"
          ></textarea>
          <input type="file" onChange={(e) => onImageChange(e)} />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className=" mt-5 h-52 w-52"
            />
          )}
        </div>
        {description && image && (
          <button
            className=" bg-sky-500 h-10 rounded-md text-white px-10 mt-10"
            onClick={addPost}
          >
            Login
          </button>
        )}
      </div>
    </DefaultLayout>
  );
}

export default AddPost;
