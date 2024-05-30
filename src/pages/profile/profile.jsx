import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import "./profile.scss";


function profile() {
  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
        <h2>Profile</h2>
    </div>
  </div>
  )
}

export default profile
