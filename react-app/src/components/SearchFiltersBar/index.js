import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SearchFiltersBar.css";

function SearchFiltersBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");
  const [goodWithCats, setGoodWithCats] = useState(false);
  const [goodWithDogs, setGoodWithDogs] = useState(false);
  const [goodWithChildren, setGoodWithChildren] = useState(false);
  const [goodWithOtherAnimals, setGoodWithOtherAnimals] = useState(false);
  const [houseTrained, setHouseTrained] = useState(false);
  const [specialNeeds, setSpecialNeeds] = useState(false);
  const [color, setColor] = useState("");
  const [daysOnSite, setdaysOnSite] = useState(0);
  const [orgName, setOrgName] = useState("");
  const [petName, setPetName] = useState("");
  const [outOfTown, setOutOfTown] = useState(false);

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

  const ulClassName = "animal-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="search-filter__top-bar">
        <button onClick={openMenu}>Type</button>
        <ul className={ulClassName} ref={ulRef}>
          <li>
            <label>
              Dogs
              <input
                type="radio"
                name="type"
                value="Dog"
                onChange={(e) => setType(e.target.value)}
              />
            </label>
          </li>
          <li>
            <label>
              Cats
              <input
                type="radio"
                name="type"
                value="Cat"
                onChange={(e) => setType(e.target.value)}
              />
            </label>
          </li>
          <li>
            <label>
              Rabbits
              <input
                type="radio"
                name="type"
                value="Rabbit"
                onChange={(e) => setType(e.target.value)}
              />
            </label>
          </li>
          <li>
            <label>
              Scales, Fins, & Other
              <input
                type="radio"
                name="type"
                value="Scales, Fins, & Other"
                onChange={(e) => setType(e.target.value)}
              />
            </label>
          </li>
        </ul>
        <button>Save Search</button>
      </div>
      <form>
        <label>
          BREED
          <input type="text" value={breed} onChange={(e) => setBreed} />
        </label>
        <label>
          AGE
          {/* <button onClick={openMenu}>Any</button>
          <ul className={ulClassName} ref={ulRef}>
            <li>
              <label>
                Baby
                <input
                  type="radio"
                  name="age"
                  value="Baby"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
            </li>
            <li>
              <label>
                Young
                <input
                  type="radio"
                  name="age"
                  value="Young"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
            </li>
            <li>
              <label>
                Rabbits
                <input
                  type="radio"
                  name="age"
                  value="Rabbit"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
            </li>
            <li>
              <label>
                Scales, Fins, & Other
                <input
                  type="radio"
                  name="age"
                  value="Scales, Fins, & Other"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
            </li>
          </ul> */}
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            <option value="" disabled selected hidden>
              Any
            </option>
            <option value="Baby">Baby</option>
            <option value="Young">Young</option>
            <option value="Adult">Adult</option>
            <option value="Senior">Senior</option>
          </select>
        </label>
        <label>
            SIZE
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="" disabled selected hidden>
              Any
            </option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Extra Large">Extra Large</option>
          </select>
        </label>
      </form>
    </>
  );
}

export default SearchFiltersBar;
