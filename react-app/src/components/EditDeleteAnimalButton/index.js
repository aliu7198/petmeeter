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

const EditDeleteAnimalButton = ({ animal, location }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const buttonClass = () => {
    let className = "animal-card__btn";
    if (location === "animal-details") {
      className += " purple-fave"
    } else {
      className += " white-fave"
    }
    return className;
  }

  const modalButtonClass = () => {
    let className = "animal-card__modal-btn";
    if (location === "animal-details") {
      className += " purple-delete"
    } else {
      className += " white-delete"
    }
    return className;
  }

  const divClass = () => {
    let className = "edit-delete-btn__wrapper";
    if (location === "animal-details") {
      className += "-horizontal"
    } else {
      className += "-vertical"
    }
    return className;
  }

  return (
    <div className={divClass()}>
      <button
        onClick={() => {
          history.push(`/animals/${animal.id}/edit`);
        }}
        className={buttonClass()}
      >
        <i className="fa-solid fa-pen fa-xl"></i>
      </button>
      <div className={modalButtonClass()}>
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
