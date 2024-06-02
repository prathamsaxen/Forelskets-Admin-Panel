import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TeamCard from "../../components/TeamCard/TeamCard";
import { Modal, Form, Button } from "react-bootstrap";
import "./Team.scss";

function Team() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");

  const getUsers = async () => {
    try {
      const status = await axios.get(`${process.env.REACT_APP_API}api/getteam`);
      if (status.status === 200) {
        setData(status.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const formValidation = () => {
    if (!image) {
      toast.error("Select a Image to upload!");
      return false;
    } else if (name.trim() == "") {
      toast.error("Please enter the name of member");
      return false;
    } else if (profile.trim() == "") {
      toast.error("Please enter the profile of member!");
      return false;
    }
    return true;
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleModal = () => {
    setShow(!show);
    setImage(null);
  };

  const AddTeamMember = async () => {
    if (formValidation()) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("profile", profile);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}api/addTeam`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          toast.success("Member Added!");
          setImage(false);
          setShow(false);
          getGallery();
        }
      } catch (err) {
        toast.error("Error in Adding Member");
        console.log(err);
      }
    }
  };
  const DeleteTeamMember = async (id) => {
    try {
      const status = await axios.delete(
        `${process.env.REACT_APP_API}api/deleteTeam/${id}`
      );
      if (status.status === 200) {
        console.log("Deleted Team Member");
        toast.success("Removed Team Member!");
        getUsers();
      }
    } catch (err) {
      toast.error("Error in Deleting Team Member");
      console.log(err);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Add Team Member</Modal.Title>
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
              <Form.Group controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Form.Group>
              <Form.Group controlId="profile" className="my-3">
                <Form.Label>Profile</Form.Label>
                <Form.Control
                  type="text"
                  rows={3}
                  placeholder="Enter profile"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModal}>
              Close
            </Button>
            <Button variant="primary" onClick={AddTeamMember} disabled={!image}>
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="datatableTitle">
          <Button onClick={handleModal} className="link">
            Add New Team Member
          </Button>
        </div>
        <div className="teamWrapper">
          {data.map((item, index) => {
            return (
              <TeamCard
                data={item}
                key={item._id}
                deleteFunction={DeleteTeamMember}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Team;
