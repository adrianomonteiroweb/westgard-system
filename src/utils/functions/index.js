export const emptyInputs = (inputArrayOfIDs) => 
{
  inputArrayOfIDs.map((ID) => document.querySelector(`#${ID}`).value = "");
};

export const getValuesOfInputs = (inputArrayOfIDs) => 
{
  let values = {};

  inputArrayOfIDs.map((ID, i) => values[i] = document.querySelector(`#${ID}`).value);

  return values;
};

export const setValuesOfInputs = (inputArrayOfIDs, arrayOfValues) => 
{
  inputArrayOfIDs.map((ID, i) => document
    .querySelector(`#${ID}`).value = arrayOfValues[i]);
};