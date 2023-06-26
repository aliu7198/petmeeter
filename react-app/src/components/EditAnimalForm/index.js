import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAnimalThunk } from "../../store/animals";
import Loading from "../Loading";
import "../CreateAnimalForm/CreateAnimalForm.css";

const EditAnimalForm = ({ animal }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { animalId } = useParams();
  // const user = useSelector((state) => state.session.user);

  const [type, setType] = useState(animal?.type);
  const [name, setName] = useState(animal?.name);
  const [age, setAge] = useState(animal?.age);
  const [gender, setGender] = useState(animal?.gender);
  const [size, setSize] = useState(animal?.size);
  const [primaryBreed, setPrimaryBreed] = useState(animal?.primaryBreed);
  const [secondaryBreed, setSecondaryBreed] = useState(animal.secondaryBreed ? animal.secondaryBreed : "");
  const [color, setColor] = useState(animal.color ? animal.color : "");
  const [houseTrained, setHouseTrained] = useState(animal?.houseTrained);
  const [vaccinated, setVaccinated] = useState(animal?.vaccinated);
  const [fixed, setFixed] = useState(animal?.fixed);
  const [specialNeeds, setSpecialNeeds] = useState(animal?.specialNeeds);
  const [goodWithCats, setGoodWithCats] = useState(animal?.goodWithCats);
  const [goodWithDogs, setGoodWithDogs] = useState(animal?.goodWithDogs);
  const [goodWithChildren, setGoodWithChildren] = useState(
    animal?.goodWithChildren
  );
  const [goodWithOtherAnimals, setGoodWithOtherAnimals] = useState(
    animal?.goodWithOtherAnimals
  );
  const [description, setDescription] = useState(animal.description ? animal.description : "");
  const [adoptionFee, setAdoptionFee] = useState(animal?.adoptionFee);
  // const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const formErrors = {};
    type || (formErrors.type = "Type is required.");
    name || (formErrors.name = "Name is required.");
    name?.length <= 100 ||
      (formErrors.name = "Maximum 100 characters in name.");
    age || (formErrors.age = "Age is required.");
    gender || (formErrors.gender = "Gender is required.");
    size || (formErrors.size = "Size is required.");
    primaryBreed || (formErrors.primaryBreed = "Primary breed is required.");
    primaryBreed?.length <= 50 ||
    (formErrors.primaryBreed = "Maximum 50 characters in Primary Breed.");
    secondaryBreed?.length <= 50 ||
    (formErrors.secondaryBreed = "Maximum 50 characters in Secondary Breed.");
    color?.length <= 50 ||
      (formErrors.color = "Maximum 50 characters in Color.");
    description?.length <= 2000 ||
      (formErrors.description = "Maximum 2000 characters in description.");
    adoptionFee >= 1 ||
      (formErrors.adoptionFee =
        "Adoption fee is required and cannot be negative.");
    // images.length >= 1 ||
    //   (formErrors.images = "At least one image is required.");
    setErrors(formErrors);
  }, [
    type,
    name,
    age,
    gender,
    size,
    primaryBreed,
    secondaryBreed,
    color,
    description,
    adoptionFee,
    // images,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!Object.values(errors).length) {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("name", name);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("size", size);
      formData.append("primary_breed", primaryBreed);
      formData.append("secondary_breed", secondaryBreed);
      formData.append("color", color);
      formData.append("house_trained", houseTrained);
      formData.append("vaccinated", vaccinated);
      formData.append("fixed", fixed);
      formData.append("special_needs", specialNeeds);
      formData.append("good_with_cats", goodWithCats);
      formData.append("good_with_dogs", goodWithDogs);
      formData.append("good_with_children", goodWithChildren);
      formData.append("good_with_other_animals", goodWithOtherAnimals);
      formData.append("description", description);
      formData.append("adoption_fee", adoptionFee);

      // for (let image of images) {
      //     formData.append("images", image);
      // }

      const editedAnimal = await dispatch(editAnimalThunk(formData, animalId));

      setErrors({});
      setHasSubmitted(false);
      history.push(`/animals/${editedAnimal.id}`);
      // history.push(`/animals`)
    }
  };

  //   const handleImageChange = (e) => {
  //     const selectedFiles = Array.from(e.target.files);
  //     if (selectedFiles.length <= 5) {
  //       setImages(selectedFiles);
  //     } else {
  //       alert(`Maximum 5 images allowed on a post.`);
  //       e.target.value = null;
  //     }
  //   };

  if (!animal) return <Loading />;

  return (
    <div className="body-white animal-form__outer">
      <div className="animal-form__wrapper">
        <h1 className="animal-form__title">Update Animal Listing</h1>
        <p className="animal-form__sub">Fields marked with * are required.</p>
        <form className="animal-form__form">
          <label>
            Type*
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="" disabled>
                Choose type
              </option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Small & Furry">Small & Furry</option>
              <option value="Horse">Horse</option>
              <option value="Bird">Bird</option>
              <option value="Scales, Fins, & Other">
                Scales, Fins, & Other
              </option>
              <option value="Barnyard">Barnyard</option>
            </select>
            <p className="errors">{hasSubmitted && errors?.type}</p>
          </label>
          <label>
            Name*
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="errors">{hasSubmitted && errors?.name}</p>
          </label>
          <label>
            Age*
            <select value={age} onChange={(e) => setAge(e.target.value)}>
              <option value="" disabled>
                Choose age
              </option>
              <option value="Baby">Baby</option>
              <option value="Young">Young</option>
              <option value="Adult">Adult</option>
              <option value="Senior">Senior</option>
            </select>
            <p className="errors">{hasSubmitted && errors?.age}</p>
          </label>
          <label>
            Gender*
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="" disabled>
                Choose gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <p className="errors">{hasSubmitted && errors?.gender}</p>
          </label>
          <label>
            Size*
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="" disabled>
                Choose size
              </option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
            </select>
            <p className="errors">{hasSubmitted && errors?.size}</p>
          </label>
          <label>
            Primary Breed*
            <input
              type="text"
              value={primaryBreed}
              onChange={(e) => setPrimaryBreed(e.target.value)}
            />
            <p className="errors">{hasSubmitted && errors?.primaryBreed}</p>
          </label>
          <label>
            Secondary Breed
            <input
              type="text"
              value={secondaryBreed}
              onChange={(e) => setSecondaryBreed(e.target.value)}
            />
            <p className="errors">{hasSubmitted && errors?.secondaryBreed}</p>
          </label>
          <label>
            Color
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <p className="errors">{hasSubmitted && errors?.color}</p>
          </label>
          <div className="animal-form__health">
            <h3>Health</h3>
            <div className="animal-form__health-sub">
              <label className="animal-form__check-label">
                House Trained?{" "}
                <input
                  type="checkbox"
                  value={houseTrained}
                  checked={houseTrained}
                  onChange={(e) => setHouseTrained(!houseTrained)}
                />
              </label>
              <label className="animal-form__check-label">
                Vaccinations up to date?{" "}
                <input
                  type="checkbox"
                  value={vaccinated}
                  checked={vaccinated}
                  onChange={(e) => setVaccinated(!vaccinated)}
                />
              </label>
            </div>
            <div className="animal-form__health-sub">
              <label className="animal-form__check-label">
                Spayed/Neutered?{" "}
                <input
                  type="checkbox"
                  value={fixed}
                  checked={fixed}
                  onChange={(e) => setFixed(!fixed)}
                />
              </label>
              <label className="animal-form__check-label">
                Special Needs?{" "}
                <input
                  type="checkbox"
                  value={specialNeeds}
                  checked={specialNeeds}
                  onChange={(e) => setSpecialNeeds(!specialNeeds)}
                />
              </label>
            </div>
          </div>
          <div className="animal-form__good-with">
            <h3>Good With:</h3>
            <div className="animal-form__good-with-sub">
              <label className="animal-form__check-label">
                Cats{" "}
                <input
                  type="checkbox"
                  value={goodWithCats}
                  checked={goodWithCats}
                  onChange={(e) => setGoodWithCats(!goodWithCats)}
                />
              </label>
              <label className="animal-form__check-label">
                Dogs{" "}
                <input
                  type="checkbox"
                  value={goodWithDogs}
                  checked={goodWithDogs}
                  onChange={(e) => setGoodWithDogs(!goodWithDogs)}
                />
              </label>
              <label className="animal-form__check-label">
                Children{" "}
                <input
                  type="checkbox"
                  value={goodWithChildren}
                  checked={goodWithChildren}
                  onChange={(e) => setGoodWithChildren(!goodWithChildren)}
                />
              </label>
              <label className="animal-form__check-label">
                Other Animals{" "}
                <input
                  type="checkbox"
                  value={goodWithOtherAnimals}
                  checked={goodWithOtherAnimals}
                  onChange={(e) =>
                    setGoodWithOtherAnimals(!goodWithOtherAnimals)
                  }
                />
              </label>
            </div>
          </div>
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="errors">{hasSubmitted && errors?.description}</p>
          </label>
          <label>
            Adoption Fee*
            <input
              type="number"
              placeholder="$ 0.00"
              value={adoptionFee}
              onChange={(e) => setAdoptionFee(e.target.value)}
            />
            <p className="errors">{hasSubmitted && errors?.adoptionFee}</p>
          </label>
          {/* <div>
            <p>Add Photos:*</p>
            <input
              id="image"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <p className="errors">{hasSubmitted && errors?.images}</p>
          </div> */}
        </form>
        <button className="animal-form__submit-btn" onClick={handleSubmit}>
          UPDATE ANIMAL
        </button>
      </div>
    </div>
  );
};

export default EditAnimalForm;
