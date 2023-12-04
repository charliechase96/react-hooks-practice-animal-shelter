import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleFilterType(newType) {
    setFilters({ ...filters, type: newType});
  }

  function handlePetsFetch() {
    let petsUrl = 'http://localhost:3001/pets';
    
    if (filters.type !== 'all') {
      petsUrl += `?type=${filters.type}`;
    }

    fetch(petsUrl)
      .then(response => response.json())
      .then(data => setPets(data))
  }

  function handlePetAdoption(petId) {
    const updatedPets = pets.map(pet => {
      if (pet.id === petId) {
        return { ...pet, isAdopted: true};
      }
      return pet;
    });

    setPets(updatedPets);
  }

  const filteredPets = filters.type === 'all' 
    ? pets 
    : pets.filter(pet => pet.type === filters.type);

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters 
              onChangeType={handleFilterType} 
              onFindPetsClick={handlePetsFetch}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser 
              pets={filteredPets} 
              onAdoptPet={handlePetAdoption}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;