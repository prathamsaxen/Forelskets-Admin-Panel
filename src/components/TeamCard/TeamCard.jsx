import React from "react";
import { NavLink } from "react-router-dom";
import "./TeamCard.scss";

function TeamCard({ data,deleteFunction }) {
  return (
    <div className="Teamcard">
      <div className="upperTeamCard">
        <div className="imageWrapper">
          <img src={data.photo} alt="Error" />
        </div>
      </div>
      <div className="lowerTeamCard">
        <h2>{data.name}</h2>
        <p>{data.profile}</p>
        <button onClick={()=>deleteFunction(data._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TeamCard;
