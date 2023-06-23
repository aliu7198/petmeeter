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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import OpenModalButton from "../OpenModalButton";
import DeleteAnimalModal from "../DeleteAnimalModal";
import { useModal } from "../../context/Modal";
import { addRecentlyViewedAnimal } from "../../utils/recentlyViewedAnimals";

function AnimalDetailsPage() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const { animalId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.session.user);
  const animals = useSelector((state) => state.animals.allAnimals);
  const animal = animals[animalId];

  const [favorited, setFavorited] = useState(
    animal?.favoritedBy ? animal.favoritedBy.includes(user?.id) : false
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAnimalsThunk())
      .then(addRecentlyViewedAnimal(animal, user))
      .then(setIsLoading(false));
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
        {animal?.images.length >= 3 && (
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            // autoPlay={this.props.deviceType !== "mobile" ? true : false}
            // autoPlay={true}
            // autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item"
          >
            {animal?.images.map((image) => (
              <img
                key={image.id}
                src={image.imageUrl}
                alt={animal?.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://cdn.discordapp.com/attachments/1118675490870399017/1120479857046990958/icon-image-not-found-free-vector.png";
                }}
                // onClick={e => console.log('CLICK')}
              />
            ))}
          </Carousel>
        )}
        {animal?.images.length <= 2 && (
          <div className="animal-images-no-carousel">
            {animal?.images.length &&
              animal?.images.map((image) => (
                <img
                  className="animal-image-no-carousel"
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
        )}

        <div className="animal-details__wrapper">
          <div className="animal-details__info">
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
                <div>
                  <h4>HOUSE-TRAINED</h4>
                  <p>Yes</p>
                </div>
              )}
              {(animal?.vaccinated ||
                animal?.fixed ||
                animal?.specialNeeds) && (
                <div>
                  <h4>HEALTH</h4>
                  <p>{createHealthString()}</p>
                </div>
              )}
              {(animal?.goodWithCats ||
                animal?.goodWithDogs ||
                animal?.goodWithChildren ||
                animal?.goodWithOtherAnimals) && (
                <div>
                  <h4>GOOD IN A HOME WITH</h4>
                  <p>{createGoodWith()}</p>
                </div>
              )}
              <div>
                <h4>ADOPTION FEE</h4>
                <p>$ {(+animal?.adoptionFee).toFixed(2)}</p>
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
          <div className="animal-details__inquiry-card">
            <div className="animal-details__inquiry-card-top">
              {animal?.ownerId === user?.id && (
                <h3>Find the best home for {animal.name}!</h3>
              )}

              {animal?.ownerId !== user?.id && (
                <h3>Considering {animal?.name} for adoption?</h3>
              )}

              {animal?.ownerId !== user?.id && (
                <button
                  className="animal-details__inquiry-btn"
                  onClick={(e) => {
                    alert("Feature coming soon!");
                  }}
                >
                  START YOUR INQUIRY
                </button>
              )}

              {animal?.ownerId === user?.id && (
                <button
                  className="animal-details__inquiry-btn"
                  onClick={(e) => {
                    alert("Feature coming soon!");
                  }}
                >
                  CHECK INQUIRIES
                </button>
              )}
            </div>

            {animal?.ownerId !== user?.id && (
              <div
                onClick={handleFavorite}
                className="animal-details__inquiry-fave"
              >
                {favorited ? (
                  <i className="fa-solid fa-heart fa-2xl" />
                ) : (
                  <i className="fa-regular fa-heart fa-2xl" />
                )}
                {favorited ? <p>UNFAVORITE</p> : <p>FAVORITE</p>}
              </div>
            )}

            {animal?.ownerId === user?.id && (
              <div
                onClick={handleFavorite}
                className="animal-details__inquiry-edit-delete"
              >
                <div
                  onClick={() => {
                    history.push(`/animals/${animal.id}/edit`);
                  }}
                  className="animal-details__inquiry-edit-btn"
                >
                  <i className="fa-solid fa-pen fa-xl" />
                  <div>EDIT</div>
                </div>
                <div className="animal-details__inquiry-delete-btn">
                  <OpenModalButton
                    buttonText={
                      <>
                        <i className="fa-solid fa-trash fa-xl"></i>
                        <div>DELETE</div>
                      </>
                    }
                    onItemClick={closeModal}
                    modalComponent={<DeleteAnimalModal animal={animal} />}
                  />
                </div>
              </div>
            )}
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
          // <FavoriteButton animal={animal} location="animal-details" />
          <button
            className="animal-card__btn purple-fave"
            onClick={handleFavorite}
          >
            {favorited ? (
              <i className="fa-solid fa-heart fa-2xl" />
            ) : (
              <i className="fa-regular fa-heart fa-2xl" />
            )}
          </button>
        )}
        {animal?.ownerId === user?.id && (
          <EditDeleteAnimalButton animal={animal} location="animal-details" />
        )}
      </div>
    </>
  );
}

export default AnimalDetailsPage;
