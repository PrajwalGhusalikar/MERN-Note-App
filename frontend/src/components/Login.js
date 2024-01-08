import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";

const Login = (props) => {
  let [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("https://noteapp2-b4en.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      //redirect to home
      localStorage.setItem("token", json.jwtToken);
   
      props.showAlert("Login Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  let onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1 className="mb-4"><u>Login to Continue</u></h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text" style={{backgroundColor:" #d9d9d9"}}>
                <i className="fa-solid fa-envelope" style={{height: "24px"}}></i>
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
              <div className="input-group-text" style={{backgroundColor:" #d9d9d9"}}>
                <i className="fa-solid fa-lock" style={{height: "24px"}}></i>
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div className="container my-3">
        <h4>Or Create New Account by
          <Link to="/signup"> <u>Signup</u></Link></h4>
        </div>
    </div>
  );
};

export default Login;
