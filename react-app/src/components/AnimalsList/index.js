import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnimalsThunk } from "../../store/animals";
import { useParams, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "./AnimalsList.css";
import AnimalCard from "./AnimalCard";
import Loading from "../Loading";
// import SearchFiltersBar from "../SearchFiltersBar";

function AnimalsList() {
  const dispatch = useDispatch();
  // const { searchId } = useParams();
  const user = useSelector(state => state.session.user)
  const animals = useSelector((state) => state.animals.allAnimals);

  const animalsArr = user ? Object.values(animals).filter(animal => animal.ownerId !== user.id) : Object.values(animals);

  const queryString = window.location.search;
  // console.log("🚀 ~ file: index.js:18 ~ AnimalsList ~ queryString:", queryString)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAnimalsThunk(queryString))
      setIsLoading(false)
    }
    fetchData()
  }, [dispatch])

  // const queryParams = new URLSearchParams().toString();
  // console.log("🚀 ~ file: index.js:21 ~ AnimalsPage ~ queryParams:", queryParams)
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="animals-list__outer body">
        {/* <SearchFiltersBar /> */}
        <div className="animals-list__wrapper">
          {animalsArr.map((animal) => (
            <AnimalCard animal={animal} key={animal.id}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default AnimalsList;
