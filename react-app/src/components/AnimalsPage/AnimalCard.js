import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './AnimalCard.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AnimalCard({animal}) {
    console.log("🚀 ~ file: AnimalCard.js:7 ~ AnimalCard ~ animal:", animal)
    const history = useHistory()
    // const dispatch = useDispatch();
    // const savedAnimales = useSelector(state => state.animales.allAnimales);
    // // console.log("🚀 ~ file: index.js:11 ~ SavedAnimalesPage ~ savedAnimales:", savedAnimales)

    // useEffect(() => {
    //     dispatch(getAnimalesThunk());
    // }, [dispatch])

    const launchAnimal = () => {
        history.push(`/animal/${animal.id}`)
    }

    return (
        <>
            <div className="animal-card__wrapper">
                <h3 className="animal-card__title">{animal.name}</h3>
            </div>
        </>
    )
}

export default AnimalCard;
