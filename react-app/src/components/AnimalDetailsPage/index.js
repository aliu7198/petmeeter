import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { getAnimalsThunk } from "../../store/animals";
import {
  createFavoriteThunk,
  deleteFavoriteThunk,
} from "../../store/favorites";
import Loading from "../Loading";
import "./AnimalDetailsPage.css";
import FavoriteButton from "../FavoriteButton";
import EditDeleteAnimalButton from "../EditDeleteAnimalButton";

function AnimalDetailsPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { animalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.session.user);
  const animals = useSelector((state) => state.animals.allAnimals);
  const animal = animals[animalId];
  // console.log("🚀 ~ file: index.js:25 ~ AnimalDetailsPage ~ animal:", animal);

  const isFavorite = animal?.favoritedBy
    ? animal.favoritedBy.includes(user?.id)
    : false;
  const [favorited, setFavorited] = useState(isFavorite);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAnimalsThunk());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleFavorite = async () => {
    if (!user) {
      return alert("Sign up or log in to add animals to favorites!");
    } else {
      if (!favorited) {
        await dispatch(createFavoriteThunk(animal.id));
        setFavorited(true);
      }
      if (favorited) {
        await dispatch(deleteFavoriteThunk(animal.id));
        setFavorited(false);
      }
    }
  };

  const getBreed = () => {
    let breed = animal.primaryBreed;
    if (animal.secondaryBreed) {
      if (animal.secondaryBreed === "Unknown") {
        breed += " Mix";
      } else {
        breed += ` & ${animal.secondaryBreed}`;
      }
    }
    return breed;
  };

  const getAge = () => {
    let age = animal.age;
    if (animal.type === "Cat" && animal.age === "Baby") age = "Kitten";
    if (animal.type === "Dog" && animal.age === "Baby") age = "Puppy";
    return age;
  };

  const createHealthString = () => {
    let health = [];
    if (animal.vaccinated) health.push("vaccinations up to date");
    if (animal.fixed) health.push("spayed / neutered");
    if (animal.specialNeeds) health.push("has special needs");
    const healthString = health.join(", ");
    const healthStringUpper =
      healthString.charAt(0).toUpperCase() + healthString.slice(1);
    return healthStringUpper;
  };

  const createGoodWith = () => {
    let goodWith = [];
    if (animal.goodWithCats) goodWith.push("cats");
    if (animal.goodWithDogs) goodWith.push("dogs");
    if (animal.goodWithChildren) goodWith.push("children");
    if (animal.goodWithOtherAnimals) goodWith.push("other animals");
    const goodWithString = goodWith.join(", ");
    const goodWithStringUpper =
      goodWithString.charAt(0).toUpperCase() + goodWithString.slice(1);
    return goodWithStringUpper;
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="body">
        <div className="animal-details__nav">
          {animal?.ownerId !== user?.id && (
            <div
              className="animal-details__nav-back"
              onClick={() => {
                history.push("/animals");
              }}
            >
              <i className="fa-solid fa-chevron-left" />
              <div>Pet search</div>
            </div>
          )}
          {animal?.ownerId === user?.id && (
            <div
              className="animal-details__nav-back"
              onClick={() => {
                history.push("/user/animals");
              }}
            >
              <i className="fa-solid fa-chevron-left" />
              <div>My animals</div>
            </div>
          )}
        </div>
        <div className="animal-images">
          {animal?.images.length &&
            animal?.images.map((image) => (
              // console.log(image.imageUrl);
              <img
                key={image.id}
                src={image.imageUrl}
                alt={animal?.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://cdn.discordapp.com/attachments/1118675490870399017/1120479857046990958/icon-image-not-found-free-vector.png";
                }}
              />
            ))}
        </div>
        <div className="animal-details__wrapper">
          <div className="animal-details__1">
            <h1>{animal?.name}</h1>
            <p>{getBreed()}</p>
          </div>
          <div className="animal-details__2">
            <p>
              {getAge()} ‧ {animal?.gender} ‧ {animal?.size}{" "}
              {animal?.color && `‧ ${animal?.color}`}
            </p>
          </div>
          <div className="animal-details__3">
            <h2>About</h2>
            {animal?.houseTrained && (
              <>
                <h4>HOUSE-TRAINED</h4>
                <p>Yes</p>
              </>
            )}
            {(animal?.vaccinated || animal?.fixed || animal?.specialNeeds) && (
              <>
                <h4>HEALTH</h4>
                <p>{createHealthString()}</p>
              </>
            )}
            {(animal?.goodWithCats ||
              animal?.goodWithDogs ||
              animal?.goodWithChildren ||
              animal?.goodWithOtherAnimals) && (
              <>
                <h4>GOOD IN A HOME WITH</h4>
                <p>{createGoodWith()}</p>
              </>
            )}
            <div>
              <h4>ADOPTION FEE</h4>
              <p>{animal?.adoptionFee}</p>
            </div>
          </div>
          {animal.description && (
            <div className="animal-details__4">
              <h2>Meet {animal?.name}</h2>
              <p className="animal-details__description">
                {animal?.description}
              </p>
            </div>
          )}
        </div>
        <div>
          <h3>Considering {animal?.name} for adoption?</h3>
          <button
            onClick={(e) => {
              alert("Feature coming soon!");
            }}
          >
            START YOUR INQUIRY
          </button>
          <div>
            {favorited ? (
              <i className="fa-solid fa-heart fa-2xl" />
            ) : (
              <i className="fa-regular fa-heart fa-2xl" />
            )}
            {favorited ? <div>UNFAVORITE</div> : <div>FAVORITE</div>}
          </div>
        </div>
      </div>
      <div className="animal-details__footer">
        <div className="animal-details__footer-left">
          <img
            src={animal?.previewImage}
            alt={animal?.name}
            className="animal-details__footer-img"
          />
          <div className="animal-details__footer-left-info">
            <p className="animal-details__footer-left-name">{animal?.name}</p>
            <p>
              {getBreed()} ‧ {getAge()} ‧ {animal?.gender}
            </p>
          </div>
        </div>
        {animal?.ownerId !== user?.id && (
          <FavoriteButton animal={animal} location="animal-details" />
        )}
        {animal?.ownerId === user?.id && (
          <EditDeleteAnimalButton animal={animal} location="animal-details" />
        )}
      </div>
    </>
  );
}

export default AnimalDetailsPage;
