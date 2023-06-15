import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const redirectSignup = () => {
    history.push("/signup");
  };

  const redirectLogin = () => {
    history.push("/login");
  };

  return (
    <ul className="nav">
      <li>
        <NavLink exact to="/">
          petfinder
        </NavLink>
      </li>

      <div className="nav__right-side">
        {isLoaded && (
          <li>
            <button>
              <i className="fas fa-heart"></i>
            </button>
          </li>
        )}
        {isLoaded && !sessionUser && (
          <>
            {/* <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            /> */}
            <button onClick={redirectSignup}>Sign Up</button>
            <button onClick={redirectLogin}>Log In</button>
            {/* <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          /> */}
          </>
        )}
        {isLoaded && sessionUser && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </ul>
  );
}

export default Navigation;
