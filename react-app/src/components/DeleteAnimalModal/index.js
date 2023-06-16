import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAnimalThunk } from "../../store/animals";
import "./DeleteAnimalModal.css";

const DeleteAnimalModal = ({ animal }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    return dispatch(deleteAnimalThunk(animal.id)).then(closeModal);
  };

  return (
    <div className="animal-form__wrapper">
      <h3 className="animal-form__title">
        Delete animal?{" "}
        <button
          className="close-modal animal-form__close-modal"
          onClick={closeModal}
        >
          <i class="fas fa-times fa-lg" />
        </button>
      </h3>
      <div className="modal__wrapper">
        <div className="animal-form__body">
          <p className="delete-modal__text">Are you sure you want to delete this animal?</p>
          <div className="delete-modal__buttons">
            <button onClick={closeModal} className="delete-modal__no-btn">
              Cancel
            </button>
            <button onClick={handleDelete} className="delete-modal__yes-btn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAnimalModal;
