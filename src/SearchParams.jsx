import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const breeds = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery({
    queryKey: ["search", requestParams],
    queryFn: () => fetchSearch(requestParams),
  });

  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={pets.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          location
          <input id="location" placeholder="Location" name="location" />
          <label htmlFor="animal">
            Animal
            <select
              name=""
              id="animal"
              value={animal}
              onChange={(e) => {
                setAnimal(e.target.value);
              }}
            >
              <option />
              {ANIMALS.map((animal) => (
                <option key={animal}>{animal}</option>
              ))}
            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select disabled={breeds.length === 0} id="breed" name="breed">
              <option />
              {breeds[0].map((breed) => (
                <option key={breed}>{breed}</option>
              ))}
            </select>
          </label>
          <button>Submit</button>
        </label>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
