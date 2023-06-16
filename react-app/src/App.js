import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SavedSearchesPage from "./components/SavedSearchesPage";
import AnimalsList from "./components/AnimalsList";
import CreateAnimalForm from "./components/CreateAnimalForm";
import AnimalDetailsPage from "./components/AnimalDetailsPage";
import UserAnimalsList from "./components/UserAnimalsList";
import EditAnimalForm from "./components/EditAnimalForm";
import Loading from "./components/Loading";
// import SearchFiltersBar from "./components/SearchFiltersBar";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
          // <Route path="/search/:searchId">
          //   {/* <SearchFiltersBar /> */}
          //   <AnimalsPage />
          // </Route>

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/animals">
            <AnimalsList />
          </Route>
          <Route exact path="/user/animals">
            <UserAnimalsList />
          </Route>
          <Route exact path="/animals/new">
            <CreateAnimalForm />
          </Route>
          <Route exact path="/animals/:animalId">
            <AnimalDetailsPage />
          </Route>
          <Route exact path="/animals/:animalId/edit">
            <EditAnimalForm />
          </Route>
          <Route exact path="/user/searches">
            <SavedSearchesPage />
          </Route>
          <Route exact path="/loading">
            <Loading />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
