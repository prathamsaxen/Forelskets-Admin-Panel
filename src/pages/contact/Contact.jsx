import React, { useState, useEffect } from "react";
import "./Contact.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ContactAccordion from "../../components/ContactAccordion/ContactAccordion";
import axios from "axios";

function Contact() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      try {
        const status = await axios.get(
          `${process.env.REACT_APP_API}api/getcontact`
        );
        if (status.status === 200) {
          setData(status.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getContacts();
  },[]);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="ContactWrapper">
          {data.map((item, index) => {
            return <ContactAccordion data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Contact;
