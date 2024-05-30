import React, { useState } from "react";
import "./ContactAccordion.scss";

function ContactAccordion({data}) {
    const[visible,setVisible]=useState(false);
  return (
    <div className="card">
      <div className="cardHeader">
        <h2>
          {data.name}
        </h2>
        <p>
          {data.email}
        </p>
      </div>
    </div>
  );
}

export default ContactAccordion;
