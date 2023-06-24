import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnimalsThunk } from "../../store/animals";
import AnimalCard from "../AnimalsList/AnimalCard";
import "../AnimalsList/AnimalsList.css";
import Loading from "../Loading";

function UserAnimalsList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const animals = useSelector((state) => state.animals.allAnimals);
  const animalsArr = Object.values(animals).filter(
    (animal) => animal.ownerId === user.id
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAnimalsThunk());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="animals-list__outer body">
        <h1 className="favorites-page__title">
          My Animal Listings ({animalsArr.length})
        </h1>
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
