import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const [inputs, setInputs] = useState({});

  // get blog details
  const getBlogDetails = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="create"
      style={{ width: "40%", margin: "auto", marginTop: 20, padding: 2 }}
    >
      <form onSubmit={handleSubmit}>
        <h2 className="blog-portal-head">Create A Blog</h2>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={inputs.title}
          onChange={handleChange}
        />

        <label>description</label>
        <textarea
          type="text"
          name="description"
          value={inputs.description}
          onChange={handleChange}
          rows={6}
        />
        <br />
        <label>Upload blog image</label>
        <input
          type="text"
          name="image"
          value={inputs.image}
          onChange={handleChange}
          style={{ margin: 5 }}
        />

        <button className="btn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default BlogDetails;
