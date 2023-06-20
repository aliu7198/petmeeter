import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import landingPageImage from "../../assets/landing-page-img.jpg";
import "./LandingPage.css";
import animalsReducer, { getAnimalsThunk } from "../../store/animals";
import AnimalsList from "../AnimalsList";

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const getDogs = async () => {
    history.push('/animals?type=Dog');
  };

  const getCats = async () => {
    history.push('/animals?type=Cat');
  };

  const getAllAnimals = async () => {
    history.push('/animals');
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
        <input
          className="landing-page__search-bar"
          onClick={(e) => {
            alert("Feature coming soon!");
          }}
          placeholder="Search"
          type="search"
        />
        <div className="landing-page__header-text">
          <h1 className="landing-page__title">
            Finding a fur-ever home for all our animal friends
          </h1>
          <h3 className="landing-page__slogan">Slogan here</h3>
        </div>
        <div className="landing-page__animal-types">
          <div className="landing-page__animal-type-card" onClick={getDogs}>
            Dogs
          </div>
          <div className="landing-page__animal-type-card" onClick={getCats}>Cats</div>
          <div className="landing-page__animal-type-card" onClick={getAllAnimals}>All Animals</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
