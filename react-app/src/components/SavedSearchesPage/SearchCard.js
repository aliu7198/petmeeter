import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './SavedSearchesPage.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SearchCard({search}) {
    const history = useHistory()
    // const dispatch = useDispatch();
    // const savedSearches = useSelector(state => state.searches.allSearches);
    // // console.log("🚀 ~ file: index.js:11 ~ SavedSearchesPage ~ savedSearches:", savedSearches)

    // useEffect(() => {
    //     dispatch(getSearchesThunk());
    // }, [dispatch])

    const launchSearch = () => {
        history.push(`/search/${search.id}`)
    }

    return (
        <>
            <div className="search-card__wrapper">
                <h3 className="search-card__title">{search.title}</h3>
                <button className="search-card__launch" onClick={launchSearch}>Launch Search</button>
                <div>
                    <button><i className="fas fa-pen"></i></button>
                    <button><i className="fas fa-trash"></i></button>
                </div>
            </div>
        </>
    )
}

export default SearchCard;
