import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnimalsThunk } from "../../store/animals";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AnimalCard from "../AnimalsList/AnimalCard";
import Loading from "../Loading";
import { getFavoritesThunk } from "../../store/favorites";
import "../AnimalsList/AnimalsList.css";
import "./FavoriteAnimalsList.css";

function FavoriteAnimalsList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const animals = useSelector((state) => state.favorites.allFavorites);
  const animalsArr = Object.values(animals)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getFavoritesThunk());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="animals-list__outer body">
        <h1 className="favorites-page__title">My Favorites ({animalsArr.length}) </h1>
        <div className="animals-list__wrapper">
          {animalsArr.map((animal) => (
            <AnimalCard animal={animal} key={animal.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default FavoriteAnimalsList;
