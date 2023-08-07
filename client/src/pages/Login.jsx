import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      const { data } = await axios.post("/api/v1/users/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());

        toast.success("User logged in");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form" onSubmit={handleSubmit}>
      <h3 style={{ textAlign: "center", color: "blue" }}>Login Page</h3>
      <form>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
