import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAnimalThunk, singleAnimalThunk } from "../../store/animals";
import "../CreateAnimalForm/CreateAnimalForm.css";

const EditAnimalForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { animalId } = useParams();
  const user = useSelector((state) => state.session.user);
  const animal = useSelector((state) => state.animals.singleAnimal);

  useEffect(() => {
    dispatch(singleAnimalThunk(animalId));
  }, [dispatch]);

  const [type, setType] = useState(animal.type);
  console.log("🚀 ~ file: index.js:15 ~ EditAnimalForm ~ type:", type)
  const [name, setName] = useState(animal.name);
  console.log("🚀 ~ file: index.js:16 ~ EditAnimalForm ~ name:", name)
  const [age, setAge] = useState(animal.age);
  console.log("🚀 ~ file: index.js:18 ~ EditAnimalForm ~ age:", age)
  const [gender, setGender] = useState(animal.gender);
  console.log("🚀 ~ file: index.js:20 ~ EditAnimalForm ~ gender:", gender)
  const [size, setSize] = useState(animal.size);
  console.log("🚀 ~ file: index.js:22 ~ EditAnimalForm ~ size:", size)
  const [primaryBreed, setPrimaryBreed] = useState(animal.primaryBreed);
  console.log("🚀 ~ file: index.js:25 ~ EditAnimalForm ~ primaryBreed:", primaryBreed)
  const [secondaryBreed, setSecondaryBreed] = useState(animal.secondaryBreed);
  console.log("🚀 ~ file: index.js:27 ~ EditAnimalForm ~ secondaryBreed:", secondaryBreed)
  const [color, setColor] = useState(animal.color);
  console.log("🚀 ~ file: index.js:29 ~ EditAnimalForm ~ color:", color)
  const [houseTrained, setHouseTrained] = useState(animal.houseTrained);
  console.log("🚀 ~ file: index.js:31 ~ EditAnimalForm ~ houseTrained:", houseTrained)
  const [vaccinated, setVaccinated] = useState(animal.vaccinated);
  console.log("🚀 ~ file: index.js:33 ~ EditAnimalForm ~ vaccinated:", vaccinated)
  const [fixed, setFixed] = useState(animal.fixed);
  console.log("🚀 ~ file: index.js:35 ~ EditAnimalForm ~ fixed:", fixed)
  const [specialNeeds, setSpecialNeeds] = useState(animal.specialNeeds);
  console.log("🚀 ~ file: index.js:37 ~ EditAnimalForm ~ specialNeeds:", specialNeeds)
  const [goodWithCats, setGoodWithCats] = useState(animal.goodWithCats);
  console.log("🚀 ~ file: index.js:39 ~ EditAnimalForm ~ goodWithCats:", goodWithCats)
  const [goodWithDogs, setGoodWithDogs] = useState(animal.goodWithDogs);
  console.log("🚀 ~ file: index.js:41 ~ EditAnimalForm ~ goodWithDogs:", goodWithDogs)
  const [goodWithChildren, setGoodWithChildren] = useState(
    animal.goodWithChildren
  );
  console.log("🚀 ~ file: index.js:45 ~ EditAnimalForm ~ goodWithChildren:", goodWithChildren)
  const [goodWithOtherAnimals, setGoodWithOtherAnimals] = useState(
    animal.goodWithOtherAnimals
  );
  console.log("🚀 ~ file: index.js:49 ~ EditAnimalForm ~ goodWithOtherAnimals:", goodWithOtherAnimals)
  const [description, setDescription] = useState(animal.description);
  console.log("🚀 ~ file: index.js:51 ~ EditAnimalForm ~ description:", description)
  const [adoptionFee, setAdoptionFee] = useState(animal.adoptionFee);
  console.log("🚀 ~ file: index.js:53 ~ EditAnimalForm ~ adoptionFee:", adoptionFee)
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);


  useEffect(() => {
    const formErrors = {};
    type || (formErrors.type = "Type is required");
    name || (formErrors.name = "Name is required");
    age || (formErrors.age = "Age is required");
    gender || (formErrors.gender = "Gender is required");
    size || (formErrors.size = "Size is required");
    primaryBreed || (formErrors.primaryBreed = "Primary breed is required");
    adoptionFee >= 1 || (formErrors.adoptionFee = "Adoption fee is required");
    // images.length >= 1 ||
    //   (formErrors.images = "At least one image is required");
    setErrors(formErrors);
  }, [type, name, age, gender, size, primaryBreed, adoptionFee]);

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

      // console.log("🚀 ~ file: index.js:71 ~ handleSubmit ~ formData:", formData.values())

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

  if (!animal) return null;

  return (
    <div>
      <h1>Update Animal Listing</h1>
      <form className="animal-form__form">
        <label>
          Type
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
            <option value="Scales, Fins, & Other">Scales, Fins, & Other</option>
            <option value="Barnyard">Barnyard</option>
          </select>
          <p className="errors">{hasSubmitted && errors?.type}</p>
        </label>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="errors">{hasSubmitted && errors?.name}</p>
        </label>
        <label>
          Age
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
          Gender
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
          Size
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="" disabled>
              Choose size
            </option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Senior">Senior</option>
          </select>
          <p className="errors">{hasSubmitted && errors?.size}</p>
        </label>
        <label>
          Primary Breed
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
        </label>
        <label>
          Color
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <div>
          <label>
            House Trained?
            <input
              type="checkbox"
              value={houseTrained}
              onChange={(e) => setHouseTrained(!houseTrained)}
            />
          </label>
          <label>
            Vaccinations up to date?
            <input
              type="checkbox"
              value={vaccinated}
              onChange={(e) => setVaccinated(!vaccinated)}
            />
          </label>
        </div>
        <div>
          <label>
            Spayed/Neutered?
            <input
              type="checkbox"
              value={fixed}
              onChange={(e) => setFixed(!fixed)}
            />
          </label>
          <label>
            Special Needs?
            <input
              type="checkbox"
              value={specialNeeds}
              onChange={(e) => setSpecialNeeds(!specialNeeds)}
            />
          </label>
        </div>
        <div>
          Good With:
          <label>
            Cats
            <input
              type="checkbox"
              value={goodWithCats}
              onChange={(e) => setGoodWithCats(!goodWithCats)}
            />
          </label>
          <label>
            Dogs
            <input
              type="checkbox"
              value={goodWithDogs}
              onChange={(e) => setGoodWithDogs(!goodWithDogs)}
            />
          </label>
          <label>
            Children
            <input
              type="checkbox"
              value={goodWithChildren}
              onChange={(e) => setGoodWithChildren(!goodWithChildren)}
            />
          </label>
          <label>
            Other Animals
            <input
              type="checkbox"
              value={goodWithOtherAnimals}
              onChange={(e) => setGoodWithOtherAnimals(!goodWithOtherAnimals)}
            />
          </label>
        </div>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Adoption Fee
          <input
            type="text"
            value={adoptionFee}
            onChange={(e) => setAdoptionFee(e.target.value)}
          />
          <p className="errors">{hasSubmitted && errors?.adoptionFee}</p>
        </label>
        {/* <div>
          <p>Add Photos:</p>
          <input
            id="image"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <p className="errors">{hasSubmitted && errors?.images}</p>
        </div> */}
        <button onClick={handleSubmit}>Update Animal</button>
      </form>
    </div>
  );
};

export default EditAnimalForm;
