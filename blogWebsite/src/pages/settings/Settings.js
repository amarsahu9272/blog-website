import React, { useEffect } from "react";
import Sidebar from "../../component/sidebar/Sidebar";
import "./Settings.css";
import { useState } from "react";
import axios from "axios";
import { Validate } from "../../utils/Validate";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userDataAtom } from "../../RecoilState";

function Settings() {
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
  const PF = "http://localhost:5000/images/";
  const [formErrors, setFormErrors] = useState({});
  const userDataFromRecoil = useRecoilValue(userDataAtom);
  const setUserDataToRecoil = useSetRecoilState(userDataAtom);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [userData, setUserData] = useState("");
  

  useEffect(() => {
    const userDataFromStorage = JSON.parse(
      localStorage.getItem("loggedInUserData")
    );
    setUserData(userDataFromStorage);
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(Validate(formValues));
    console.log("UPDATE_START");
    const updatedUser = {
      userId: userDataFromRecoil._id,
      name:
        Object.keys(formErrors).length === 0 
          ? formValues.name
          : userDataFromRecoil.name,
      username:
        Object.keys(formErrors).length === 0 
          ? formValues.username
          : userDataFromRecoil.name,
      email:
        Object.keys(formErrors).length === 0 
          ? formValues.email
          : userDataFromRecoil.name,
      tel:
        Object.keys(formErrors).length === 0
          ? formValues.tel
          : userDataFromRecoil.name,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      userDataFromRecoil.profilePic = filename;
      // console.log(data);
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {
        console.log("UPLOADED_FAILURE");
      }
    }
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/" + userDataFromRecoil._id,
        updatedUser
      );
      // console.log(res.data);
      setUserDataToRecoil(res.data);
      setSuccess(true);
      console.log("UPDATE_SUCCESS");
    } catch (err) {
      console.log("UPDATE_FAILURE");
    }
  };

  // console.log(file?.name)
  // console.log(new FormData())

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          {/* <span className="settingsDeleteTitle">Delete Account</span> */}
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : PF + userData.profilePic
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder={userDataFromRecoil.name}
            value={formValues.name}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{formErrors.name}</p>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder={userDataFromRecoil.username}
            value={formValues.username}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{formErrors.username}</p>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder={userDataFromRecoil.email}
            value={formValues.email}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{formErrors.email}</p>
          <label>Phone</label>
          <input
            type="tel"
            name="tel"
            placeholder={userDataFromRecoil.tel}
            value={formValues.tel}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{formErrors.tel}</p>
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}

export default Settings;
