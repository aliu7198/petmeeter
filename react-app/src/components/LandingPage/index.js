import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import dogLogo from "../../assets/dog-logo.png";
import catLogo from "../../assets/cat-logo.png";
import pawLogo from "../../assets/paw-logo.png";
import LandingAnimalCard from "./LandingAnimalCard";
import { searchResults } from "../../utils/searchResults";
import "./LandingPage.css";

const LandingPage = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Handle showing search results on searchbar focus
  const searchRef = useRef();

  const openSearchResults = () => {
    if (showSearchResults) return;
    setShowSearchResults(true);
  };

  useEffect(() => {
    if (!showSearchResults || !searchRef.current) return;

    const closeSearchResults = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("click", closeSearchResults);

    return () => document.removeEventListener("click", closeSearchResults);
  }, [showSearchResults, searchRef]);

  const searchResultsClassName =
    "landing-page__search-results" + (showSearchResults ? "" : " hidden");

  // Filter search results
  const filteredSearchResults = search ? searchResults.filter((result) => {
    const searchArr = search.trim().toLowerCase().split(" ");
    let includeResult = true;
    for (let word of searchArr) {
      if (word === "male" && result.toLowerCase().includes("female")) {
        includeResult = false;
        break;
      }
      if (!result.toLowerCase().includes(word)) {
        includeResult = false;
        break;
      }
    }
    return includeResult;
  }) : [];

  const filteredSearchResults8 = filteredSearchResults.slice(0, 8);

  // Launch first search in filtered results
  // On clicking search button or pressing enter key
  const launchFirstSearch = useCallback(() => {
    const search = filteredSearchResults8[0];
    const searchArr = search.split(" • ");
    let query = `/animals?type=${encodeURIComponent(searchArr[0])}`;
    if (searchArr[1]) {
      const other = searchArr[1];
      if (other === "Male" || other === "Female") query += `&gender=${other}`;
      if (
        other === "Baby" ||
        other === "Young" ||
        other === "Adult" ||
        other === "Senior"
      )
        query += `&age=${other}`;
      if (
        other === "Small" ||
        other === "Medium" ||
        other === "Large" ||
        other === "Extra Large"
      )
        query += `&size=${encodeURIComponent(other)}`;
    }
    setShowSearchResults(false);
    history.push(query);
  }, [filteredSearchResults8, history]);

  // Launch search when clicking a search result
  const handleSearch = (result) => {
    const searchArr = result.split(" • ");
    let query = `/animals?type=${encodeURIComponent(searchArr[0])}`;
    if (searchArr[1]) {
      const other = searchArr[1];
      if (other === "Male" || other === "Female") query += `&gender=${other}`;
      if (
        other === "Baby" ||
        other === "Young" ||
        other === "Adult" ||
        other === "Senior"
      )
        query += `&age=${other}`;
      if (
        other === "Small" ||
        other === "Medium" ||
        other === "Large" ||
        other === "Extra Large"
      )
        query += `&size=${encodeURIComponent(other)}`;
    }
    setShowSearchResults(false);
    history.push(query);
  };

  // Launch search with enter key
  const searchbar = document.querySelector(".landing-page__search-input");

  useEffect(() => {
    if (!searchbar) return;

    const enterSearch = (e) => {
      if (e.code === "Enter" && filteredSearchResults8.length) {
        launchFirstSearch();
      }
    };

    searchbar.addEventListener("keyup", enterSearch);

    return () => searchbar.removeEventListener("keyup", enterSearch);
  }, [searchbar, filteredSearchResults8, launchFirstSearch]);

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
              placeholder="Search Cat, Dog, etc."
              type="search"
              ref={searchRef}
            />
            <button
              onClick={launchFirstSearch}
              className="landing-page__search-btn"
              disabled={search.length < 1}
            >
              <i className="fa-solid fa-magnifying-glass fa-lg" />
            </button>
          </div>
          {search.length > 0 && (
            <div className={searchResultsClassName}>
              {filteredSearchResults.length ? (
                filteredSearchResults8.map((result) => (
                  <div
                    className="landing-page__search-result"
                    onClick={() => handleSearch(result)}
                    key={result}
                  >
                    {result}
                  </div>
                ))
              ) : (
                <div className="landing-page__search-result-none">
                  No results found
                </div>
              )}
            </div>
          )}
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
