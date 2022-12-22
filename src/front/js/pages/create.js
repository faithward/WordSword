import React, { useContext, useState, useSyncExternalStore } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import getState from "../store/flux";

/*
create models to store user info and user documents
connect models to api
connect flux functions to the api
create input forms and connect them to the flux functions that are connected to the api
*/
export const Create = () => {
  const { store, actions } = useContext(Context);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  //initiating navigate
  const navigate = useNavigate();

  //this function handling the onclick event when the user submits username and password to create an account
  const handleSubmit = (event) => {
    //need this to stop other behavior
    event.preventDefault();

    //createUser function in Flux, we need to write code
    //to double check data integretity before sending to the flux function
    //for it to be safer
    actions.createUser(fName, lName, email, password);

    //send the new user to test their login/login for the first time
    navigate("/login");
  };

  return (
    <div
      className="create w-75 text-center"
      style={{ marginLeft: "12%", marginTop: "2%" }}
    >
      <br></br>
      <br></br>
      <h1>Join WordSword!</h1>
      <div className="width80">
        <div className="divider" />
      </div>
      <br></br>
      <div className="form w-50" style={{ margin: "auto" }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="mail">First Name: &nbsp;&nbsp;</label>
          <input
            type="text"
            className="form-control"
            id="fName"
            name="fName"
            value={fName}
            placeholder="John/Jane"
            onChange={(event) => setFName(event.currentTarget.value)}
          ></input>
          <br></br>
          <label className="createLabels">Last Name: &nbsp;&nbsp;</label>
          <input
            type="text"
            className="form-control"
            id="lName"
            name="lName"
            value={lName}
            placeholder="Doe"
            onChange={(event) => setLName(event.currentTarget.value)}
          ></input>
          <br></br>
          <label className="createLabels">Email: &nbsp;&nbsp;</label>
          <input
            type="email"
            className="form-control"
            id="mail"
            name="mail"
            value={email}
            placeholder="email@email.com"
            onChange={(event) => setEmail(event.currentTarget.value)}
          ></input>
          <br></br>
          <label className="createLabels">Password: &nbsp;&nbsp;</label>
          <input
            type="password"
            className="form-control"
            id="pass"
            name="pass"
            minLength="8"
            placeholder="*********"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          ></input>
          <br></br>
          <div className="btn">
            <button className="btn btn-success mb-5" type="submit">
              Submit
            </button>
          </div>
          {/* <input type="submit" value="Submit"></input> */}
        </form>
      </div>
      <div className="circle7"></div>
      <div className="circle8"></div>
      <div className="circle9"></div>
      <div className="circle10"></div>
      <div className="circle11"></div>
      <div className="circle12"></div>
    </div>
  );
};
