import "./App.css";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Header from "./components/Header/Header";
import CreateBlog from "./pages/CreateBlog";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBlog from "./pages/MyBlog";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<MyBlog />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
