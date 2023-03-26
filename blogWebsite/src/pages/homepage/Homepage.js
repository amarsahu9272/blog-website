import React, { useEffect, useState } from "react";
import "./Homepage.css";
import Header from "../../component/header/Header";
import { Outlet } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import { isLoginAtom } from "../../RecoilState";
import Login from "../../pages/login/Login";

function Homepage() {
  // const isUserLogin = useRecoilValue(isLoginAtom);
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const userDataFromStorage = JSON.parse(
      localStorage.getItem("loggedInUserData")
    );
    setUserData(userDataFromStorage);
  }, []);
  // console.log(userData);
  return (
    <React.Fragment>
      {userData._id ? (
        <div>
          <Header />
          <div className="home">
            <Outlet />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </React.Fragment>
  );
}

export default Homepage;
