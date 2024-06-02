import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Form, Button } from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TeamCard from "../../components/TeamCard/TeamCard";
import "./Team.scss";

function Team() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    profile: "",
  });

  const formFields = [
    { label: "Name", name: "name", type: "text", placeholder: "Enter name" },
    { label: "Profile", name: "profile", type: "text", placeholder: "Enter profile" },
  ];

  const getUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}api/getteam`);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err) {
      console.error("Error fetching team data:", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const formValidation = () => {
    if (!image) {
      toast.error("Select an Image to upload!");
      return false;
    } else if (formValues.name.trim() === "") {
      toast.error("Please enter the name of the member");
      return false;
    } else if (formValues.profile.trim() === "") {
      toast.error("Please enter the profile of the member!");
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
    if (!show) {
      setImage(null);
      setFormValues({ name: "", profile: "" });
    }
  };

  const addTeamMember = async () => {
    if (formValidation()) {
      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("image", image);
      formData.append("profile", formValues.profile);

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
          setImage(null);
          setFormValues({ name: "", profile: "" });
          setShow(false);
          getUsers();
        }
      } catch (err) {
        toast.error("Error in Adding Member");
        console.error("Error adding team member:", err);
      }
    }
  };

  const deleteTeamMember = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API}api/deleteTeam/${id}`
      );
      if (response.status === 200) {
        toast.success("Removed Team Member!");
        getUsers();
      }
    } catch (err) {
      toast.error("Error in Deleting Team Member");
      console.error("Error deleting team member:", err);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Modal show={show} onHide={handleModal}>
          <Modal.Header closeButton>
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
              {formFields.map((field) => (
                <Form.Group controlId={field.name} className="my-3" key={field.name}>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formValues[field.name]}
                    onChange={(e) =>
                      setFormValues({ ...formValues, [field.name]: e.target.value })
                    }
                  />
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={addTeamMember}
              disabled={!image || formValues.name.trim() === "" || formValues.profile.trim() === ""}
            >
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
          {data.map((item) => (
            <TeamCard
              data={item}
              key={item._id}
              deleteFunction={deleteTeamMember}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
