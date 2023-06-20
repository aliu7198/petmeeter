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
import FavoriteAnimalsList from "./components/FavoriteAnimalsList"
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import EditAnimalFormWrapper from "./components/EditAnimalFormWrapper";
import LandingPage from "./components/LandingPage";
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
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/animals">
            <AnimalsList />
          </Route>
          <Route exact path="/user/animals">
            <ProtectedRoute />
            <UserAnimalsList />
          </Route>
          <Route exact path="/animals/new">
            <ProtectedRoute />
            <CreateAnimalForm />
          </Route>
          <Route exact path="/animals/:animalId">
            <AnimalDetailsPage />
          </Route>
          <Route exact path="/animals/:animalId/edit">
            <ProtectedRoute />
            <EditAnimalFormWrapper />
          </Route>
          <Route exact path="/user/favorites">
            <ProtectedRoute />
            <FavoriteAnimalsList />
          </Route>
          <Route exact path="/user/searches">
            <ProtectedRoute />
            <SavedSearchesPage />
          </Route>
          <Route exact path="/loading">
            <Loading />
          </Route>
        </Switch>
      )}
      <Footer isLoaded={isLoaded} />
    </>
  );
}

export default App;
