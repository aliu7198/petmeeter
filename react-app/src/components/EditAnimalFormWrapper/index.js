import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAnimalsThunk } from "../../store/animals";
import Loading from "../Loading";
import EditAnimalForm from "../EditAnimalForm";

const EditAnimalFormWrapper = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { animalId } = useParams();

  const animals = useSelector((state) => state.animals.allAnimals);
  const animal = animals[animalId];

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAnimalsThunk());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return <EditAnimalForm animal={animal} />;
};

export default EditAnimalFormWrapper;
