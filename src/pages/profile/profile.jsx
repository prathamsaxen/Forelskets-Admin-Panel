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

  const UpdateUser = async () => {
    if (validateForm()) {
      const id = JSON.parse(localStorage.getItem("user")).id;
      console.log(id);
      const postingData = {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: userData.password,
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
        console.log(err);
      }
    } else {
      setValue("Update");
    }
  };

  const EditUser = async (event) => {
    event.preventDefault();
    if (value === "Edit") {
      setFormDisable(false);
      setValue("Update");
    } else {
      setFormDisable(true);
      event.preventDefault();
      UpdateUser();
      setFormDisable(false);
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
              <div className="formInput">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  value={userData.firstName}
                  onChange={(e) =>
                    setData({ ...userData, firstName: e.target.value })
                  }
                  disabled={formDisable}
                />
              </div>
              <div className="formInput">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={userData.lastName}
                  onChange={(e) =>
                    setData({ ...userData, lastName: e.target.value })
                  }
                  disabled={formDisable}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="john@domain.com"
                  value={userData.email}
                  onChange={(e) =>
                    setData({ ...userData, email: e.target.value })
                  }
                  disabled={formDisable}
                />
              </div>
              <div className="formInput">
                <label>Mobile</label>
                <input
                  type="number"
                  placeholder="+91 80777 61461"
                  value={userData.phoneNumber}
                  onChange={(e) =>
                    setData({ ...userData, phoneNumber: e.target.value })
                  }
                  disabled={formDisable}
                />
              </div>
              <button onClick={EditUser}>{value}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;