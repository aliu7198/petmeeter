const GET_FAVORITES = "favorites/getFavorites";

const getFavoritesAction = (favorites) => ({
  type: GET_FAVORITES,
  favorites,
});

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
    default:
        return state;
  }
};

export default favoritesReducer;
