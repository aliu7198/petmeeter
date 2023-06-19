import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "../../assets/logo.png";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

import "./Navigation.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  // const history = useHistory();
  const { pathname } = useLocation();
  console.log("🚀 ~ file: index.js:16 ~ Navigation ~ pathname:", pathname);

  const heartColor = pathname.endsWith('favorites') ? 'nav__heart-purple' : ''
  // const redirectSignup = () => {
  //   history.push("/signup");
  // };

  // const redirectLogin = () => {
  //   history.push("/login");
  // };

  return (
    <ul className="nav">
      <li>
        <NavLink exact to="/">
          <img className="nav__logo" src={logo} alt="logo" />
        </NavLink>
      </li>

      <div className="nav__right-side">
        {isLoaded && (
          <li className="nav__favorites">
            <NavLink exact to="/user/favorites">
              <i className={`fas fa-heart fa-2xl nav__heart ${heartColor}`}></i>
            </NavLink>
          </li>
        )}
        {isLoaded && !sessionUser && (
          <div className="nav__auth-links">
            {/* <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            /> */}
            <NavLink exact to="/signup">
              Sign Up
            </NavLink>
            <NavLink exact to="/login">
              Log In
            </NavLink>
            {/* <button onClick={redirectSignup}>Sign Up</button>
            <button onClick={redirectLogin}>Log In</button> */}
            {/* <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          /> */}
          </div>
        )}
        {isLoaded && sessionUser && (
          <li className="profile-button__wrapper">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </ul>
  );
}

export default Navigation;
