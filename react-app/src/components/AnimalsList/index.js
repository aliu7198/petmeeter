import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { getAnimalsThunk } from "../../store/animals";
import AnimalCard from "./AnimalCard";
import Loading from "../Loading";
import dogNav from "../../assets/dog-nav.png";
import catNav from "../../assets/cat-nav.png";
import animalNav from "../../assets/animal-nav.png";
import pawLogo from "../../assets/paw-logo.png";
import "./AnimalsList.css";
import "../SearchFiltersBar/SearchFiltersBar.css";
import { createSearchThunk } from "../../store/searches";
import CreatedSearchModal from "../CreatedSearchModal";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
// import SearchFiltersBar from "../SearchFiltersBar";

function AnimalsList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const animals = useSelector((state) => state.animals.allAnimals);
  const location = useLocation();
  const history = useHistory();
  const { closeModal } = useModal();
  const modalButtonRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  const queryParams = location.search;
  const queryObj = new URLSearchParams(queryParams);
  const typeQuery = queryObj.get("type");
  const ageQuery = queryObj.get("age");
  const sizeQuery = queryObj.get("size");
  const genderQuery = queryObj.get("gender");
  const goodWithCatsQuery =
    queryObj.get("goodWithCats") === "true" ? true : false;
  const goodWithDogsQuery =
    queryObj.get("goodWithDogs") === "true" ? true : false;
  const goodWithChildrenQuery =
    queryObj.get("goodWithChildren") === "true" ? true : false;
  const goodWithOtherAnimalsQuery =
    queryObj.get("goodWithOtherAnimals") === "true" ? true : false;
  const houseTrainedQuery =
    queryObj.get("houseTrained") === "true" ? true : false;
  const specialNeedsQuery =
    queryObj.get("specialNeeds") === "true" ? true : false;

  const [type, setType] = useState(typeQuery ? typeQuery : "");
  const [age, setAge] = useState(ageQuery ? ageQuery : "");
  const [size, setSize] = useState(sizeQuery ? sizeQuery : "");
  const [gender, setGender] = useState(genderQuery ? genderQuery : "");
  const [goodWithCats, setGoodWithCats] = useState(goodWithCatsQuery);
  const [goodWithDogs, setGoodWithDogs] = useState(goodWithDogsQuery);
  const [goodWithChildren, setGoodWithChildren] = useState(
    goodWithChildrenQuery
  );
  const [goodWithOtherAnimals, setGoodWithOtherAnimals] = useState(
    goodWithOtherAnimalsQuery
  );
  const [houseTrained, setHouseTrained] = useState(houseTrainedQuery);
  const [specialNeeds, setSpecialNeeds] = useState(specialNeedsQuery);

  // Handle loading for components
  const [isLoading, setIsLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAnimalsThunk(queryParams));
      setListLoading(false);
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, queryParams]);

  const animalsArr = user
    ? Object.values(animals).filter((animal) => animal.ownerId !== user.id)
    : Object.values(animals);

  // Sorting
  const [sort, setSort] = useState("Randomize");

  if (sort === "Randomize") {
    animalsArr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  } else if (sort === "A to Z") {
    animalsArr.sort((a, b) => {
      const animalA = a.name.toUpperCase();
      const animalB = b.name.toUpperCase();
      return animalA < animalB ? -1 : animalA > animalB ? 1 : 0;
    });
  } else if (sort === "Z to A") {
    animalsArr.sort((a, b) => {
      const animalA = a.name.toUpperCase();
      const animalB = b.name.toUpperCase();
      return animalA > animalB ? -1 : animalA < animalB ? 1 : 0;
    });
  } else if (sort === "Oldest Addition") {
    animalsArr.sort((a, b) => {
      const animalA = new Date(a.createdAt);
      const animalB = new Date(b.createdAt);
      return animalA < animalB ? -1 : animalA > animalB ? 1 : 0;
    });
  } else if (sort === "Newest Addition") {
    animalsArr.sort((a, b) => {
      const animalA = new Date(a.createdAt);
      const animalB = new Date(b.createdAt);
      return animalA > animalB ? -1 : animalA < animalB ? 1 : 0;
    });
  }

  // Helper Function to get animal count and type
  const numAnimals = () => {
    let res = `${animalsArr.length} Animals`;
    if (queryParams.includes("type=Cat")) res = `${animalsArr.length} Cats`;
    if (queryParams.includes("type=Dog")) res = `${animalsArr.length} Dogs`;
    if (animalsArr.length === 1) res = res.slice(0, res.length - 1);
    return res;
  };

  // Helper Function to get proper animal logo
  const animalLogo = () => {
    if (queryParams.includes("type=Cat")) return catNav;
    if (queryParams.includes("type=Dog")) return dogNav;
    return animalNav;
  };

  // Helper functions to handle re-fetching data when search filters are changed
  const changeType = (e) => {
    setType(e.target.value);
    if (e.target.value === "") queryObj.delete("type");
    else queryObj.set("type", e.target.value);
    setListLoading(true);
    history.push(`/animals?${queryObj.toString()}`);
  };

  const changeAge = (e) => {
    setAge(e.target.value);
    if (e.target.value === "") queryObj.delete("age");
    else queryObj.set("age", e.target.value);
    setListLoading(true);
    history.push(`/animals?${queryObj.toString()}`);
  };

  const changeSize = (e) => {
    setSize(e.target.value);
    if (e.target.value === "") queryObj.delete("size");
    else queryObj.set("size", e.target.value);
    setListLoading(true);
    history.push(`/animals?${queryObj.toString()}`);
  };

  const changeGender = (e) => {
    setGender(e.target.value);
    if (e.target.value === "") queryObj.delete("gender");
    else queryObj.set("gender", e.target.value);
    setListLoading(true);
    history.push(`/animals?${queryObj.toString()}`);
  };

  const changeGoodWithCats = (e) => {
    setGoodWithCats(!goodWithCats);
    if (goodWithCatsQuery) queryObj.delete("goodWithCats");
    else queryObj.set("goodWithCats", true);
    setListLoading(true);
    history.push(`/animals?${queryObj.toString()}`);
  };

  const changeGoodWithDogs = (e) => {
    setGoodWithDogs(!goodWithDogs);
    if (goodWithDogsQuery) queryObj.delete("goodWithDogs");
    else queryObj.set("goodWithDogs", true);
    setListLoading(true);
    history.push(`/animals?${queryObj.toString()}`);
  };

  const changeGoodWithChildren = (e) => {
    setGoodWithChildren(!goodWithChildren);
    if (goodWithChildrenQuery) queryObj.delete("goodWithChildren");
    else queryObj.set("goodWithChildren", true);
    setListLoading(true);
    history.push(`/animals?${queryObj.toString()}`);
  };

  const changeGoodWithOtherAnimals = (e) => {
    setGoodWithOtherAnimals(!goodWithOtherAnimals);
    if (goodWithOtherAnimalsQuery) queryObj.delete("goodWithOtherAnimals");
    else queryObj.set("goodWithOtherAnimals", true);
    setListLoading(true);
    history.push(`/animals?${queryObj.toString()}`);
  };

  const changeHouseTrained = (e) => {
    setHouseTrained(!houseTrained);
    if (houseTrainedQuery) queryObj.delete("houseTrained");
    else queryObj.set("houseTrained", true);
    setListLoading(true);
    history.push(`/animals?${queryObj.toString()}`);
  };

  const changeSpecialNeeds = (e) => {
    setSpecialNeeds(!specialNeeds);
    if (specialNeedsQuery) queryObj.delete("specialNeeds");
    else queryObj.set("specialNeeds", true);
    setListLoading(true);
    history.push(`/animals?${queryObj.toString()}`);
  };

  // Handle form submission
  const [newSearch, setNewSearch] = useState(null);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("type", type);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("size", size);
    formData.append("house_trained", houseTrained);
    formData.append("special_needs", specialNeeds);
    formData.append("good_with_cats", goodWithCats);
    formData.append("good_with_dogs", goodWithDogs);
    formData.append("good_with_children", goodWithChildren);
    formData.append("good_with_other_animals", goodWithOtherAnimals);

    const createdSearch = await dispatch(createSearchThunk(formData));
    setNewSearch(createdSearch);
  };

  useEffect(() => {
    const clickModalButton = () => {
      if (newSearch && !clicked) {
        modalButtonRef.current.click();
        setClicked(true);
      }
      setClicked(false);
      setNewSearch(null);
    };

    clickModalButton();
  }, [newSearch, clicked]);

  if (isLoading) return <Loading />;

  return (
    <div className="animals-list__outer body">
      <nav className="animals-list__top-bar">
        <div className="animals-list__top-left">
          <img
            className="animals-list__top-bar-logo"
            src={animalLogo()}
            alt={`${numAnimals()} Logo`}
          />
          <div className="animals-list__top-quantity">{numAnimals()}</div>
        </div>
        <button
          className="animals-list__submit-search-btn"
          onClick={handleSubmit}
        >
          SAVE SEARCH
        </button>
        <div id="saved-search-modal-btn">
          <OpenModalButton
            // onButtonClick={handleSubmit}
            buttonText="Save Search Modal"
            onItemClick={closeModal}
            modalComponent={<CreatedSearchModal search={newSearch} />}
            ref={modalButtonRef}
          />
        </div>
      </nav>

      <div className="animals-list__body">
        {/* <SearchFiltersBar /> */}
        <form className="search-filter__form">
          <label className="search-filter__input-label">
            TYPE
            <select
              id="search-filter__type"
              className="search-filter__dropdown"
              value={type}
              onChange={(e) => changeType(e)}
            >
              <option value="">Any</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Small & Furry">Small & Furry</option>
              <option value="Horse">Horse</option>
              <option value="Bird">Bird</option>
              <option value="Scales, Fins, & Other">
                Scales, Fins, & Other
              </option>
              {/* <option value="Barnyard">Barnyard</option> */}
            </select>
          </label>
          <label className="search-filter__input-label">
            AGE
            <select
              value={age}
              onChange={(e) => changeAge(e)}
              className="search-filter__dropdown"
            >
              <option value="">Any</option>
              <option value="Baby">Baby</option>
              <option value="Young">Young</option>
              <option value="Adult">Adult</option>
              <option value="Senior">Senior</option>
            </select>
          </label>
          <label className="search-filter__input-label">
            SIZE
            <select
              value={size}
              onChange={(e) => changeSize(e)}
              className="search-filter__dropdown"
            >
              <option value="">Any</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
            </select>
          </label>
          <label className="search-filter__input-label">
            GENDER
            <select
              value={gender}
              onChange={(e) => changeGender(e)}
              className="search-filter__dropdown"
            >
              <option value="">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <div className="search-filter__check-outer">
            <h4 className="search-filter__check-title">GOOD WITH</h4>
            <div className="search-filter__check-wrapper">
              <label className="search-filter__check-label">
                Cats
                <input
                  type="checkbox"
                  value={goodWithCats}
                  checked={goodWithCats}
                  onChange={(e) => changeGoodWithCats(e)}
                />
              </label>
              <label className="search-filter__check-label">
                Dogs
                <input
                  type="checkbox"
                  value={goodWithDogs}
                  checked={goodWithDogs}
                  onChange={(e) => changeGoodWithDogs(e)}
                />
              </label>
              <label className="search-filter__check-label">
                Children
                <input
                  type="checkbox"
                  value={goodWithChildren}
                  checked={goodWithChildren}
                  onChange={(e) => changeGoodWithChildren(e)}
                />
              </label>
              <label className="search-filter__check-label">
                Other Animals
                <input
                  type="checkbox"
                  value={goodWithOtherAnimals}
                  checked={goodWithOtherAnimals}
                  onChange={(e) => changeGoodWithOtherAnimals(e)}
                />
              </label>
            </div>
          </div>
          <div className="search-filter__check-outer">
            <h4 className="search-filter__check-title">HEALTH</h4>
            <div className="search-filter__check-wrapper">
              <label className="search-filter__check-label">
                House Trained
                <input
                  type="checkbox"
                  value={houseTrained}
                  checked={houseTrained}
                  onChange={(e) => changeHouseTrained(e)}
                />
              </label>
              <label className="search-filter__check-label">
                Special Needs
                <input
                  type="checkbox"
                  value={specialNeeds}
                  checked={specialNeeds}
                  onChange={(e) => changeSpecialNeeds(e)}
                />
              </label>
            </div>
          </div>
        </form>
        <div className="animals-list__main">
          <div className="animals-list__sort-wrapper">
            <label htmlFor="sort" className="animals-list__sort-label">
              Sort By:
            </label>
            <select
              id="sort"
              className="animals-list__sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="Randomize" default>
                Randomize
              </option>
              <option value="A to Z">A to Z</option>
              <option value="Z to A">Z to A</option>
              <option value="Newest Addition">Newest Addition</option>
              <option value="Oldest Addition">Oldest Addition</option>
            </select>
          </div>
          {!listLoading && animalsArr.length > 0 && (
            <div className="animals-list__wrapper">
              {animalsArr.map((animal) => (
                <AnimalCard animal={animal} key={animal.id} />
              ))}
            </div>
          )}
          {!listLoading && animalsArr.length === 0 && (
            // TODO: style this, maybe add buttons to home/search more?
            <div className="animals-list__no-animals-wrapper">
              <h1>No animals found matching the given criteria</h1>
              <h2>More animals coming soon!</h2>
              <img
                className="animals-list__logo"
                src={pawLogo}
                alt="Paw Logo"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimalsList;
