import { useEffect, useState } from "react";
import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const [userData, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [formDisable, setFormDisable] = useState(false);

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
          setData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
          });
        }
      } catch (err) {
        setFormDisable(false);
        toast.error(err.response.data.message);
        console.log(err);
      }
    }
    setFormDisable(false);
  };
  const getUserDetail = async () => {
      const id = JSON.parse(localStorage.getItem("user")).id ;
      console.log(id);
    try {
      const status = await axios.get(
        `${process.env.REACT_APP_API}api/user/${id}`
      );
      if (status.status === 200) {
        console.log(status);
        setData({
            firstName: status.data.name,
            lastName: status.data.name,
            email: status.data.email,
            phoneNumber: status.data.phoneNumber,
        })
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(()=>{
    getUserDetail();
  },[]);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Profile"}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={registerUser}>
              <div className="formInput">
                <label>First Name</label>
                <input
                  type={"text"}
                  placeholder={"John"}
                  value={userData.firstName}
                  onChange={(e) =>
                    setData({ ...userData, firstName: e.target.value })
                  }
                  disabled={formDisable}
                />
              </div>
              <div className="formInput">
                <label>Second Name</label>
                <input
                  type={"text"}
                  placeholder={"Doe"}
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
                  type={"email"}
                  placeholder={"john@domain.com"}
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
                  type={"number"}
                  placeholder={"+91 80777 61461"}
                  value={userData.phoneNumber}
                  onChange={(e) =>
                    setData({ ...userData, phoneNumber: e.target.value })
                  }
                  disabled={formDisable}
                />
              </div>
              <input type="submit" value="Register" disabled={formDisable} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
