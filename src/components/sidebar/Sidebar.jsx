import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CollectionsIcon from '@mui/icons-material/Collections';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FeedIcon from '@mui/icons-material/Feed';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../../context/AuthenticationContext";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import StoreIcon from "@mui/icons-material/Store";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
// import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {
  const { setLogin } = useContext(AuthenticationContext);
  // const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    setLogin(false);
    navigate("/");
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Forelskets</span>
        </Link>
      </div>
      {/* <hr /> */}
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/settings" style={{ textDecoration: "none" }}>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Settings</span>
            </li>
          </Link>
          <Link to="/gallery" style={{ textDecoration: "none" }}>
            <li>
              <CollectionsIcon className="icon" />
              <span>Gallery</span>
            </li>
          </Link>
          <Link to="/team" style={{ textDecoration: "none" }}>
            <li>
              <Diversity3Icon className="icon" />
              <span>Team</span>
            </li>
          </Link>
          <Link to="/news" style={{ textDecoration: "none" }}>
            <li>
              <FeedIcon className="icon" />
              <span>News</span>
            </li>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <li>
              <ContactsIcon className="icon" />
              <span>Contacts</span>
            </li>
          </Link>
          <p className="title">Admin Panel</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
         
          {/* <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link> */}
          {/* <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li> */}
          {/* <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li> */}
          {/* <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li> */}
          {/* <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
