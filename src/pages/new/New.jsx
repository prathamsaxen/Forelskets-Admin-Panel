import { useState } from "react";
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { toast } from "react-toastify";
import axios from "axios";

const New = ({ title }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [formDisable, setFormDisable] = useState(false);

  const formFields = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "John",
    },
    {
      label: "Second Name",
      name: "lastName",
      type: "text",
      placeholder: "Doe",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "john@domain.com",
    },
    {
      label: "Mobile",
      name: "phoneNumber",
      type: "number",
      placeholder: "+91 80777 61461",
    },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];

  const validateForm = () => {
    if (!userData.firstName) {
      toast.error("First Name is required.");
      return false;
    }
    if (!userData.lastName) {
      toast.error("Last Name is required.");
      return false;
    }
    if (!userData.email) {
      toast.error("Email is required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      toast.error("Email address is invalid.");
      return false;
    }
    if (!userData.phoneNumber) {
      toast.error("Mobile number is required.");
      return false;
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(userData.phoneNumber)) {
      toast.error("Mobile number is invalid.");
      return false;
    }
    if (!userData.password) {
      toast.error("Password is required.");
      return false;
    }
    if (userData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    if (!userData.confirmPassword) {
      toast.error("Confirm Password is required.");
      return false;
    }
    if (userData.confirmPassword !== userData.password) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const registerUser = async (event) => {
    event.preventDefault();
    setFormDisable(true);

    if (validateForm()) {
      try {
        const postingData = {
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          password: userData.password,
          phoneNumber: userData.phoneNumber,
        };

        const status = await axios.post(
          `${process.env.REACT_APP_API}api/register`,
          postingData
        );

        if (status.status === 200) {
          toast.success("User Registered Successfully!");
          setUserData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          });
        }
      } catch (err) {
        setFormDisable(false);
        toast.error(err.response.data.message);
        console.error(err);
      }
    }

    setFormDisable(false);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={registerUser}>
              {formFields.map((field) => (
                <div className="formInput" key={field.name}>
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={userData[field.name]}
                    onChange={(e) =>
                      setUserData({ ...userData, [field.name]: e.target.value })
                    }
                    disabled={formDisable}
                  />
                </div>
              ))}
              <input type="submit" value="Register" disabled={formDisable} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
