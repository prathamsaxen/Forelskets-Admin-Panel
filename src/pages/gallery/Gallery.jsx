import React from "react";
import "./Gallery.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

function Gallery() {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1>Gallery</h1>
      </div>
    </div>
  );
}

export default Gallery;
