import React from "react";
import { useLocation } from "react-router-dom";

const Alert = (props) => {
  let location = useLocation();
  return (
    <div style={{ height: "55px" }}>
      {!props.alert && (
        <h2 className="welcome p-3 text-warning text-end fs-4 ">
          {location.pathname !== "/" ? "" : `Welcome ${props.welcomeUser.name}`}{" "}
        </h2>
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
