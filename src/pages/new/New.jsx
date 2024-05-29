import { useState } from "react";
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { toast } from "react-toastify";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [userData, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [formDisable,setFormDisable] = useState(false);

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

  const registerUser = async(event) => {
    event.preventDefault();
    setFormDisable(true);
    if(validateForm())
      {
        try{
          const postingData={
            name:`${userData.firstName} ${userData.lastName}`,
            email:userData.email,
            password:userData.password,
            phoneNumber:userData.phoneNumber
          }
          const status=await axios.post(`${process.env.REACT_APP_API}api/register`,postingData);
          if(status.status===200)
            {
              toast.success("User Registered Successfully!");
              setData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
              })
            }
        }
        catch(err)
        {
          setFormDisable(false);
          toast.error(err.response.data.message);
          console.log(err);
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
              <div className="formInput">
                <label>Password</label>
                <input
                  type={"password"}
                  value={userData.password}
                  onChange={(e) =>
                    setData({ ...userData, password: e.target.value })
                  }
                  disabled={formDisable}
                />
              </div>
              <div className="formInput">
                <label>Confirm Password</label>
                <input
                  type={"password"}
                  value={userData.confirmPassword}
                  onChange={(e) =>
                    setData({ ...userData, confirmPassword: e.target.value })
                  }
                  disabled={formDisable}
                />
              </div>
              <input type="submit" value="Register" disabled={formDisable}/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
