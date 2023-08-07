import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BlogCard = ({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="card"
        style={{
          width: "40%",
          margin: "auto",
          marginTop: 12,
          padding: 2,
          backgroundColor: "white",
          boxShadow: "5px 5px 10px #ccc",
          ":hover:": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditIcon color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
        <p style={{ marginLeft: 5, color: "blueviolet" }}>
          {username} <br /> {time}
        </p>
        <img className="card-img-top" src={image} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">Title: {title}</h5>
          <p className="card-text"> Description: {description}</p>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
