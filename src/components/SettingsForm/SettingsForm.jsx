import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./SettingsForm.scss";

function SettingsForm() {
  const [data, setData] = useState({
    address: "",
    googleMapLocation: "",
    instagram: "",
    linkedin: "",
    logo: "",
    pinterest: "",
    professionalMail: "",
    professionalPhoneNumber: "",
    twitter: "",
  });
  const [dataEdit, setDataEdit] = useState(true);

  const getSettings = async () => {
    console.log(data);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}api/getSetting/uniqueIdentifier`
      );
      if (response.status === 200) {
        // console.log(response.data);
        setData(response.data);
      }
    } catch (err) {
      toast.error("Error in fetching settings!");
      console.log(err);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  const updateSettings = async (event) => {
    event.preventDefault();
    if (dataEdit) {
      setDataEdit(false);
    } else {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API}api/setting`,
          {
            ...data,
            identifier: "uniqueIdentifier",
          }
        );
        if (response.status === 200) {
          toast.success("Settings Updated Successfully!");
        }
      } catch (err) {
        toast.error("Error in updating settings!");
        console.error(err);
      }
      setDataEdit(true);
      getSettings();
    }
  };

  return (
    <div className="SettingsForm">
      <Form onSubmit={updateSettings}>
        <div className="imageWrapper">
          <img src={data?.logo} alt="Error in Loading" />
        </div>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formCompanyMail">
            <Form.Label>Company Mail Account</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter company email"
              value={data?.professionalMail}
              disabled={dataEdit}
              onChange={(e) =>
                setData({ ...data, professionalMail: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formCompanyPhoneNumber">
            <Form.Label>Company Phone Number</Form.Label>
            <Form.Control
              required
              type="tel"
              placeholder="Enter company phone number"
              value={data?.professionalPhoneNumber}
              disabled={dataEdit}
              onChange={(e) =>
                setData({ ...data, professionalPhoneNumber: e.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formCompanyAddress">
            <Form.Label>Company Address</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter company address"
              value={data?.address}
              disabled={dataEdit}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formGoogleMapLocation">
            <Form.Label>Google Map Location</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Google Map location"
              value={data?.googleMapLocation}
              disabled={dataEdit}
              onChange={(e) =>
                setData({ ...data, googleMapLocation: e.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formInstagramURL">
            <Form.Label>Instagram URL</Form.Label>
            <Form.Control
              required
              type="url"
              placeholder="Enter Instagram URL"
              value={data?.instagram}
              disabled={dataEdit}
              onChange={(e) => setData({ ...data, instagram: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formTwitterURL">
            <Form.Label>Twitter URL</Form.Label>
            <Form.Control
              required
              type="url"
              placeholder="Enter Twitter URL"
              value={data?.twitter}
              disabled={dataEdit}
              onChange={(e) => setData({ ...data, twitter: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formLinkedInURL">
            <Form.Label>LinkedIn URL</Form.Label>
            <Form.Control
              required
              type="url"
              placeholder="Enter LinkedIn URL"
              value={data?.linkedin}
              disabled={dataEdit}
              onChange={(e) => setData({ ...data, linkedin: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formPinterestURL">
            <Form.Label>Pinterest URL</Form.Label>
            <Form.Control
              required
              type="url"
              placeholder="Enter Pinterest URL"
              value={data?.pinterest}
              disabled={dataEdit}
              onChange={(e) => setData({ ...data, pinterest: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Button type="submit" className="btn-form-submit-settings">
          {dataEdit ? "Edit" : "Update Settings"}
        </Button>
      </Form>
    </div>
  );
}

export default SettingsForm;
