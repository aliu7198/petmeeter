import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./FavoriteButton.css";
import {
  createFavoriteThunk,
  deleteFavoriteThunk,
} from "../../store/favorites";

const FavoriteButton = ({ animal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const isFavorite = animal.favoritedBy.includes(user.id);
  const [favorited, setFavorited] = useState(isFavorite);

  const handleFavorite = async () => {
    if (!favorited) {
      await dispatch(createFavoriteThunk(animal.id));
      setFavorited(true);
    }
    if (favorited) {
      await dispatch(deleteFavoriteThunk(animal.id));
      setFavorited(false);
    }
  };

  // TODO: sometimes receive an error about needing a cleanup function, research this.

  //   useEffect(() => {
  //     return () => {

  //     };
  //   }, []);

  return (
    <button className="animal-card__btn" onClick={handleFavorite}>
      {favorited ? (
        <i className="fa-solid fa-heart fa-2xl" />
      ) : (
        <i className="fa-regular fa-heart fa-2xl" />
      )}
    </button>
  );
};

export default FavoriteButton;