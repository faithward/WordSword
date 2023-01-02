import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import logoImageUrl from "../../img/WordSwordnew.png";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

//const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

const axios = require("axios");
//var formidable = require('formidable');
//var fs = require('fs');

export const Home = () => {
  const { store, actions } = useContext(Context);

  //variable for the text box that the user pastes in for our algorithm
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);


  //initiating navigate
  const navigate = useNavigate();

  const handleSplice = (event) => {
    event.preventDefault();
    actions.handlePaste(text);
    //console.log(store.textArray);
    actions.findKeyTerms();
    actions.displayKeyTerms();
    actions.sliceText();
    actions.readDisplay();
    //window.location.href="/output"
    navigate("/output");
  };

  //below is code specifically for handling file inputs after they have been read as text
  //does not need event prevent default, needs to receive text
  const handleFileSplice = (newFile) => {
    actions.handlePaste(newFile);
    //console.log(store.textArray);
    actions.findKeyTerms();
    actions.displayKeyTerms();
    actions.sliceText();
    actions.readDisplay();
    //window.location.href="/output"
    navigate("/output");
  };

  const handlePDFdata = (newFile) => {
    actions.handlePDF(newFile);
  };

  //creates a new FileReader() tool, says that when reader is called, it will also call handleFileSplice on its results
  const txtRead = (event) => {
    let reader = new FileReader();
    reader.onload = function () {
      handleFileSplice(reader.result);
    };
    reader.readAsText(event.target.files[0]); //e.target.files[0] contains the file no matter the format
    //here is where reader is called, so after it reads the file in as text it calls the function on the result
  };

  const pdfRead = (event) => {
    //actions.handlePDF(formData)
    let reader = new FileReader();
    reader.onload = function () {
      handleFileSplice(reader.result);
    };
    reader.readAsBinaryString(event.target.files[0]);
  };

  return (
    <div className="home text-center">
      <div className="mainpage logo bg-light" style={{ marginBottom: 25 }}>
        <br></br>
        <img src={logoImageUrl} className="homeLogo" />
        <br></br>
        <br></br>
        <h5>
          Reading through a lot of text can be <b>HARD!</b>
        </h5>
        <div className="width60">
          <div className="divider" />
        </div>
        <div className="w-50 container-fluid text-center pt-2">
          <h6 className="para">
            {" "}
            That's why WordSword takes long documents and runs them through our
            algorithm to isolate the most important parts and convert them into
            a more concise form!
          </h6>
        </div>
        <br></br>
      </div>
      {/* <div className="divider">
          <div className="minfo"></div>
          <div className="forminfo"></div>
        </div>
      <div className="backcolor"></div> */}
      <h5 className="text-secondary">Let's start below!</h5>
      {!store.verifiedUser ? (
        <h6>
          Still don't have a WordSword account to save your work?{" "}
          <Link to="/create">Click here </Link>
          to get set up!
        </h6>
      ) : (
        <></>
      )}
      <br></br>
      <p>You can use the text from <a href="https://github.com/faithward/WordSword/blob/1b439eaa5676ef1bfe94b47e963c451c1ffe2875/docs/promise.txt#L1">this file</a> to test it out!</p>
      <br></br>
      <h6>WordSword can accept .txt files</h6>
      <div className="form" type="form">
        {/* <div className="form button" style={{ marginBottom: 20 }}> */}
        <label htmlFor="inputFile">Click here:</label>
        <input
          type="file"
          className="m-1 justify-text-center"
          id="inputFile"
          name="inputFile"
          accept=".txt, .pdf"
          onChange={(e) => {
            if (e.target.files[0].type == "text/plain") {
              txtRead(e);
            } else if (e.target.files[0].type == "application/pdf") {
              //here we pass to API to convert to text
              //we will pass that text into handleFileSplice
              console.log("Took in pdf");
              handlePDFdata(e.target.files[0]);
            }
          }}
        ></input>
      </div>
      <br></br>
      <label htmlFor="typedInput">
        <h6>Or you can copy and paste here:</h6>
      </label>
      {/* </div> */}

      <textarea
        className="form-control w-50 mx-auto py-3 shadow-lg"
        name="typedInput"
        rows="10"
        cols="60"
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <input
        className="button-submit btn btn-dark mt-2 mb-5"
        type="submit"
        value="Slice Text"
        onClick={handleSplice}
      ></input>
    </div>
  );
};

// bg-light
