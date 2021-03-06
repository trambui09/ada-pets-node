// Use Node-style imports for dependencies.
const axios = require('axios');
const result = require('./result.js');

const setResult = result.setResult;
const setError = result.setError;

const BASE_URL = 'http://localhost:3000/pets/';

// Option functions.
const listPets = () => {
  // Fill out as part of Wave 1.
  axios.get(BASE_URL)
    .then((response) => {
      console.log('Success! Here is a list of all pets:');
      console.log(setResult(response.data));
    })
    .catch((error) => {
      console.log(setError('Oops! Something went wrong'))
    })
};

const showDetails = (selectedPetId) => {
  if (!selectedPetId) {
    setError("You tried to show details for a pet without selecting it!");
  } else {
    axios.get(`${BASE_URL}${selectedPetId}`)
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        setError('Request failed with a 404');
      })
  }
};

const removePet = (selectedPetId) => {
  if (!selectedPetId) {
    setError("You tried to remove a pet without selecting it!");
  } else {
    axios.delete(`${BASE_URL}${selectedPetId}`)
      .then((response) => {
        setResult(`Congrats! You have adopted pet number ${selectedPetId}`);
      })
      .catch((error) => {
        setError('Request failed with a 404, pet was not removed')
      })
  }
};

const addPet = (petInfo) => {
  // question: what does the ... do?
  const formatPetInfo = { name: petInfo.name, ...petInfo.options}
  axios.post(BASE_URL, formatPetInfo)
    .then((response) => {
      setResult(response.data);
    })
    .catch((error) => {
      setError('Request failed! Was not able to add pet!');
    })
};

// Use Node-style exports to export functions for tests and main.
module.exports = {
  listPets,
  showDetails,
  removePet,
  addPet
};
