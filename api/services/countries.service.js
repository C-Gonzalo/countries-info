export const getAllCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');

    const data = await response.json();

    const reducedData = data.slice(0, 12);

    console.log(reducedData);
    return reducedData;
  } catch (error) {
    console.log(error);
  }
};
