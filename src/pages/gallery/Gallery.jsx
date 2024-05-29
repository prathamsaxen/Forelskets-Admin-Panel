import React, { useState, useEffect } from "react";
import "./Gallery.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import GalleryCard from "../../components/GalleryCard/GalleryCard";
import axios from "axios";

function Gallery() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const status = await axios.get(
          `${process.env.REACT_APP_API}api/getgallery`
        );
        if (status.status === 200) {
          // console.log(status.data);
          setData(status.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="galleryWrapper">
          {data.map((item, index) => {
            return <GalleryCard data={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Gallery;