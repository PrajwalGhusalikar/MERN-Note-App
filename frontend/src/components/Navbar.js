import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import Userdetails from "./Userdetails";

function Navbar(props) {
  let setSearchText = props.setSearchText;
  let location = useLocation();
  useEffect(() => {}, [location]);
  function logOut() {
    localStorage.removeItem("token");
  }
  let setWelcomeUser = props.setWelcomeUser;

  let [theme, setTheme] = useState("light");
  let [bgColor, setBgColor] = useState("dark");
  let [themeIcom, setThemeIcon] = useState("moon");

  function onclick() {
    if (theme === "dark") {
      setTheme("light");
      setBgColor("dark");
      setThemeIcon("moon");
      document.body.style.backgroundColor = "	#6495ED";
    } else {
      setTheme("dark");
      setBgColor("light");
      setThemeIcon("sun");
      document.body.style.backgroundColor = "gray";
    }
  }

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            style={{ fontFamily: "cursive" }}
            to="/"
          >
            My-Notebook
          </Link>

          {/* <div className="form-check form-switch ">
            <input
              onclick={onclick}
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
            <label className="form-check-label" for="flexSwitchCheckDefault">
              Theme Change
            </label>
          </div> */}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem("token") && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : " "
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : " "
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>

            {!localStorage.getItem("token") ? (
              <>
                <div className="mx-3">
                  <Link
                    className="btn btn-primary btn-sm mx-1 my-1"
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-primary btn-sm mx-1 my-1"
                    to="/signup"
                    role="button"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="d-none  d-sm-block ">
                  {" "}
                  <SearchBar setSearchText={setSearchText} />
                </div>

                <div className="d-flex align-items-center py-2">
                  <div className="mx-2">
                    <Userdetails setWelcomeUser={setWelcomeUser} />
                  </div>
                  <Link
                    className="btn btn-danger btn-sm mx-1 "
                    to="/login"
                    onClick={logOut}
                    role="button"
                  >
                    Log Out
                  </Link>
                </div>
                <button
                  className={`btn btn-${bgColor} btn-sm m-2 `}
                  onClick={onclick}
                >
                  <i className={`fa-solid fa-${themeIcom}`}></i>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
