import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/users/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User successfuly Registerd");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h3 style={{ textAlign: "center", color: "blue" }}>Register Page</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Email </label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" color="primary">
            Register
          </button>
          <button onClick={() => navigate("/login")}>
            Already Registered ? Please Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
