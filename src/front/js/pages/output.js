import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import logoImageUrl from "../../img/WordSword.png";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Output = () => {
  const { store, actions } = useContext(Context);

  //initiating navigate
  const navigate = useNavigate();

  const handleTextClick = (event) => {
    event.target.style.backgroundColor = "rgb(0,206,209)";
    actions.setNoteText(event.target.id);
  };

  const handleSave = (event) => {
    event.preventDefault();
    let title = prompt("Please enter a title for this document:");
    actions.saveText(title);
    navigate("/personalPortal");
  };

  return (
    <div className="container py-4 bg-light h-100 overflow-auto">
      <div className="d-flex justify-content-center">
        <h3 className="mb-3 display-6">
          WordSword's Result
        </h3>
      </div>
      <div className="mb-4">
        <h4>Key Terms</h4>
        <p className="text-muted">Significant words that appeared most frequently</p>
        <div className="container-fluid d-flex justify-content-start">
          {Object.keys(store.keyTerms).map(function (key, index) {
            return (
              <div className="m-auto" id={index}>
                <div className="text-center fw-bold">{key}</div>
                <div className="text-center text-muted">
                  {store.keyTerms[key]} times
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <h4>Condensed Text</h4>
      <p className="text-muted">
        The most important sentences as determined by our algorithm
      </p>
      <div>
        {store.displayText.map((item, index) => {
          return (
            <span
              className="flashyText text-dark"
              id={index}
              key={index}
              onClick={handleTextClick}
            >
              &emsp;{item}
              <br></br>
            </span>
          );
        })}
      </div>
      <br></br>
      <div className="bg-dark text-light">
        <h4>Your notes</h4>
        <p className="text-muted">Sentences you highlighted</p>
        <div>
          {store.notesText.map((item, index) => {
            return (
              <span className="flashyText text-light" id={index} key={index}>
                &emsp;{item}
                <br></br>
              </span>
            );
          })}
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="text-center">
        {
          //conditionally render if user  is verfied
          !store.verifiedUser ? (
            <p>
              Still don't have a WordSword account to save your work?{" "}
              <Link to="/create">Click here </Link>
              to get set up!
              <br></br>
              Need to login? <Link to="/login">Click here </Link>
            </p>
          ) : (
            <>
              <button onClick={handleSave} className="mb-3">
                Save Text To Personal Library
              </button>
            </>
          )
        }
      </div>
      {/* <div className="d-flex justify-content-center">
        <span>:Save Word Sword Text:</span>
        <span>:Save Highlighted Text:</span>
      </div> */}
    </div>
  );
};
