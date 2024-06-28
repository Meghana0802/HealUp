import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      const newUser = { name, email, password };
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const body = JSON.stringify(newUser);
        const res = await axios.post("http://localhost:5000/api/auth/register", body, config);
        console.log(res.data);
        setIsLoggedIn(true);
        navigate("/login");
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={onSubmit} className="register-form">
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
            required
            autoComplete="name"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            required
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            required
            autoComplete="new-password"
          />
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            placeholder="Confirm password"
            required
            autoComplete="new-password"
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
