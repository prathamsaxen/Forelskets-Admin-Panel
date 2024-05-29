import React from 'react';
import "./Contact.scss";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

function Contact() {
  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
      <h1>Contact</h1>
    </div>
  </div>
  )
}

export default Contact
