import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import GalleryCard from "../../components/GalleryCard/GalleryCard";
import { Modal, Form, Button } from "react-bootstrap";
import "./Gallery.scss";
// import { Link } from "react-router-dom";

function Gallery() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(false);
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

  const DeleteGalleryImage = async (id) => {
    try {
      const status = await axios.delete(
        `${process.env.REACT_APP_API}api/deleteGallery/${id}`
      );
      if (status.status === 200) {
        console.log("Deleted");
        toast.success("Image Removed!");
        getGallery();
      }
    } catch (err) {
      toast.error("Error in Deleting Image");
      console.log(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleModal = () => {
    setShow(!show);
    setImage(false);
  };

  const handleUpload = async () => {
    if (image) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}postimage`,
          image,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          toast.success("Image Uploaded!");
          setImage(false);
          setShow(false);
          getGallery();
        }
      } catch (err) {
        toast.error("Error in Uploading Image");
        console.log(err);
      }
    } else {
      toast.error("Please select an image to upload");
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Add Gallery Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile">
              <Form.Label>Choose an image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload} disabled={!image}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="homeContainer">
        <Navbar />
        <div className="datatableTitle">
          <Button onClick={handleModal}>Add New Gallery Image</Button>
        </div>
        <div className="galleryWrapper">
          {data.map((item) => {
            return (
              <GalleryCard
                data={item}
                deleteFunction={DeleteGalleryImage}
                key={item._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
