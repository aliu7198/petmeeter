import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnimalsThunk } from "../../store/animals";
import "./AnimalsList.css";
import AnimalCard from "./AnimalCard";
import Loading from "../Loading";
// import SearchFiltersBar from "../SearchFiltersBar";

function AnimalsList() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const animals = useSelector((state) => state.animals.allAnimals);
  const [sort, setSort] = useState('Randomize');

  const animalsArr = user ? Object.values(animals).filter(animal => animal.ownerId !== user.id) : Object.values(animals);

  if (sort === 'Randomize') {
    animalsArr.sort(() => (Math.random() > .5) ? 1 : -1);
  } else if (sort === 'A to Z') {
    animalsArr.sort((a, b) => {
      const animalA = a.name.toUpperCase();
      const animalB = b.name.toUpperCase();
      return (animalA < animalB) ? -1 : (animalA > animalB) ? 1 : 0;
    })
  } else if (sort === "Z to A") {
    animalsArr.sort((a, b) => {
      const animalA = a.name.toUpperCase();
      const animalB = b.name.toUpperCase();
      return (animalA > animalB) ? -1 : (animalA < animalB) ? 1 : 0;
    })
  } else if (sort === "Oldest Addition") {
    animalsArr.sort((a, b) => {
      const animalA = new Date(a.createdAt)
      const animalB = new Date(b.createdAt)
      return (animalA < animalB) ? -1 : (animalA > animalB) ? 1 : 0;
    })
  } else if (sort === "Newest Addition") {
    animalsArr.sort((a, b) => {
      const animalA = new Date(a.createdAt)
      const animalB = new Date(b.createdAt)
      return (animalA > animalB) ? -1 : (animalA < animalB) ? 1 : 0;
    })
  }


  const queryString = window.location.search;

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAnimalsThunk(queryString))
      setIsLoading(false)
    }
    fetchData()
  }, [dispatch, queryString])

  // const queryParams = new URLSearchParams().toString();
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="animals-list__outer body">
        {/* <div className="animals-list__nav">
          <div>{animalsArr.length}</div>
        </div> */}
        {/* <SearchFiltersBar /> */}
        <div>
        <label>
            Sort By:
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="Randomize" default>
              Randomize</option>
              <option value="A to Z">A to Z</option>
              <option value="Z to A">Z to A</option>
              <option value="Newest Addition">Newest Addition</option>
              <option value="Oldest Addition">Oldest Addition</option>
            </select>
          </label>
        </div>
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
