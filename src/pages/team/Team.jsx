import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TeamCard from "../../components/TeamCard/TeamCard";
import "./Team.scss";

function Team() {
  const [data, setData] = useState([]);
  const getUsers = async () => {
    try {
      const status = await axios.get(`${process.env.REACT_APP_API}api/getteam`);
      if (status.status === 200) {
        setData(status.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const DeleteTeamMember = async (id) => {
    try {
      const status = await axios.delete(
        `${process.env.REACT_APP_API}api/deleteTeam/${id}`
      );
      if (status.status === 200) {
        console.log("Deleted Team Member");
        toast.success("Removed Team Member!");
        getUsers();
      }
    } catch (err) {
      toast.error("Error in Deleting Team Member");
      console.log(err);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="datatableTitle">
          <Link to="/users/new" className="link">
            Add New Team Member
          </Link>
        </div>
        <div className="teamWrapper">
          {data.map((item, index) => {
            return (
              <TeamCard
                data={item}
                key={item._id}
                deleteFunction={DeleteTeamMember}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Team;
