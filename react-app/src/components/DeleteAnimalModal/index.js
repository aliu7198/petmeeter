import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { deleteAnimalThunk } from "../../store/animals";
import "./DeleteAnimalModal.css";

const DeleteAnimalModal = ({ animal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    return dispatch(deleteAnimalThunk(animal.id))
      .then(closeModal)
      .then(history.push("/user/animals"));
  };

  return (
    <div className="delete-modal__wrapper">
      <div className="delete-modal__top">
        <h2 className="delete-modal__title">
          Delete animal?
          {/* <button
          className="close-modal animal-form__close-modal"
          onClick={closeModal}
        >
          <i className="fas fa-times fa-lg" />
        </button> */}
        </h2>
        <p className="delete-modal__text">
          Are you sure you want to remove this animal from your listings?
        </p>
      </div>
      <div className="delete-modal__buttons">
        <button onClick={closeModal} className="delete-modal__no-btn">
          Cancel
        </button>
        <button onClick={handleDelete} className="delete-modal__yes-btn">
          Yes, they were adopted!
        </button>
      </div>
    </div>
  );
};

export default DeleteAnimalModal;
