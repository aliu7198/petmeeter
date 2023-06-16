import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AnimalDetailsPage.css";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { singleAnimalThunk } from "../../store/animals";

function AnimalDetailsPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { animalId } = useParams();
  const animal = useSelector((state) => state.animals.singleAnimal);
  // console.log("🚀 ~ file: index.js:15 ~ AnimalDetailsPage ~ animal:", animal);

  useEffect(() => {
    dispatch(singleAnimalThunk(animalId));
  }, [dispatch]);

  let breed = animal.secondaryBreed
    ? `${animal.primaryBreed} & ${animal.secondaryBreed}`
    : animal.primaryBreed;

  let age = animal.age;
  if (animal.type === "Cat" && animal.age === "Baby") {
    age = "Kitten";
  }

  const createHealthString = () => {
    let health = []
    if (animal.vaccinated) health.push("vaccinations up to date")
    if (animal.fixed) health.push("spayed / neutered")
    if (animal.specialNeeds) health.push('has special needs')
    const healthString = health.join(', ')
    const healthStringUpper = healthString.charAt(0).toUpperCase() + healthString.slice(1)
    return healthStringUpper;
  }

  const createGoodWith = () => {
    let goodWith = []
    if (animal.goodWithCats) goodWith.push("cats")
    if (animal.goodWithDogs) goodWith.push("dogs")
    if (animal.goodWithChildren) goodWith.push('children')
    if (animal.goodWithOtherAnimals) goodWith.push('other animals')
    const goodWithString = goodWith.join(', ')
    const goodWithStringUpper = goodWithString.charAt(0).toUpperCase() + goodWithString.slice(1)
    return goodWithStringUpper;
  }

  // console.log(animal.images.length)

  if (!animal) return null;

  return (
    <>
      <button onClick={() => {history.push('/animals')}}>Back to search</button>
      {/* <div className="animal-images">
        {animal.images.length && animal.images.map((image) => {
          <img key={image.id} src={image.url} alt={image.imageUrl}/>
        })}
      </div> */}
      <div className="animal-details__wrapper">
        <div className="animal-details__1">
          <h1>{animal.name}</h1>
          <p>{breed}</p>
        </div>
        <div className="animal-details__2">
          <p>
            {age} ‧ {animal.gender} ‧ {animal.size} ‧ {animal.color && animal.color}
          </p>
        </div>
        <div className="animal-details__3">
          <h2>About</h2>
          {animal.houseTrained && (
            <>
              <h4>HOUSE-TRAINED</h4>
              <p>Yes</p>
            </>
          )}
          {(animal.vaccinated || animal.fixed || animal.specialNeeds) && (
            <>
              <h4>HEALTH</h4>
              <p>{createHealthString()}</p>
            </>
          )}
          {(animal.goodWithCats || animal.goodWithDogs|| animal.goodWithChildren || animal.goodWithOtherAnimals) && (
            <>
              <h4>GOOD IN A HOME WITH</h4>
              <p>{createGoodWith()}</p>
            </>
          )}
          <div>
            <h4>ADOPTION FEE</h4>
            <p>{animal.adoptionFee}</p>
          </div>
        </div>
        {animal.description && <div className="animal-details__4">
          <h2>Meet {animal.name}</h2>
          <p>{animal.description}</p>
        </div>}
      </div>
      {/* <div className="animal-card__wrapper">
        <div className="animal-card__top">
          <img className="animal-card__img" src={animal.previewImage} alt={animal.name}/>
          <button className="animal-card__fave">
            <i className="far fa-heart fa-lg"></i>
          </button>
        </div>
        <div className="animal-card__info">
          <h3 className="animal-card__name">{animal.name}</h3>
          <p>
            {animal.age} ‧ {breed}
          </p>
        </div>
      </div> */}
    </>
  );
}

export default AnimalDetailsPage;
