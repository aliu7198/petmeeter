import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import "./CreatedSearchModal.css";

const CreatedSearchModal = ({ search }) => {
  const { closeModal } = useModal();

  return (
    <div className="search-modal__wrapper">
      <div className="search-modal__top">
        <i className="fa-regular fa-circle-check fa-2xl"></i>
        <h2>Your search was saved</h2>
      </div>
      <div className="search-modal__bottom">
        <h3 className="search-modal__title">SEARCH NICKNAME</h3>
        <h4 className="search-modal__sub">{search?.title}</h4>
        <button id="search-modal__btn" className="animal-form__submit-btn" onClick={closeModal}>DONE</button>
        <div className="search-modal__link">
          <Link to="/user/searches" onClick={closeModal}>
            MANAGE SAVED SEARCHES
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatedSearchModal;
