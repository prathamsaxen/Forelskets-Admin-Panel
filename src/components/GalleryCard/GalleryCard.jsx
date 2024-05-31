import React from "react";
import { NavLink } from "react-router-dom";
import "./GalleryCard.scss";

function GalleryCard({ data }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={data.image}
        alt="Card image cap"
      />
      <div className="card-body">
        <NavLink to={"/"} className="btn btn-primary">
          Delete
        </NavLink>
      </div>
    </div>
  );
}

export default GalleryCard;
