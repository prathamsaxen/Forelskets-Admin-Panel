import React, { useState } from "react";


function ContactAccordion({data}) {
    const[visible,setVisible]=useState(false);
  return (
    <div className="card">
      <div className="card-header" id="headingOne">
        <h5 className="mb-0">
          <button
            className="btn btn-link"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
            onClick={()=>setVisible(!visible)}
          >
            {data.name}
          </button>
        </h5>
      </div>

      {visible? <div
        id="collapseOne"
        className="collapse show"
        aria-labelledby="headingOne"
        data-parent="#accordion"
      >
        <div className="card-body">
          {data.message}
        </div>
      </div>:null }
    </div>
  );
}

export default ContactAccordion;
