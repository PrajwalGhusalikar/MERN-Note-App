import React from "react";
import { useLocation } from "react-router-dom";

const Alert = (props) => {
  let location = useLocation();
  return (
    <div style={{ height: "55px" }}>
      {!props.alert && (
        <h3 className="welcome p-2  text-end fs-5 ">
          {location.pathname !== "/" ? (
            ""
          ) : (
            <div className="">
              <div className="d-none d-md-flex justify-content-between">
                <h2 className="text-center mx-3 ">
                  <u>MyNoteBook</u> : Manage All Your Notes at Once
                </h2>{" "}
                <span className="text-dark bg-info p-2 rounded-2">
                  Welcome{" "}
                  <u>
                    <b>{`${props.welcomeUser.name}`}</b>
                  </u>{" "}
                </span>
              </div>
              <span className="text-white  p-2 rounded-2 d-block d-md-none">
                Welcome{" "}
                <u>
                  <b>{`${props.welcomeUser.name}`}</b>
                </u>{" "}
              </span>
            </div>
          )}{" "}
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
