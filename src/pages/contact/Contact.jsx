import React from 'react';
import "./Contact.scss";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import ContactAccordion from '../../components/ContactAccordion/ContactAccordion';

function Contact() {
  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
      <div className='ContactWrapper'>
        <ContactAccordion/>
      </div>
    </div>
  </div>
  )
}

export default Contact
