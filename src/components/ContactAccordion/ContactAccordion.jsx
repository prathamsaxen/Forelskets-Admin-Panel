import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import "./ContactAccordion.scss";

function ContactAccordion({ data }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="cardAccordion">
      <div className="cardHeaderAccordion" onClick={() => setVisible(!visible)}>
        <h2>{data.name}</h2>
        <p>{data.email}</p>
      </div>
      <Collapse in={visible}>
        <div>
        <div className="upperAccordion">
          <h2>{data.createdAt}</h2>
          <p>{data.mobile}</p>
        </div>
          <p className="paraAccordion">{data.message}</p>
        </div>
      </Collapse>
    </div>
  );
}

export default ContactAccordion;
