import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Footer } from "../component/footer";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  function resolveAfter1Second() {
    return new Promise((resolve) => {
      setTimeout(() => {
        !store.verifiedUser ? navigate("/login") : navigate("/personalPortal");
      }, 1000);
    });
  }

  async function navigateLogin() {
    const slow = await resolveAfter1Second();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.getToken(userEmail, userPassword);
    navigateLogin();
  };

  return (
    <div
      className="container-fluid text-center align-items-center w-75"
      style={{ marginLeft: "12%", marginTop: "4%" }}
    >
      <br></br>
      <h1>Welcome Back!</h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-outline w-50" style={{ margin: "auto" }}>
          <label htmlFor="InputEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="InputEmail"
            aria-describedby="emailHelp"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="form-outline w-50" style={{ margin: "auto" }}>
          <label htmlFor="InputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="InputPassword"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};
