import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Validate } from "../../utils/Validate";
import axios from "axios";
import "./Login.css";
import { useSetRecoilState } from "recoil";
import { isLoginAtom, userDataAtom } from "../../RecoilState";

function Login() {
  const navigate = useNavigate();
  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [, setIsSubmit] = useState(false);
  const [error, setError] = useState(false);
  const setUserLoginInRecoil = useSetRecoilState(isLoginAtom);
  const setUserDataInRecoil = useSetRecoilState(userDataAtom);

  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(Validate(formValues));
    setIsSubmit(true);
    setError(false);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: formValues.username,
        password: formValues.password,
      });
      // console.log("responsedata",res.data);
      setUserDataInRecoil(res.data);
      setUserLoginInRecoil(true);
      setResponse(res.data);

      res.data &&
        setTimeout(() => {
          navigate("/");
        }, "2000");
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    if (response) {
      localStorage.setItem("loggedInUserData", JSON.stringify(response));
    }
  }, [response]);

  // console.log(response);
  return (
    <div className="login">
      {response ? (
        <div style={{ color: "green" }}>Signed in successfully</div>
      ) : null}
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>User Name</label>
        <input
          type="text"
          className="loginInput"
          name="username"
          placeholder="Enter your username..."
          value={formValues.username}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.username}</p>
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          name="password"
          placeholder="Enter your password..."
          value={formValues.password}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.password}</p>
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      <Link className="link" to="/Register">
        <button className="loginRegisterButton">Register</button>
      </Link>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Wrong credentials!
        </span>
      )}
    </div>
  );
}

export default Login;
