import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchAnimalsThunk } from "../../store/animals";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './AnimalsPage.css'
import AnimalCard from "./AnimalCard";

function AnimalsPage() {
  const dispatch = useDispatch();
  const {searchId} = useParams()
//   console.log("🚀 ~ file: index.js:11 ~ AnimalsPage ~ searchId:", searchId)
  const animals = useSelector((state) => state.animals.allAnimals);
//   console.log("🚀 ~ file: index.js:13 ~ AnimalsPage ~ animals:", animals)
  const animalsArr = Object.values(animals);

  useEffect(() => {
    dispatch(searchAnimalsThunk(searchId));
  }, [dispatch, searchId]);

  return (
    <div className="animals-page__wrapper">
        {animalsArr.map((animal) => (
            <AnimalCard animal={animal} />
        ))}
    </div>
  );
}

export default AnimalsPage;
