const GET_SEARCHES = "searches/getSearches";
const CREATE_SEARCH = "searches/createSearch";

const getSearchesAction = (searches) => ({
  type: GET_SEARCHES,
  searches,
});

const createSearchAction = (search) => ({
  type: CREATE_SEARCH,
  search,
});

export const getSearchesThunk = () => async (dispatch) => {
  const res = await fetch("/api/searches/current");
  if (res.ok) {
    const searches = await res.json();
    dispatch(getSearchesAction(searches));
    return searches;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const createSearchThunk = (search) => async (dispatch) => {
  const res = await fetch("/api/searches/new", {
    method: "POST",
    body: search,
  });

  if (res.ok) {
    const newSearch = await res.json();
    await dispatch(createSearchAction(newSearch));
    return newSearch;
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = { allSearches: {}, singleSearch: {} };
const searchesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_SEARCHES: {
      newState = { ...state, allSearches: {}, singleSearch: {} };
      for (let search of action.searches) {
        newState.allSearches[search.id] = search;
      }
      return newState;
    }
    case CREATE_SEARCH: {
      newState = { ...state, allSearches: {...state.allSearches}, singleSearch: {} };
      newState.allSearches[action.search.id] = action.search;
      return newState;
    }
    default:
      return state;
  }
};

export default searchesReducer;
