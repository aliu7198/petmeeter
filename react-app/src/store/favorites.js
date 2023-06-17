const GET_FAVORITES = "favorites/getFavorites";
const CREATE_FAVORITE = "favorites/createFavorite";

const getFavoritesAction = (favorites) => ({
  type: GET_FAVORITES,
  favorites,
});

const createFavoriteAction = (animal) => ({
  type: CREATE_FAVORITE,
  animal
})

export const getFavoritesThunk = () => async (dispatch) => {
  const res = await fetch(`/api/favorites/`);
  if (res.ok) {
    const favorites = await res.json();
    await dispatch(getFavoritesAction(favorites));
    return favorites;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const createFavoriteThunk = (animalId) => async dispatch => {
  const res = await fetch(`/api/favorites/animals/${animalId}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(animalId),
  })
  if (res.ok) {
    const animal = await res.json()
    await dispatch(createFavoriteAction(animal))
    return animal;
  } else {
    const errors = await res.json()
    return errors;
  }
}

const initialState = { allFavorites: {}, singleFavorite: {} };
const favoritesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_FAVORITES: {
      newState = { ...state, allFavorites: {}, singleFavorite: {} };
      for (let favorite of action.favorites) {
        newState.allFavorites[favorite.id] = favorite;
      }
      return newState;
    }
    case CREATE_FAVORITE: {
      newState = {...state, allFavorites: {...state.allFavorites}, singleFavorite: {}};
      newState.allFavorites[action.animal.id] = action.animal;
      return newState;
    }
    default:
        return state;
  }
};

export default favoritesReducer;
