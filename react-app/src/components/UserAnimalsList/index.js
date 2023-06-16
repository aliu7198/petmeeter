import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnimalsThunk } from "../../store/animals";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AnimalCard from "../AnimalsList/AnimalCard";
import "../AnimalsList/AnimalsList.css";
// import SearchFiltersBar from "../SearchFiltersBar";

function UserAnimalsList() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  // const { searchId } = useParams();
  const animals = useSelector((state) => state.animals.allAnimals);
  const animalsArr = Object.values(animals).filter((animal) => animal.ownerId === user.id)

  useEffect(() => {
    dispatch(getAnimalsThunk());
  }, [dispatch]);

  // const queryParams = new URLSearchParams().toString();
  // console.log("🚀 ~ file: index.js:21 ~ AnimalsPage ~ queryParams:", queryParams)
  if (!animals) return null;

  return (
    <>
      <div className="animals-list__outer">
        {/* <SearchFiltersBar /> */}
        <div className="animals-list__wrapper">
          {animalsArr.map((animal) => (
            <AnimalCard animal={animal} key={animal.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default UserAnimalsList;
