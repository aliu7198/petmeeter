const SEARCH_ANIMALS = "animals/searchAnimals"


const searchAnimalsAction = (animals) => ({
    type: SEARCH_ANIMALS,
    animals
})


export const searchAnimalsThunk = (searchId) => async(dispatch) => {
    const res = await fetch(`/api/animals/search/${searchId}`)
    if (res.ok) {
        const animals = await res.json()
        dispatch(searchAnimalsAction(animals))
        return animals
    } else {
        const errors = await res.json()
        return errors
    }
}


const initialState = {allAnimals: {}, singleAnimal: {}}
const animalsReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type) {
        case SEARCH_ANIMALS: {
            newState = {...state, allAnimals: {}, singleAnimal: {}}
            for (let animal of action.animals) {
                newState.allAnimals[animal.id] = animal
            }
            return newState
        }
        default:
            return state;
    }
}

export default animalsReducer
