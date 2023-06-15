const GET_ANIMALS = "animals/getAnimals"


const getAnimalsAction = (animals) => ({
    type: GET_ANIMALS,
    animals
})


export const getAnimalsThunk = () => async(dispatch) => {
    const res = await fetch(`/api/animals`, {
        headers: {
			"Content-Type": "application/json",
		}
    })
    if (res.ok) {
        const animals = await res.json()
        console.log("🚀 ~ file: animals.js:14 ~ getAnimalsThunk ~ animals:", animals)
        dispatch(getAnimalsAction(animals))
        return animals
    } else {
        const errors = await res.json()
        console.log("🚀 ~ file: animals.js:18 ~ getAnimalsThunk ~ errors:", errors)
        return errors
    }
}


const initialState = {allAnimals: {}, singleAnimal: {}}
const animalsReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type) {
        case GET_ANIMALS: {
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
