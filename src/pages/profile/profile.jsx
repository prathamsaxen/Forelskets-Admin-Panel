import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./profile.scss";

const Profile = () => {
  const [userData, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [formDisable, setFormDisable] = useState(true);
  const [value, setValue] = useState("Edit");

  const formFields = [
    { label: "First Name", name: "firstName", type: "text", placeholder: "John" },
    { label: "Last Name", name: "lastName", type: "text", placeholder: "Doe" },
    { label: "Email", name: "email", type: "email", placeholder: "john@domain.com" },
    { label: "Mobile", name: "phoneNumber", type: "number", placeholder: "+91 80777 61461" },
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
    return true;
  };

  const updateUser = async () => {
    if (validateForm()) {
      const id = JSON.parse(localStorage.getItem("user")).id;
      const postingData = {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      };
      try {
        const status = await axios.put(
          `${process.env.REACT_APP_API}api/user/${id}`,
          postingData
        );
        if (status.status === 200) {
          toast.success("User Updated Successfully!");
          setValue("Edit");
          getUserDetail();
        }
      } catch (err) {
        toast.error(err.response.data.message);
        console.error(err);
      }
    } else {
      setValue("Update");
    }
  };

  const editUser = async (event) => {
    event.preventDefault();
    if (value === "Edit") {
      setFormDisable(false);
      setValue("Update");
    } else {
      setFormDisable(true);
      updateUser();
    }
  };

  const getUserDetail = async () => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    try {
      const status = await axios.get(
        `${process.env.REACT_APP_API}api/user/${id}`
      );
      if (status.status === 200) {
        setData({
          firstName: status.data.name.split(" ")[0],
          lastName: status.data.name.split(" ")[1],
          email: status.data.email,
          phoneNumber: status.data.phoneNumber,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Profile</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {formFields.map((field) => (
                <div className="formInput" key={field.name}>
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={userData[field.name]}
                    onChange={(e) =>
                      setData({ ...userData, [field.name]: e.target.value })
                    }
                    disabled={formDisable}
                  />
                </div>
              ))}
              <button onClick={editUser}>{value}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;