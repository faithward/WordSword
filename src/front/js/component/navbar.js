import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { element } from "prop-types";
import WordSwordnew from "../../img/WordSwordnew.png";
//I imported useNavigate

export const Navbar = () => {
  //we have to initiate useNavigate
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  //onClick handler for the signout button
  const handleSignout = (event) => {
    //resets store/token authentication and sends user home
    actions.signOut();

    //here useNavigate is used to go back to the home page
    //need to add pop up to confirm that user did sign out
    navigate("/");
  };

  return (
    // <div className="col-2">
    //   <nav className="navbar m-2 rounded">
    //     <ul className="nav navbar-nav">
    //       <li className="nav-item cutesiefy">
    //         <Link to="/" className="nav-link">
    //           Home
    //         </Link>
    //       </li>
    //       {
    //         //conditionally render based on if user is verified
    //         store.verifiedUser ? (
    //           <li className="nav-item cutesiefy big">
    //             <Link to="/user" className="nav-link">
    //               Personal Portal
    //             </Link>
    //           </li>
    //         ) : (
    //           <></>
    //         )
    //       }
    //       {
    //         //conditionally render based on if user is NOT verified
    //         !store.verifiedUser ? (
    //           <>
    //             <li className="nav-item cutesiefy">
    //               <Link to="/login" className="nav-link">
    //                 Login
    //               </Link>
    //             </li>
    //             <li className="nav-item cutesiefy big">
    //               <Link to="/create" className="nav-link">
    //                 Create account
    //               </Link>
    //             </li>
    //           </>
    //         ) : (
    //           <></>
    //         )
    //       }
    //       <li className="nav-item cutesiefy">
    //         <Link to="/about" className="nav-link">
    //           About Us
    //         </Link>
    //       </li>
    //       <li className="nav-item cutesiefy">
    //         <Link to="/donate" className="nav-link">
    //           Donate
    //         </Link>
    //       </li>
    //       {
    //         //conditionally render based on if user is verified
    //         store.verifiedUser ? (
    //           <li
    //             className="nav-item nav-link cutesiefy"
    //             onClick={handleSignout}
    //           >
    //             Sign Out
    //           </li>
    //         ) : (
    //           <></>
    //         )
    //       }
    //     </ul>
    //   </nav>
    // </div>
    // nav justify-content-center
    // <ul class="navbar navbar-expand-lg bg-light">
    //   <span class="navbar-text">WORDSWORD</span>
    //   <li class="nav-item">
    //     <Link class="nav-link" to="/">
    //       Home
    //     </Link>
    //   </li>
    //   <li class="nav-item">
    //     <Link class="nav-link" to="/login">
    //       Log in
    //     </Link>
    //   </li>
    //   <li class="nav-item">
    //     <Link class="nav-link" to="/create">
    //       Create account
    //     </Link>
    //   </li>
    //   <li class="nav-item">
    //     <Link class="nav-link" to="/about">
    //       Aboiut us
    //     </Link>
    //   </li>
    //   <li class="nav-item">
    //     <Link class="nav-link" to="/donate">
    //       Donate
    //     </Link>
    //   </li>
    // </ul>

    <nav
      className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top shadow-lg"
      // style={{ textColor: "white" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ marginLeft: "2%" }}>
          <img className="thumbnail" src={WordSwordnew}></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse text-white container-fluid justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/output">
                Output
              </Link>
            </li> */}
            {
              //conditionally render based on if user is NOT verified
              !store.verifiedUser ? (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create" className="nav-link">
                      Join
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )
            }
            {
              //conditionally render based on if user is verified
              store.verifiedUser ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/personalPortal">
                    Personal Portal
                  </Link>
                </li>
              ) : (
                <></>
              )
            }
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donate">
                Donate
              </Link>
            </li>
            {
              //conditionally render based on if user is verified
              store.verifiedUser ? (
                <li className="nav-item" onClick={handleSignout}>
                  <Link className="nav-link" to="/">
                    Sign Out
                  </Link>
                </li>
              ) : (
                <></>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};
