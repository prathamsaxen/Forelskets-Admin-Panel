import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./SettingsForm.scss";

function SettingsForm() {
  const [data, setData] = useState({
    address: "",
    googleMapLocation: "",
    instagram: "",
    linkedin: "",
    logo: "url------",
    pinterest: "",
    professionalMail: "",
    professionalPhoneNumber: null,
    twitter: "",
  });
  const getSettings = async () => {
    try {
      const status = await axios.get(
        `${process.env.REACT_APP_API}api/getSetting`
      );
      if (status.status === 200) {
        console.log("Seccuess!");
        setData(status.data[0]);
      }
    } catch (err) {
      toast.error("Error in fetching settings!");
      console.log(err);
    }
  };
  useEffect(() => {
    getSettings();
  }, []);
  return (
    <div className="SettingsForm">
      <Form>
        <div className="imageWrapper">
          <img
            src={data.logo}
            alt=""
          />
        </div>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formCompanyMail">
            <Form.Label>Company Mail Account</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter company email"
              value={data.professionalMail}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formCompanyPhoneNumber">
            <Form.Label>Company Phone Number</Form.Label>
            <Form.Control
              required
              type="tel"
              placeholder="Enter company phone number"
              value={data.professionalPhoneNumber}
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
              value={data.address}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formGoogleMapLocation">
            <Form.Label>Google Map Location</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Google Map location"
              value={data.googleMapLocation}
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
              value={data.instagram}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formTwitterURL">
            <Form.Label>Twitter URL</Form.Label>
            <Form.Control
              required
              type="url"
              placeholder="Enter Twitter URL"
              value={data.twitter}
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
              value={data.linkedin}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formPinterestURL">
            <Form.Label>Pinterest URL</Form.Label>
            <Form.Control
              required
              type="url"
              placeholder="Enter Pinterest URL"
              value={data.pinterest}
            />
          </Form.Group>
        </Row>
        <Button type="submit" className="btn-form-submit-settings">
          Submit form
        </Button>
      </Form>
    </div>
  );
}

export default SettingsForm;
