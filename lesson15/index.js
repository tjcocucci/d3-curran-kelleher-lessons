import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {Dropdown} from './Dropdown.js';

const labelId = "pet-select";
const options = [
  { value: "dog", name: "Dog" },
  { value: "cat", name: "Cat" },
  { value: "hamster", name: "Hamster" },
  { value: "parrot", name: "Parrot" },
  { value: "spider", name: "Spider" },
  { value: "goldfish", name: "Goldfish" }
];
const initialValue = options[2].value;

const App = () => {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  console.log(selectedValue);

  return (
    <div>
      <label for={labelId}>Choose a pet: </label>
      <Dropdown
        options={options}
        id={labelId}
        selectedValue={selectedValue}
        onSelectedValueChange={setSelectedValue} />
    </div>
  )
};


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);