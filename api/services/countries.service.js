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
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);

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

    return data;
  } catch (error) {
    console.log(error);
  }
};
