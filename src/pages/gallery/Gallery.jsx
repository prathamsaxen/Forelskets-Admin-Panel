import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import GalleryCard from "../../components/GalleryCard/GalleryCard";
import "./Gallery.scss";

function Gallery() {
  const [data, setData] = useState([]);
  const getGallery = async () => {
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
  useEffect(() => {
    getGallery();
  }, []);

  const DeleteGalleryImage=async (id)=>{
    try{
        const status=axios.delete(`${process.env.REACT_APP_API}api/deleteGallery/${id}`);
        if(status.status === 200) {
          toast.success("Image Removed!");
          console.log("Deleted");
          getGallery();
        }
    }
    catch (err) {
      toast.error("Error in Deleting Image");
      console.log(err);
    }
  }
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="galleryWrapper">
          {data.map((item) => {
            return <GalleryCard data={item} deleteFunction={DeleteGalleryImage} key={item._id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
