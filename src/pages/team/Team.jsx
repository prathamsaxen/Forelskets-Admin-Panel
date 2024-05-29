import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Team.scss";
import TeamCard from "../../components/TeamCard/TeamCard";
import axios from "axios";
// const demoData = [
//   {
//     name: "Pratham Saxena",
//     profile: "Software Engineer",
//     image:
//       "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
//   },
//   {
//     name: "Sujal Varshney",
//     profile: "Software Engineer",
//     image:
//       "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
//   },
//   {
//     name: "Sujal Varshney",
//     profile: "Software Engineer",
//     image:
//       "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
//   },
//   {
//     name: "Sujal Varshney",
//     profile: "Software Engineer",
//     image:
//       "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
//   },
//   {
//     name: "Sujal Varshney",
//     profile: "Software Engineer",
//     image:
//       "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
//   },
//   {
//     name: "Sujal Varshney",
//     profile: "Software Engineer",
//     image:
//       "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
//   },
//   {
//     name: "Sujal Varshney",
//     profile: "Software Engineer",
//     image:
//       "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
//   },
//   {
//     name: "Sujal Varshney",
//     profile: "Software Engineer",
//     image:
//       "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
//   },
// ];

function Team() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const status = await axios.get(`${process.env.REACT_APP_API}api/getteam`);
        if (status.status === 200) {
          // console.log(status.data);
          setData(status.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="teamWrapper">
          {data.map((item, index) => {
            return <TeamCard data={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Team;
