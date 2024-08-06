import { splitResults } from '../../src/helpers';

export const getAllCountries = async () => {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3'
    );

    const data = await response.json();

    // Array of arrays with 16 countries each
    const resultsSplited = splitResults(data, 16);

    console.log(resultsSplited);

    return resultsSplited;
  } catch (error) {
    console.log(error);
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}?fields=name,flags,population,region,capital,cca3`
    );

    const data = await response.json();

    console.log('DATA', data);

    // Array of arrays with 16 countries each
    const resultsSplited = splitResults(data, 16);

    console.log(`Countries of ${region}`, resultsSplited);

    return resultsSplited;
  } catch (error) {
    console.log(error);
  }
};

export const getCountryByName = async (name) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,flags,cca3`
    );

    const data = await response.json();

    if (data.length > 6) {
      const reducedData = data.splice(0, 6);
      console.log(reducedData);
      return reducedData;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCountryByExactName = async (name) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);

    const data = await response.json();

    return data[0];
  } catch (error) {
    console.log(error);
  }
};

export const getCountryNameByCode = async (countriesCode) => {
  if (countriesCode) {
    try {
      const countriesName = [];

      for (const code of countriesCode) {
        const requestPromise = fetch(
          `https://restcountries.com/v3.1/alpha/${code}/?fields=name`
        ).then((response) => response.json());

        countriesName.push(requestPromise);
      }

      const responses = await Promise.all(countriesName);

      return responses;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
