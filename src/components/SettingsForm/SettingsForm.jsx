import React, { useState } from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import "./SettingsForm.scss";

function SettingsForm() {
  return (
    <div className="SettingsForm">
      <div className="imageWrapper">
        <img
          src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
      </div>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formCompanyMail">
            <Form.Label>Company Mail Account</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter company email"
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formCompanyPhoneNumber">
            <Form.Label>Company Phone Number</Form.Label>
            <Form.Control
              required
              type="tel"
              placeholder="Enter company phone number"
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
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formGoogleMapLocation">
            <Form.Label>Google Map Location</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Google Map location"
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
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formTwitterURL">
            <Form.Label>Twitter URL</Form.Label>
            <Form.Control
              required
              type="url"
              placeholder="Enter Twitter URL"
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
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formPinterestURL">
            <Form.Label>Pinterest URL</Form.Label>
            <Form.Control
              required
              type="url"
              placeholder="Enter Pinterest URL"
            />
          </Form.Group>
        </Row>
        <Button type="submit" className="btn-form-submit-settings">Submit form</Button>
      </Form>
    </div>
  );
}

export default SettingsForm;
