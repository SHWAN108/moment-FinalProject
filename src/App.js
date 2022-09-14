import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import AddPost from "./pages/AddPost";

import PostDesc from "./pages/PostDesc";
function App() {
  return (
    <div className="App">
      <div className=" "></div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouted>
                <Home />
              </ProtectedRouted>
            }
          />

          <Route
            path="/addpost"
            element={
              <ProtectedRouted>
                <AddPost />
              </ProtectedRouted>
            }
          />
          <Route
            path="/post/:id"
            element={
              <ProtectedRouted>
                <PostDesc />
              </ProtectedRouted>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function ProtectedRouted({ children }) {
  if (localStorage.getItem("moment-user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
export default App;
