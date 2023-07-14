const GET_SEARCHES = "searches/getSearches";
const CREATE_SEARCH = "searches/createSearch";
const DELETE_SEARCH = "searches/deleteSearch";

const getSearchesAction = (searches) => ({
  type: GET_SEARCHES,
  searches,
});

const createSearchAction = (search) => ({
  type: CREATE_SEARCH,
  search,
});

const deleteSearchAction = (searchId) => ({
  type: DELETE_SEARCH,
  searchId,
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

export const editedSearchThunk = (search, searchId) => async (dispatch) => {
  const res = await fetch(`/api/searches/${searchId}`, {
    method: "PUT",
    body: search,
  });

  if (res.ok) {
    const editedSearch = await res.json();
    await dispatch(createSearchAction(editedSearch));
    return editedSearch;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteSearchThunk = (searchId) => async (dispatch) => {
  const res = await fetch(`/api/searches/${searchId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const response = await res.json();
    dispatch(deleteSearchAction(searchId));
    return response;
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
      newState = {
        ...state,
        allSearches: { ...state.allSearches },
        singleSearch: {},
      };
      newState.allSearches[action.search.id] = action.search;
      return newState;
    }
    case DELETE_SEARCH: {
      newState = {
        ...state,
        allSearches: { ...state.allSearches },
        singleSearch: {},
      };
      delete newState.allSearches[action.searchId];
      return newState;
    }
    default:
      return state;
  }
};

export default searchesReducer;
