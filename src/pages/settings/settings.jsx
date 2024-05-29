import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./settings.scss";

const Settings = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="homeForm">
          <form action="">
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
