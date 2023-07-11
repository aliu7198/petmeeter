import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import dogLogo from "../../assets/dog-logo.png";
import catLogo from "../../assets/cat-logo.png";
import pawLogo from "../../assets/paw-logo.png";
import LandingAnimalCard from "./LandingAnimalCard";
import "./LandingPage.css";

const LandingPage = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  console.log("🚀 ~ file: index.js:12 ~ LandingPage ~ search:", search);

  // Handle showing search results on searchbar focus
  const searchRef = useRef();

  const openSearchResults = () => {
    if (showSearchResults) return;
    setShowSearchResults(true);
  };

  useEffect(() => {
    if (!showSearchResults) return;

    const closeSearchResults = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("click", closeSearchResults);

    return () => document.removeEventListener("click", closeSearchResults);
  }, [showSearchResults]);

  const searchResultsClassName = "landing-page__search-results" + (showSearchResults ? "" : " hidden")


  // Handle searchbar queries
  const launchSearch = () => {
    return;
  };


  // Handle search queries for animal type buttons
  const getDogs = async () => {
    history.push("/animals?type=Dog");
  };

  const getCats = async () => {
    history.push("/animals?type=Cat");
  };

  const getAllAnimals = async () => {
    history.push("/animals");
  };


  // Handle recently viewed animals
  const recentlyViewedAnimals =
    JSON.parse(localStorage.getItem("recentlyViewedAnimals")) || [];

  return (
    <div className="body">
      <div className="landing-page__splash">
        {/* <img className="landing-page__splash-image" src={landingPageImage} alt="Cat and dog lying in grass" /> */}
        <div className="landing-page__photo-cred">
          Photo by{" "}
          <a href="https://unsplash.com/@krista?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Krista Mangulsone
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/9gz3wfHr65U?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </div>
        <div className="landing-page__search-wrapper">
          <div className="landing-page__search-bar">
            <input
              className="landing-page__search-input"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onClick={openSearchResults}
              placeholder="Search"
              type="search"
              ref={searchRef}
            />
            <button onClick={launchSearch} className="landing-page__search-btn">
              <i className="fa-solid fa-magnifying-glass fa-lg" />
            </button>
          </div>
          {search.length > 0 && (<div className={searchResultsClassName}>RESULT</div>)}
        </div>
        <div className="landing-page__header-text">
          <h1 className="landing-page__title">Meet your new best friend</h1>
          <h3 className="landing-page__slogan">
            Our mission: Finding a fur-ever home for all our animal friends.
          </h3>
        </div>
        <div className="landing-page__animal-types">
          <div className="landing-page__animal-type-card" onClick={getDogs}>
            <img
              src={dogLogo}
              alt="dog logo"
              className="landing-page__animal-logo"
            />
            <div>Dogs</div>
          </div>
          <div className="landing-page__animal-type-card" onClick={getCats}>
            <img
              src={catLogo}
              alt="cat logo"
              className="landing-page__animal-logo"
            />
            <div>Cats</div>
          </div>
          <div
            className="landing-page__animal-type-card"
            onClick={getAllAnimals}
          >
            <img
              src={pawLogo}
              alt="paw logo"
              className="landing-page__animal-logo"
            />
            <div>All Animals</div>
          </div>
        </div>
      </div>
      {recentlyViewedAnimals?.length > 0 && (
        <div className="landing-page__recently-viewed-wrapper">
          <h1 className="landing-page__recently-viewed-title">
            Recently Viewed Pets
          </h1>
          <div className="landing-page__recently-viewed-cards">
            {recentlyViewedAnimals.map((animal) => (
              <LandingAnimalCard animal={animal} key={animal?.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
