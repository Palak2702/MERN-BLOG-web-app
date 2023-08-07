import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blog
  const getuserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuserBlogs();
  }, []);

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You have not created any blog yet.</h1>
      )}
    </div>
  );
};

export default MyBlog;
