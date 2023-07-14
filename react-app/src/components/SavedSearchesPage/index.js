import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SavedSearchesPage.css";
import { getSearchesThunk } from "../../store/searches";
import SearchCard from "./SearchCard";
import Loading from "../Loading";

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
    <div className="body">
      {searchesArr.map((search) => (
        <SearchCard search={search} key={search.id} />
      ))}
    </div>
  );
}

export default SavedSearchesPage;
