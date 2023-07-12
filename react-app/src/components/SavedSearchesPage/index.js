import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SavedSearchesPage.css";
import { getSearchesThunk } from "../../store/searches";
import SearchCard from "./SearchCard";

function SavedSearchesPage() {
  const dispatch = useDispatch();
  const savedSearches = useSelector((state) => state.searches.allSearches);
  const searchesArr = Object.values(savedSearches);

  useEffect(() => {
    dispatch(getSearchesThunk());
  }, [dispatch]);

  return (
    <div className="body">
      {searchesArr.map((search) => (
        <SearchCard search={search} key={search.id} />
      ))}
    </div>
  );
}

export default SavedSearchesPage;
