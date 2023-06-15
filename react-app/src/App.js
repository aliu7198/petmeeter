import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SavedSearchesPage from "./components/SavedSearchesPage";
import AnimalsPage from "./components/AnimalsPage";
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
            <AnimalsPage />
          </Route>
          <Route exact path="/user/searches">
            <SavedSearchesPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
