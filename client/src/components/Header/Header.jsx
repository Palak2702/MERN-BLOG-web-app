import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../Redux/store";
import toast from "react-hot-toast";

const Header = () => {
  //global state
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setvalue] = useState();

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout);
      toast.success("logged out");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {" "}
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="#" style={{ color: "blueviolet" }}>
            Blog Web App
          </a>
          <ul className="navbar-nav  text-center ">
            {isLogin && (
              <>
                <li className="nav-item ">
                  <Link className="nav-link" to="/create">
                    Create Blog
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                    className="nav-link"
                    to="/blogs"
                    value={value}
                    onChange={(e, val) => setvalue(val)}
                  >
                    Blogs
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                    className="nav-link"
                    to="/my-blogs"
                    value={value}
                    onChange={(e, val) => setvalue(val)}
                  >
                    My Blogs
                  </Link>
                </li>
              </>
            )}

            {!isLogin && (
              <>
                <li className="nav-item ">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
          {isLogin && (
            <button
              className="btn  my-2 my-sm-0 my-lg-0"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
