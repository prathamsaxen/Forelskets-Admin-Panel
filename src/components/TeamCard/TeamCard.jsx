import React from 'react';
import { NavLink } from 'react-router-dom';

function TeamCard({data}) {
  return (
    <div className="card" style={{width: "18rem"}}>
        <img className="card-img-top" src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="Card image cap"/>
        <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text">{data.profile}</p>
            <NavLink to={"/"} className="btn btn-primary">Go somewhere</NavLink>
        </div>
    </div>
  )
}

export default TeamCard;
