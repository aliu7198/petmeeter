import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

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
              <i class="fas fa-heart"></i>
            </button>
          </li>
        )}
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </ul>
  );
}

export default Navigation;
