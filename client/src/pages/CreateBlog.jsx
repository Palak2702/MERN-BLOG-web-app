import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  // input change

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog created");
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
          placeholder="enter title"
          required
        />

        <label>description</label>
        <textarea
          type="text"
          name="description"
          value={inputs.description}
          onChange={handleChange}
          rows={6}
          required
        />
        <br />
        <label>Upload blog image</label>
        <input
          type="text"
          name="image"
          value={inputs.image}
          onChange={handleChange}
          placeholder="enter image URL"
          style={{ margin: 5 }}
          required
        />

        <button className="btn" type="submit">
          POST
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
