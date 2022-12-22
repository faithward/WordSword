import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Donate = () => {
  const { store, actions } = useContext(Context);
  return (
    <div
      className="donate w-75 text-center"
      style={{ marginLeft: "12%", marginTop: "5%" }}
    >
      <br></br>
      <h1 className="mb-6">Donate</h1>
      <div className="width80">
        <div className="divider" />
      </div>
      <br></br>
      <div className="container-donate mt-4">
        <div className="col">
          <h5>
            Enjoying WordSword? To support the work of our developers and help
            keep this program free, please consider donating!
          </h5>
          <p>We accept PayPal and most major card companies.</p>
        </div>
      </div>
      <p
        className="select-donate"
        style={{ marginTop: "5%", marginBottom: "3%" }}
      >
        <b>Select donation amount below</b>
      </p>
      <div className="row row-cols-lg-5">
        <div className="col">
          <button
            type="button"
            class="btn btn-outline-success btn-rounded px-4"
            data-mdb-ripple-color="dark"
          >
            $5
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            class="btn btn-outline-success btn-rounded px-4"
            data-mdb-ripple-color="dark"
          >
            $15
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            class="btn btn-outline-success btn-rounded px-4"
            data-mdb-ripple-color="dark"
          >
            $25
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            class="btn btn-outline-success btn-rounded px-4"
            data-mdb-ripple-color="dark"
          >
            $50
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            class="btn btn-outline-success btn-rounded px-4"
            data-mdb-ripple-color="dark"
          >
            $100
          </button>
        </div>
      </div>
    </div>
  );
};

// row-cols-2
// g-2
