import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import dogLogo from "../../assets/dog-logo.png";
import catLogo from "../../assets/cat-logo.png";
import pawLogo from "../../assets/paw-logo.png";
import "./LandingPage.css";
import LandingAnimalCard from "./LandingAnimalCard";

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const recentlyViewedAnimals =
    JSON.parse(localStorage.getItem("recentlyViewedAnimals")) || [];

  const getDogs = async () => {
    history.push("/animals?type=Dog");
  };

  const getCats = async () => {
    history.push("/animals?type=Cat");
  };

  const getAllAnimals = async () => {
    history.push("/animals");
  };

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
        <div className="landing-page__search-bar">
          <input
            className="landing-page__search-input"
            onClick={(e) => {
              alert("Feature coming soon!");
            }}
            placeholder="Search"
            type="search"
          />
          <button
            onClick={(e) => {
              alert("Feature coming soon!");
            }}
            className="landing-page__search-btn"
          >
            <i className="fa-solid fa-magnifying-glass fa-lg" />
          </button>
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
      {recentlyViewedAnimals.length && (<div className="landing-page__recently-viewed-wrapper">
        <h1 className="landing-page__recently-viewed-title">
          Recently Viewed Pets
        </h1>
        <div className="landing-page__recently-viewed-cards">
          {recentlyViewedAnimals.map((animal) => (
            <LandingAnimalCard animal={animal} key={animal?.id} />
          ))}
        </div>
      </div>)}
    </div>
  );
};

export default LandingPage;
