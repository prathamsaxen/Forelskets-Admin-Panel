import React from "react";
import "./GalleryCard.scss";

function GalleryCard({ data, deleteFunction }) {
  return (
    <div className="card" 
         style={{ width: "18rem" }} 
         key={data._id}>
      <img className="card-img-top" 
           src={data.image} 
           alt="Error in Loading" />
      <div className="card-body">
        <button
          onClick={() => deleteFunction(data._id)}
          className="btn btn-primary"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default GalleryCard;