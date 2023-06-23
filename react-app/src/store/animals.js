const GET_ANIMALS = "animals/getAnimals";
const SINGLE_ANIMAL = "animals/singleAnimal";
const CREATE_ANIMAL = "animals/createAnimal";
const DELETE_ANIMAL = "animals/deleteAnimal";
// const ADD_ANIMAL_LOCAL_STORAGE = "animal/localStorageAnimal";

const getAnimalsAction = (animals) => ({
  type: GET_ANIMALS,
  animals,
});

const singleAnimalAction = (animal) => ({
  type: SINGLE_ANIMAL,
  animal,
});

const createAnimalAction = (animal) => ({
  type: CREATE_ANIMAL,
  animal,
});

const deleteAnimalAction = (animalId) => ({
  type: DELETE_ANIMAL,
  animalId,
});

// const addAnimalLocalStorageAction = (animal) => ({
//   type: ADD_ANIMAL_LOCAL_STORAGE,
//   animal,
// });

export const getAnimalsThunk =
  (searchParams = "") =>
  async (dispatch) => {
    const res = await fetch(`/api/animals${searchParams}`);
    if (res.ok) {
      const animals = await res.json();
      await dispatch(getAnimalsAction(animals));
      return animals;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const singleAnimalThunk = (animalId) => async (dispatch) => {
  const res = await fetch(`/api/animals/${animalId}`);
  if (res.ok) {
    const animal = await res.json();
    await dispatch(singleAnimalAction(animal));
    return animal;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const createAnimalThunk = (animal) => async (dispatch) => {
  const res = await fetch(`/api/animals/new`, {
    method: "POST",
    body: animal,
  });

  if (res.ok) {
    const newAnimal = await res.json();
    await dispatch(createAnimalAction(newAnimal));
    return newAnimal;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const editAnimalThunk = (animal, animalId) => async (dispatch) => {
  const res = await fetch(`/api/animals/${animalId}`, {
    method: "PUT",
    body: animal,
  });

  if (res.ok) {
    const editedAnimal = await res.json();
    await dispatch(createAnimalAction(editedAnimal));
    return editedAnimal;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteAnimalThunk = (animalId) => async (dispatch) => {
  const res = await fetch(`/api/animals/${animalId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const response = await res.json();
    dispatch(deleteAnimalAction(animalId));
    return response;
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = { allAnimals: {}, singleAnimal: {} };
const animalsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ANIMALS: {
      newState = { ...state, allAnimals: {}, singleAnimal: {} };
      for (let animal of action.animals) {
        newState.allAnimals[animal.id] = animal;
      }
      return newState;
    }
    case SINGLE_ANIMAL: {
      newState = {
        ...state,
        allAnimals: { ...state.allAnimals },
        singleAnimal: {},
      };
      newState.singleAnimal = action.animal;
      return newState;
    }
    case CREATE_ANIMAL: {
      newState = { ...state, allAnimals: {}, singleAnimal: {} };
      newState.allAnimals[action.animal.id] = action.animal;
      return newState;
    }
    case DELETE_ANIMAL: {
      newState = {
        ...state,
        allAnimals: { ...state.allAnimals },
        singleAnimal: {},
      };
      delete newState.allAnimals[action.animalId];
      return newState;
    }
    default:
      return state;
  }
};

export default animalsReducer;
