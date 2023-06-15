const GET_SEARCHES = "searches/getSearches"


const getSearchesAction = (searches) => ({
    type: GET_SEARCHES,
    searches
})


export const getSearchesThunk = () => async (dispatch) => {
    const res = await fetch("/api/searches/current")
    if (res.ok) {
        const searches = await res.json()
        dispatch(getSearchesAction(searches))
        return searches
    } else {
        const errors = await res.json()
        return errors
    }
}


const initialState = {allSearches: {}, singleSearch: {}}
const searchesReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type) {
        case GET_SEARCHES: {
            newState = {...state, allSearches: {}, singleSearch: {}}
            for (let search of action.searches) {
                newState.allSearches[search.id] = search
            }
            return newState
        }
        default:
            return state;
    }
}

export default searchesReducer;
