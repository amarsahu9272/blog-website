import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import profilePic from "../../utils/Amr.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src={profilePic} alt="" />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <Link
            className="link"
            to="https://www.linkedin.com/in/amar-s-4b3359145/"
          >
            <i className="sidebarIcon fab fa-linkedin"></i>
          </Link>
          <Link className="link" to="https://twitter.com/nanapatekar9272">
            <i className="sidebarIcon fab fa-twitter-square"></i>
          </Link>
          <Link className="link" to="https://www.facebook.com/">
            <i className="sidebarIcon fab fa-facebook-square"></i>
          </Link>
          <Link className="link" to="https://www.instagram.com/">
            <i className="sidebarIcon fab fa-instagram-square"></i>
          </Link>
          <Link className="link" to="/login">
            <i className="sidebarIcon fa-solid fa-arrow-right-from-bracket"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
