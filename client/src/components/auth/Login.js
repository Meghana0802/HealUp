import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify(user);
      const res = await axios.post("http://localhost:5000/api/auth/login", body, config);
      localStorage.setItem("token", res.data.token);
      console.log("The token stored in local storage:",res.data);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={onSubmit} className="login-form">
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
            autoComplete="current-password"
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
