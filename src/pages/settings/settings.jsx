import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import SettingsForm from "../../components/SettingsForm/SettingsForm";
import "./settings.scss";

const Settings = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="homeForm">
          <SettingsForm/>
        </div>
      </div>
    </div>
  );
};

export default Settings;
