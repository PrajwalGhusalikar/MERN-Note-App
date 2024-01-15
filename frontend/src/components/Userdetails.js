import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Userdetails = (props) => {
  let location = useLocation();
  let users = "";
  let [user, setUser] = useState(users);
  useEffect(
    () => {
      fetchUser();
    },
    // eslint-disable-next-line
    []
  );

  const fetchUser = async () => {
    const response = await fetch(
      `https://noteapp2-b4en.onrender.com/auth/getuser`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // later change to jwtToken
        },
      }
    );
    users = await response.json();
    setUser(users);
  };
  if (!(location.pathname === "/login" || location.pathname === "/signup")) {
    props.setWelcomeUser(user);
  } else {
    props.setWelcomeUser("");
  }
  // console.log("user", user);

  return (
    <div>
      <button
        className="btn btn-secondary btn-sm"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        <i className="fa-solid fa-user"></i>
      </button>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <div className="offcanvas-title d-flex" id="offcanvasScrollingLabel">
            <i className="fa-solid fa-user text-dark mt-1"></i>
            <h4 className="text-dark mx-2">Account</h4>
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body bg-dark">
          <h1 className="text-warning">Welcome {user.name}</h1>
          <h3>Email: {user.email}</h3>
        </div>
      </div>
    </div>
  );
};

export default Userdetails;
