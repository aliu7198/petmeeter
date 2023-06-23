import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FavoriteButton from "../FavoriteButton";
import EditDeleteAnimalButton from "../EditDeleteAnimalButton";
import "../AnimalsList/AnimalCard.css"
import "./LandingAnimalCard.css"


function LandingAnimalCard({ animal }) {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const redirectAnimalDetailPage = () => {
    history.push(`/animals/${animal.id}`);
  };

  if (!animal) return null;

  return (
    <>
      <div className="animal-card__outer">
        <div
            id="landing-animal-card__wrapper"
          className="animal-card__wrapper"
          onClick={redirectAnimalDetailPage}
        >
          <div className="animal-card__top">
            <img
              className="animal-card__img"
              src={animal.previewImage}
              alt={animal.name}
              onError={(e) => {
                e.currentTarget.src =
                  "https://cdn.discordapp.com/attachments/1118675490870399017/1120479857046990958/icon-image-not-found-free-vector.png";
              }}
            />
          </div>
          <div id="landing-animal-card__info" className="animal-card__info">
            <h3 id="landing-animal-card__name" className="animal-card__name">{animal.name}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingAnimalCard;
