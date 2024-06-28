import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import "./Navbar.css";
import axios from 'axios';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
        const res = await axios.get('http://localhost:5000/api/auth/user', config);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user data: ", err);
      }
    };

    fetchUserData();

    const body = document.querySelector("body");
    body.style.background = "white"; 
    body.style.display = "block"; 

    return () => {
      body.style.background = ""; 
      body.style.display = ""; 
    };
  }, []); 

  return (
    <nav className="navbar">
      <div className="nav-start">
        <div className="logo-heading">
          <FontAwesomeIcon icon={faHandHoldingHeart} />
          <h3>HealUp</h3>
        </div>
        <Link to="/">Home</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/forum">Forum</Link>
      </div>
      <div className="nav-end">
        <FontAwesomeIcon icon={faCircleUser} />
        <p>{user ? user.name : "Loading..."}</p>
      </div>
    </nav>
  );
}
