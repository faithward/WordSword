import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import FaithWard from "../../img/FaithWard.jpg";
import JaneshkaFolch from "../../img/JaneshkaFolch.jpg";
import WilliamRivas from "../../img/WilliamRivas.jpg";

export const About = () => {
  const { store, actions } = useContext(Context);
  return (
    <div
      className="text-center w-75"
      style={{ marginLeft: "12%", marginTop: "5%" }}
    >
      <h1>About Us</h1>
      <div className="width80">
        <div className="divider" />
      </div>
      <br></br>
      <p>
        WordSword was born from a need to read. The idea for this project came out of frustration
        with long reading assignments and inaccessibility in higher education.
        Our team formed at 4Geeks Academy in 2022, where each of us
        came from a different background with a unique skillset. 
        We set out to make WordSword a tool that anyone can use to make reading feel less intimidating.
        Whether you have homework you don't want to tackle or long work documents to get through,
        we've been in your shoes. We've worked hard to make an application that can ease your burden, so
        we hope you enjoy using WordSword just as much as we enjoyed creating it for
        you!
      </p>
      <div
        className="row row-cols-1 row-cols-md-3 g-4"
        style={{ marginTop: "3%" }}
      >
        <div className="col" style={{ marginBottom: "10%" }}>
          <div className="card h-100 shadow-lg">
            <img src={FaithWard} className="card-img-top" alt=""></img>
            <div className="card-body rounded-3">
              <h5 className="card-title">Faith Ward</h5>
              <div className="width80">
                <div className="divider" />
              </div>
              <br></br>
              <p className="card-text">
                Full stack developer, QA, and algorithm afficionado from South Florida. 
                Oberlin College '22.
              </p>
              <a
                className="btn btn-outline-primary"
                href="https://www.linkedin.com/in/faithwardtech/"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col" style={{ marginBottom: "10%" }}>
          <div className="card h-100 shadow-lg">
            <img src={WilliamRivas} className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">William Rivas</h5>
              <div className="width80">
                <div className="divider" />
              </div>
              <br></br>
              <p className="card-text">
                Full stack developer with years of database experience. The most
                technical debugger.
              </p>
              <a
                className="btn btn-outline-primary"
                href="https://www.linkedin.com/in/williamarivas/"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col" style={{ marginBottom: "10%" }}>
          <div className="card h-100 shadow-lg">
            <img src={JaneshkaFolch} className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Janeshka Folch</h5>
              <div className="width80">
                <div className="divider" />
              </div>
              <br></br>
              <p className="card-text">
                Full stack software developer. Enjoys creating, designing, and
                putting together pretty and user-friendly websites!{" "}
              </p>
              <a
                className="btn btn-outline-primary"
                href="https://www.linkedin.com/in/janeshka-folch-37a77b1b5/"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
