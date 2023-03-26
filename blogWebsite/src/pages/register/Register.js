import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Validate } from "../../utils/Validate";
import axios from "axios";
import "./Register.css";

function Register() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    profilePic: "https://api.dicebear.com/5.x/avataaars/svg",
    name: "",
    username: "",
    email: "",
    tel: "",
    password: "",
    joinedDate: `${new Date().getMonth() + 1}-2023`,
    posts: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [response, setResponse] = useState("");


  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(Validate(formValues));
    setIsSubmit(true);
    setError(false);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: formValues.name,
        username: formValues.username,
        email: formValues.email,
        tel: formValues.tel,
        password: formValues.password,
      });
      setResponse(res.data)
      res.data && setTimeout(() => {navigate("../login/Login")}, "2000");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      {response && Object.keys(formErrors).length === 0 && isSubmit ? (
        <div style={{ color: "green" }}>Registered successfully</div>
      ) : null}
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          className="registerInput"
          type="text"
          name="name"
          placeholder="Enter your name..."
          value={formValues.name}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.name}</p>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          name="username"
          placeholder="Enter your username..."
          value={formValues.username}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.username}</p>
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          name="email"
          placeholder="Enter your email..."
          value={formValues.email}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.email}</p>
        <label>Phone</label>
        <input
          className="registerInput"
          // type="tel"
          name="tel"
          placeholder="987-654-3210"
          value={formValues.tel}
          pattern="[0-9]{10}"
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.tel}</p>
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          name="password"
          placeholder="Enter your password..."
          value={formValues.password}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.password}</p>
        <button className="registerButton">Register</button>
      </form>
      <Link className="link" to="/Login">
        <button className="registerLoginButton">Login</button>
      </Link>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          User Already exist!
        </span>
      )}
    </div>
  );
}

export default Register;
