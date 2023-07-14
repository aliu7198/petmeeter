import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./SavedSearchesPage.css";
import { deleteSearchThunk, editedSearchThunk } from "../../store/searches";
import { useDispatch, useSelector } from "react-redux";
import "./SearchCard.css";

function SearchCard({ search }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  // console.log("🚀 ~ file: SearchCard.js:13 ~ SearchCard ~ editing:", editing)
  const [deleting, setDeleting] = useState(false);
  const [title, setTitle] = useState(search?.title);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const formErrors = {};
    title.length >= 5 ||
      (formErrors.title =
        "*Search nickname must be at least 5 characters long.");
    title.length <= 200 || (formErrors.title = "*Maximum 200 characters in search nickname.")
    setErrors(formErrors);
  }, [title]);

  const launchSearch = () => {
    let queryParams = "/animals?";
    let isFirstQueryParam = true;
    for (const [key, val] of Object.entries(search)) {
      if (key !== "id" && key !== "title" && key !== "userId" && val) {
        if (isFirstQueryParam) {
          queryParams += `${encodeURIComponent(key)}=${encodeURIComponent(
            val
          )}`;
          isFirstQueryParam = false;
        } else {
          queryParams += `&${encodeURIComponent(key)}=${encodeURIComponent(
            val
          )}`;
        }
      }
    }
    history.push(queryParams);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!Object.values(errors).length) {
      const formData = new FormData();
      formData.append("title", title);

      await dispatch(editedSearchThunk(formData, search.id));

      setErrors({});
      setHasSubmitted(false);
      setEditing(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteSearchThunk(search.id));
  };

  if (deleting) {
    return (
      <div className="search-card__wrapper">
        <div className="search-card__delete-body">
          <h3 className="search-card__title">Delete this search?</h3>
        </div>
        <div className="search-card__delete-button" onClick={handleDelete}>
          DELETE
        </div>
        <div
          className="search-card__delete-button"
          onClick={(e) => setDeleting(!deleting)}
        >
          CANCEL
        </div>
      </div>
    );
  }

  if (!deleting) {
    return (
      <div className="search-card__wrapper">
        <div className="search-card__body">
          {editing ? (
            <div className="search-card__edit-wrapper">
              <textarea
                className="search-card__edit-textarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                minLength="5"
                maxLength="200"
              ></textarea>
              <p className="search__errors">{hasSubmitted && errors?.title}</p>
            </div>
          ) : (
            <h3 className="search-card__title">{`"${search.title}"`}</h3>
          )}
        </div>
        <div className="search-card__actions">
          {!editing ? (
            <button className="search-card__launch" onClick={launchSearch}>
              LAUNCH SEARCH
            </button>
          ) : (
            <button className="search-card__launch" onClick={handleSubmit}>
              CHANGE
            </button>
          )}
          <div className="search-card__buttons">
            <button
              className="search-card__button border-bottom"
              onClick={(e) => setEditing(!editing)}
            >
              <i className="fas fa-pen fa-xl"></i>
            </button>
            <button
              className="search-card__button"
              onClick={(e) => setDeleting(!deleting)}
            >
              <i className="fas fa-trash fa-xl"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchCard;
