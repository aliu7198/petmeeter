import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  // console.log("🚀 ~ file: ProfileButton.js:10 ~ ProfileButton ~ user:", user)
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const redirectSavedSearches = () => {
    history.push("/user/searches");
  };

  const redirectAnimalForm = () => {
    history.push("/animals/new");
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user fa-2xl"></i>
        {user.firstName} {user.lastName}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user && (
          <>
            <li>
              <button onClick={redirectSavedSearches}>My Saved Searches</button>
            </li>
            <li>
              <button
                onClick={() => {
                  history.push("/user/animals");
                }}
              >
                My Animals
              </button>
            </li>
            <li>
              <button onClick={redirectAnimalForm}>
                Post Animal for Adoption
              </button>
            </li>
            <li>
              <button onClick={handleLogout}>Sign Out</button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
