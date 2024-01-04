import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
let btnValid = false;
const SignUp = (props) => {
  let [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/createuser", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.username,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      //redirect to home

      localStorage.setItem("token", json.jwtToken);
      props.showAlert("SignUp Successfully", "success");
      navigate("/");
    } else {
      let errMsg = json.errors[0].msg;
      props.showAlert(errMsg, "danger");
    }
  }

  let onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  let { password, cpassword } = credentials;
  if (cpassword === password) {
    btnValid = true;
  } else {
    btnValid = false;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">@</div>
              </div>
              <input
                type="text"
                className="form-control"
                id="inlineFormInputGroupUsername"
                placeholder="Username"
                name="username"
                onChange={onChange}
                value={credentials.username}
                minLength={5}
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa-solid fa-envelope"></i>
              </div>
            </div>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={credentials.email}
              name="email"
              minLength={5}
              required
            />{" "}
          </div>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa-solid fa-lock"></i>
              </div>
            </div>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={onChange}
              value={credentials.password}
              name="password"
              minLength={5}
              required
            />{" "}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa-solid fa-key"></i>
              </div>
            </div>
            <input
              type="password"
              className="form-control"
              id="exampleInputcPassword1"
              onChange={onChange}
              value={credentials.cpassword}
              name="cpassword"
              minLength={5}
              required
            />{" "}
          </div>
        </div>
        <button
          type="submit"
          className={`btn btn-primary ${btnValid ? "enabled" : "disabled"}`}
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
