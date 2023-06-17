import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EditDeleteAnimalButton.css";
import {
  createFavoriteThunk,
  deleteFavoriteThunk,
} from "../../store/favorites";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteAnimalModal from "../DeleteAnimalModal";
import { useModal } from "../../context/Modal";

const EditDeleteAnimalButton = ({ animal }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  return (
    <div>
      <button
        onClick={() => {
          history.push(`/animals/${animal.id}/edit`);
        }}
        className="animal-card__btn"
      >
        <i className="fa-solid fa-pen fa-xl"></i>
      </button>
      <div className="animal-card__btn">
        <OpenModalButton
          buttonText={<i className="fa-solid fa-trash fa-xl" />}
          onItemClick={closeModal}
          modalComponent={<DeleteAnimalModal animal={animal} />}
        />
      </div>
    </div>
  );
};

export default EditDeleteAnimalButton;
