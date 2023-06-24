import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./ProfileButton.css";

function ProfileButton({ user }) {
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
    dispatch(logout())
      .then(history.push('/'))
  };

  const profileClassName = "profile-button" + (showMenu ? " profile-button__open" : " profile-button__closed");

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  // const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div onClick={openMenu} className={profileClassName}>
        <i className="fas fa-user fa-2xl profile-icon" />
        <div>
          {user.firstName} {user.lastName}
        </div>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user && (
          <>
            <li className="logout" onClick={(e) => alert("Feature Coming Soon!")}>
              My Saved Searches
              {/* <NavLink exact to="/user/searches">
                My Saved Searches
              </NavLink> */}
            </li>
            <li>
              <NavLink exact to="/user/animals">My Listed Animals</NavLink>
            </li>
            <li>
              <NavLink exact to="/animals/new">Post New Animal</NavLink>
            </li>
            <li onClick={handleLogout} className="logout">
              Sign Out
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
