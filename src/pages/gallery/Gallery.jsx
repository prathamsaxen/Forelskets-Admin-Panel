import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import GalleryCard from "../../components/GalleryCard/GalleryCard";
import "./Gallery.scss";

function Gallery() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const status = await axios.get(
          `${process.env.REACT_APP_API}api/getgallery`
        );
        if (status.status === 200) {
          setData(status.data);
        }
      } catch (err) {
        console.log(err);
        toast.error("Error in Fetching Gallery");
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
          {data.map((item) => {
            return <GalleryCard data={item} key={item._id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
