import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SavedSearchesPage.css";
import { getSearchesThunk } from "../../store/searches";
import SearchCard from "./SearchCard";
import Loading from "../Loading";
import "./SavedSearchesPage.css";

function SavedSearchesPage() {
  const dispatch = useDispatch();
  const savedSearches = useSelector((state) => state.searches.allSearches);
  const searchesArr = Object.values(savedSearches);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSearchesThunk());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return (
    <div className="searches__outer body">
      <div className="searches__wrapper">
        <h1 className="searches__title">My Saved Searches</h1>
        <div className="searches__searches-list">
          {searchesArr.map((search) => (
            <SearchCard search={search} key={search.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedSearchesPage;
