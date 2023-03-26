import React, { useEffect, useState } from "react";
import "./Header.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userDataAtom } from "../../RecoilState";
import { Link, useNavigate } from "react-router-dom";
// import profilePic from "../../utils/Amr.jpg";
function Header() {
  const PF = "http://localhost:5000/images/";
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  // const isuserlogin = useRecoilValue(isLoginAtom);
  const userDataFromRecoil = useRecoilValue(userDataAtom);
  const setuserDataToRecoil = useSetRecoilState(userDataAtom);
  const [LogOut, setLogout] = useState(false);

  const handleLogout = () => {
    setuserDataToRecoil({});
    setLogout(true);
    localStorage.setItem("loggedInUserData", JSON.stringify({}));
    navigate("/Login");
  };

  useEffect(() => {
    const userDataFromStorage = JSON.parse(
      localStorage.getItem("loggedInUserData")
    );
    setUserData(userDataFromStorage);
  }, []);
  return (
    <div className="header">
      <div className="headerLeft">
        {/* <div className="headerIcon" onClick={() => navigate(-1)}>
          <i className="fas fa-long-arrow-left"></i>
        </div> */}
        <Link className="link headerIcon" to="/">
          <img
            className="headerLogoImg"
            src="https://blog.roblox.com/wp-content/uploads/2022/08/RBLX_Logo_Launch_Wordmark.png"
            alt=""
          />
        </Link>
      </div>
      <div className="headerCenter">
        <ul className="headerList">
          <li className="headerListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="headerListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
        </ul>
      </div>
      <div className="headerRight">
        {userData ? (
          <div className="headerRight">
            <Link className="link" to="/settings">
              <img
                className="headerImg"
                src={PF + userData.profilePic}
                alt=""
              />
            </Link>
            <ul className="headerList">
              <li className="headerListItem" onClick={handleLogout}>
                <Link className="link" to="/login">
                  LOGOUT
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="headerList">
            <li className="headerListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="headerListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Header;
