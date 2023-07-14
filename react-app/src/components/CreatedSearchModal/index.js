import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import "./CreatedSearchModal.css";

const CreatedSearchModal = ({ search }) => {
  console.log("🚀 ~ file: index.js:7 ~ CreatedSearchModal ~ search:", search)
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  //   const handleDelete = async (e) => {
  //     e.preventDefault();
  //     return dispatch(deleteAnimalThunk(animal.id))
  //       .then(closeModal)
  //       .then(history.push("/user/animals"));
  //   };

  return (
    <div className="search-modal__wrapper">
      <div className="search-modal__top">
        <i className="fa-regular fa-circle-check fa-2xl"></i>
        <h3 className="search-modal__title">Your search was saved</h3>
        <h4>SEARCH NICKNAME</h4>
        <h4>{search?.title}</h4>
      </div>
    </div>
  );
};

export default CreatedSearchModal;
