import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AnimalCard.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AnimalCard({ animal }) {
//   console.log("🚀 ~ file: AnimalCard.js:7 ~ AnimalCard ~ animal:", animal);
  const history = useHistory();
  // const dispatch = useDispatch();
  // // console.log("🚀 ~ file: index.js:11 ~ SavedAnimalesPage ~ savedAnimales:", savedAnimales)

  // useEffect(() => {
  //     dispatch(getAnimalsThunk());
  // }, [dispatch])

  let breed = animal.secondaryBreed
    ? `${animal.primaryBreed} & ${animal.secondaryBreed}`
    : animal.primaryBreed;

  let age = animal.age
  if (animal.type === "Cat" && animal.age === "Baby") {
    age = "Kitten"
  } else if (animal.type === "Dog" && animal.age === "Baby") {
    age = "Puppy"
  }

  const redirectAnimalDetailPage = () => {
    history.push(`/animals/${animal.id}`)
  }

  if (!animal) return null;

  return (
    <>
      <div className="animal-card__wrapper" onClick={redirectAnimalDetailPage}>
        <div className="animal-card__top">
          <img className="animal-card__img" src={animal.previewImage} alt={animal.name}/>
          <button className="animal-card__fave">
            <i className="far fa-heart fa-lg"></i>
          </button>
        </div>
        <div className="animal-card__info">
          <h3 className="animal-card__name">{animal.name}</h3>
          <p>
            {age} ‧ {breed}
          </p>
        </div>
      </div>
    </>
  );
}

export default AnimalCard;
