import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../component/DefaultLayout";
import { fireDB } from "../firebaseConfig";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineClose,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
function PostDesc() {
  const currentUser = JSON.parse(localStorage.getItem("moment-user"));
  const [alreadyLiked, setAreadyLiked] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [post, setPost] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserName = (text) => {
    const email = text;
    const username = email.substring(0, email.length - 10);
    return username;
  };

  const getData = () => {
    dispatch({ type: "showLoading" });
    getDoc(doc(fireDB, "posts", params.id))
      .then((response) => {
        setPost({ ...response.data(), id: response.id });
        if (response.data().likes.find((user) => user.id === currentUser.id)) {
          setAreadyLiked(true);
        } else {
          setAreadyLiked(false);
        }
        dispatch({ type: "hideLoading" });
      })
      .catch(() => {
        dispatch({ type: "hideLoading" });
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const likeOrUnlikePost = () => {
    let updatedLikes = post.likes;

    if (alreadyLiked) {
      updatedLikes = post.likes.filter((user) => user.id !== currentUser.id);
    } else {
      updatedLikes.push({
        id: currentUser.id,
        email: currentUser.email,
      });
    }

    setDoc(doc(fireDB, "posts", post.id), { ...post, likes: updatedLikes })
      .then(() => {
        getData();
        toast.success("Post liked successfully");
      })
      .catch(() => {
        toast.error("An error occurred");
      });
  };

  const addComment = () => {
    let updatedComments = post.comment;

    updatedComments.push({
      id: currentUser.id,
      email: currentUser.email,
      commentText,
      createdOn: moment().format("DD-MM-YYYY"),
    });

    setDoc(doc(fireDB, "posts", post.id), {
      ...post,
      comment: updatedComments,
    })
      .then(() => {
        getData();
        setCommentText("");
      })
      .catch(() => {
        toast.error("An error occurred");
      });
  };

  return (
    <DefaultLayout>
      <div className="flex w-full justify-center space-x-5">
        {post && (
          <>
            {/* likes display purpose */}
            {showLikes && (
              <div className="w-96">
                <div className="flex justify-between">
                  <h1 className="text-xl font-semibold text-gray-500">
                    Liked By
                  </h1>
                  <AiOutlineClose
                    color="gray"
                    className="cursor-pointer"
                    onClick={() => setShowLikes(false)}
                  />
                </div>
                <hr />
                {post.likes.map((like) => {
                  return (
                    <div className="flex item items-center card-sm p-2 mt-2">
                      <div className="h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center text-white mr-2">
                        <span className="text-2xl">
                          {getUserName(like.email)[0]}
                        </span>
                      </div>
                      <span>{getUserName(like.email)}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* post info purpose */}
            <div className="cursor-pointer h-[550px] w-[550px]">
              <div className="card-sm p-2 flex w-full space-x-5 bg-sky-500 items-center text-white">
                <div className="h-10 w-10 rounded-full bg-white flex justify-center items-center text-sky-500 mr-2">
                  <span className="text-2xl">
                    {getUserName(post.user.email)[0]}
                  </span>
                </div>
                <span>{getUserName(post.user.email)}</span>
              </div>
              <div className="w-full text-center flex justify-center card-sm">
                <img src={post.imageURL} alt="" className="h-full w-full" />
              </div>
              <div className="card-sm p-2 flex w-full space-x-5 bg-sky-500">
                <div className="flex space-x-2 items-center">
                  <AiFillHeart
                    size={25}
                    onClick={likeOrUnlikePost}
                    color={alreadyLiked ? "red" : "white"}
                  />
                  <h1
                    className="underline font-semibold cursor-pointer text-white"
                    onClick={() => setShowLikes(true)}
                  >
                    {post.likes.length}
                  </h1>
                </div>
                <div className="flex space-x-2 items-center">
                  <AiOutlineComment size={25} color="white" />
                  <h1
                    className="underline text-xl cursor-pointer text-white"
                    onClick={() => setShowComments(true)}
                  >
                    {post.comment.length}
                  </h1>
                </div>
                <div>
                  <AiOutlineShareAlt
                    onClick={() => navigate(`/sharepost/${post.id}`)}
                    size={25}
                    color="white"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* comments info purpose */}
            {showComments && (
              <div className="w-96">
                <div className="flex justify-between">
                  <h1 className="text-xl font-semibold text-sky-500">
                    Comments
                  </h1>
                  <AiOutlineClose
                    color="blue"
                    className="cursor-pointer"
                    onClick={() => setShowComments(false)}
                  />
                </div>
                {post.comment.map((comment) => {
                  return (
                    <div className="card-sm mt-2 p-2">
                      <h1 className="text-xl text-gray-700">
                        {comment.commentText}
                      </h1>
                      <hr />
                      <h1 className="text-right text-md">
                        By <b>{getUserName(comment.email)}</b> On{" "}
                        {comment.createdOn}
                      </h1>
                    </div>
                  );
                })}
                <div className="flex flex-col">
                  <textarea
                    className="border-dashed border-black border-2  md:w-full my-5 p-5 w-full"
                    rows="2"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>

                  <button
                    className="bg-sky-500 h-10 rounded-md text-white px-5 mt-2 w-20 text-center"
                    onClick={addComment}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
}

export default PostDesc;
