const GET_ANIMALS = "animals/getAnimals"
const SINGLE_ANIMAL = "animals/singleAnimal"
const CREATE_ANIMAL = "animals/createAnimal"

const getAnimalsAction = (animals) => ({
    type: GET_ANIMALS,
    animals
})

const singleAnimalAction = (animal) => ({
    type: SINGLE_ANIMAL,
    animal
})

const createAnimalAction = (animal) => ({
    type: CREATE_ANIMAL,
    animal
})


export const getAnimalsThunk = () => async(dispatch) => {
    const res = await fetch(`/api/animals/`)
    if (res.ok) {
        const animals = await res.json()
        // console.log("🚀 ~ file: animals.js:14 ~ getAnimalsThunk ~ animals:", animals)
        await dispatch(getAnimalsAction(animals))
        return animals
    } else {
        const errors = await res.json()
        // console.log("🚀 ~ file: animals.js:18 ~ getAnimalsThunk ~ errors:", errors)
        return errors
    }
}

export const singleAnimalThunk = (animalId) => async (dispatch) => {
    const res = await fetch(`/api/animals/${animalId}`)
    if (res.ok) {
        const animal = await res.json()
        await dispatch(singleAnimalAction(animal))
        return animal
    } else {
        const errors = await res.json()
        return errors
    }
}

export const createAnimalThunk = (animal) => async(dispatch) => {
    const res = await fetch(`/api/animals/new`, {
        method: 'POST',
        body: animal
    })

    console.log("🚀 ~ file: animals.js:32 ~ createAnimalThunk ~ res:", res)
    if (res.ok) {
        const newAnimal = await res.json()
        console.log("🚀 ~ file: animals.js:37 ~ createAnimalThunk ~ newAnimal:", newAnimal)
        await dispatch(createAnimalAction())
        return newAnimal
    } else {
        const errors = await res.json()
        console.log("🚀 ~ file: animals.js:42 ~ createAnimalThunk ~ errors:", errors)
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
        case SINGLE_ANIMAL: {
            newState = {...state, allAnimals: {...state.allAnimals}, singleAnimal: {}}
            newState.singleAnimal = action.animal
            return newState
        }
        case CREATE_ANIMAL: {
            newState = {...state, allAnimals: {}, singleAnimal: {}}
            newState.allAnimals[action.animal.id] = action.animal
            return newState
        }
        default:
            return state;
    }
}

export default animalsReducer
