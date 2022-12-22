import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Home } from "./home";

export const PersonalPortal = (props) => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [currentTitle, setCurrentTitle] = useState(
    "Your Title Will Appear Here"
  );
  const [currentText, setCurrentText] = useState(
    "This is where you would see your previously --slashed-- documents"
  );

  useEffect(() => {
    !store.verifiedUser ? navigate("/login") : <></>;
  });

  const handleClick = (event) => {
  };

  return (
    <div className="user text-center h-100 py-5 align-middle">
      <h1>Hi {store.firstName}, Welcome to your personal WordSword Page!</h1>
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-3 container-fluid h-100 w-30">
            <h4 className="my-2">Here are your saved documents:</h4>
            {store.savedTitles.map((item, index) => {
              return (
                <div
                  className="text-dark m-1 pNav"
                  key={index}
                  onClick={handleClick()}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="col-9 container-fluid h-100 w-70">
            <div className="card w-100 h-100">
              <div className="card-body">
                <h5 className="card-title"> {currentTitle} </h5>
                <p className="card-text"> {currentText} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
