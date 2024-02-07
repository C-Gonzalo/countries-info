export const getAllCountries = async () => {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,tld'
    );

    const data = await response.json();

    const reducedData = data.slice(0, 12);

    console.log(reducedData);
    return reducedData;
  } catch (error) {
    console.log(error);
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);

    const data = await response.json();
    const reducedData = data.slice(0, 12);

    console.log(`Countries of ${region}`, reducedData);
    return reducedData;
  } catch (error) {
    console.log(error);
  }
};

export const getCountryByName = async (name) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,flags,tld`
    );

    const data = await response.json();

    console.log(data);
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
