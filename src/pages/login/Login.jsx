import React, { useState, useContext } from "react";
import stlyes from "./login.module.css";
import AuthenticationContext from "../../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const { setLogin } = useContext(AuthenticationContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disable,setDisable]=useState(false);
  const navigate = useNavigate();
  const onChangeFunction = (event) => {
    if (event.target.id === "InputEmail") {
      setUser({ ...user, email: event.target.value });
    } else {
      setUser({ ...user, password: event.target.value });
    }
  };
  const LoginFunction = async (event) => {
    event.preventDefault();
    setDisable(true);
    try {
      const status = await axios.post(`${process.env.REACT_APP_API}api/login`, {
        email: user.email,
        password: user.password,
      });
      console.log(status);
      if (status.status === 200) {
        localStorage.setItem("user", JSON.stringify(status.data));
        setLogin(true);
        navigate("/");
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
    setDisable(false);
  };

  return (
    <div className={stlyes.login}>
      <form onSubmit={LoginFunction}>
        <div className={`form-group ${stlyes.formDiv}`}>
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="InputEmail"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={user.email}
            onChange={onChangeFunction}
            required={true}
            disabled={disable}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className={`form-group ${stlyes.formDiv}`}>
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="InputPassword1"
            placeholder="Password"
            value={user.password}
            onChange={onChangeFunction}
            required={true}
            disabled={disable}
          />
        </div>
        <button type="submit" className={`btn btn-primary ${stlyes.btn_color}`}>
          Login
        </button>
      </form>
      <div className={stlyes.loginFooter}>
        <p>Powered by @Forelskets Software Solutions</p>
      </div>
    </div>
  );
}

export default Login;
