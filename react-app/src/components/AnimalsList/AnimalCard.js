import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteAnimalModal from "../DeleteAnimalModal";
import "./AnimalCard.css";

function AnimalCard({ animal }) {
  //   console.log("🚀 ~ file: AnimalCard.js:7 ~ AnimalCard ~ animal:", animal);
  const history = useHistory();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);
  // const dispatch = useDispatch();
  // // console.log("🚀 ~ file: index.js:11 ~ SavedAnimalesPage ~ savedAnimales:", savedAnimales)

  // useEffect(() => {
  //     dispatch(getAnimalsThunk());
  // }, [dispatch])

  const getBreed = () => {
    let breed = animal.primaryBreed;
    if (animal.secondaryBreed) {
      if (animal.secondaryBreed === "Unknown") {
        breed += " Mix"
      } else {
        breed += ` & ${animal.secondaryBreed}`
      }
    }
    return breed;
  }

  const getAge = () => {
    let age = animal.age;
    if (animal.type === "Cat" && animal.age === "Baby") age = "Kitten";
    if (animal.type === "Dog" && animal.age === "Baby") age = "Puppy"
    return age
  }

  const redirectAnimalDetailPage = () => {
    history.push(`/animals/${animal.id}`);
  };

  if (!animal) return null;

  return (
    <>
      <div className="animal-card__outer">
        <div
          className="animal-card__wrapper"
          onClick={redirectAnimalDetailPage}
        >
          <div className="animal-card__top">
            <img
              className="animal-card__img"
              src={animal.previewImage}
              alt={animal.name}
            />
            <button className="animal-card__fave">
              <i className="far fa-heart fa-lg"></i>
            </button>
          </div>
          <div className="animal-card__info">
            <h3 className="animal-card__name">{animal.name}</h3>
            <p>
              {getAge()} ‧ {getBreed()}
            </p>
          </div>
        </div>
        {animal.ownerId === user.id && (
          <div>
            <button
              onClick={() => {
                history.push(`/animals/${animal.id}/edit`);
              }}
              className="animal-card__edit-btn"
            >
              <i className="fa-solid fa-pen"></i>
            </button>
            <OpenModalButton
              buttonText={<i className="fa-solid fa-trash"/>}
              onItemClick={closeModal}
              modalComponent={<DeleteAnimalModal animal={animal} />}
              className="animal-card__delete-btn"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AnimalCard;
