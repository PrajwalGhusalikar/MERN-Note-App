import React from "react";
import { useLocation } from "react-router-dom";

const Alert = (props) => {
  let location = useLocation();
  return (
    <div style={{ height: "55px" }}>
      {!props.alert && (
        <h3 className="welcome p-2  text-end fs-5 ">
          {location.pathname !== "/" ? "" : <u className="text-info bg-dark p-2 rounded-2">{`Welcome ${props.welcomeUser.name}`}</u>}{" "}
        </h3>
      )}

      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>
            {props.alert.type === "danger" ? "Error" : props.alert.type}{" "}
          </strong>
          : {props.alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
