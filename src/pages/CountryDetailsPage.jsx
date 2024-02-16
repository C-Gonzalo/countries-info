/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCountryByExactName, getCountryNameByCode } from '../../api/services/countries.service';
import Header from '../components/Header';
import useThemeMode from '../hooks/useThemeMode';

const CountryDetailsPage = () => {
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  const { themeMode } = useThemeMode();

  const { name } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    obtainCountry();
  }, [name]);

  const filterName = () => {
    const keys = Object.keys(country?.name?.nativeName);

    if (keys.length > 0) {
      const firstKey = keys[0];
      const firstValue = country?.name?.nativeName[firstKey];

      const filteredName = firstValue.official;
      return filteredName;
    }
  };

  const filterCurrency = () => {
    const keys = Object.keys(country.currencies);

    if (keys.length > 0) {
      const firstKey = keys[0];
      const firstValue = country.currencies[firstKey];

      const filteredCurrency = firstValue.name;
      return filteredCurrency;
    }
  };

  const filterLanguages = () => {
    const filteredLanguages = Object.keys(country?.languages).map((language) => {
      return country?.languages[language];
    });

    return filteredLanguages;
  };

  const obtainCountry = async () => {
    const obtainedCountry = await getCountryByExactName(name);
    const obtainedBorder = getBorderCountries(obtainedCountry.borders);

    console.log(obtainedCountry);
    setCountry(obtainedCountry);
    console.log(obtainedBorder);
    if (borderCountries) {
      setBorderCountries(obtainedBorder);
    }
  };

  const getBorderCountries = async (codes) => {
    const borderCountries = await getCountryNameByCode(codes);

    console.log('BORDER COUNTRIES', borderCountries);

    if (borderCountries) {
      const filteredCountriesName = borderCountries.map((country) => {
        console.log(name);
        return country?.name?.common;
      });
      console.log(filteredCountriesName);

      setBorderCountries(filteredCountriesName);
    }
  };

  return (
    <div
      className={`${
        themeMode === 'dark' ? 'dark-mode-bg' : 'light-mode-bg'
      } min-h-screen transition-all`}>
      <Header />

      {country && (
        <div className="light-mode-text px-6 md:px-14 xl:px-28 py-4 md:py-14 xl:py-8 mt-8">
          <div className="flex">
            <div
              className={`${
                themeMode === 'dark'
                  ? 'dark-mode-elements dark-mode-text'
                  : 'light-mode-elements light-mode-text'
              } flex items-center gap-2 py-2 pl-4 pr-6 rounded-md shadow-md cursor-pointer hover:shadow-xl transition-all hover:scale-105`}
              onClick={() => navigate(-1)}>
              <IoIosArrowRoundBack size={30} />
              <p className="font-[600]">Back</p>
            </div>
          </div>

          <div className="xl:flex mt-16 md:mt-24 xl:mt-12 gap-10">
            <div className=" xl:w-1/2 flex items-center md:justify-center xl:justify-start">
              <img
                src={country?.flags?.svg}
                alt={`Flag of ${country?.name?.common}`}
                className="w-[100%] md:w-[600px] select-none"
              />
            </div>

            <div
              className={`${
                themeMode === 'dark' ? 'dark-mode-text' : 'light-mode-text'
              } xl:w-1/2 py-12 lg:py-16 flex flex-col gap-10 justify-between`}>
              <div>
                <h4 className="text-3xl md:text-4xl font-[800]">{country?.name?.common}</h4>
                <div className="flex flex-col md:flex-row gap-10 md:gap-28 mt-8">
                  <div className="md:w-1/2">
                    <p className="py-2 text-lg text-wrap">
                      <span className="font-[600]">Native Name: </span>
                      {filterName()}
                    </p>
                    <p className="py-2 text-lg">
                      <span className="font-[600]">Population: </span>
                      {country?.population.toLocaleString()}
                    </p>
                    <p className="py-2 text-lg">
                      <span className="font-[600]">Region: </span>
                      {country?.region}
                    </p>
                    <p className="py-2 text-lg">
                      <span className="font-[600]">Sub Region: </span>
                      {country?.subregion}
                    </p>
                    <p className="py-2 text-lg">
                      <span className="font-[600]">Capital: </span>
                      {country?.capital}
                    </p>
                  </div>
                  <div className="md:w-1/2">
                    <p className="py-2 text-lg">
                      <span className="font-[600]">Top Level Domain: </span>
                      {country?.tld}
                    </p>
                    <p className="py-2 text-lg">
                      <span className="font-[600]">Currencies: </span>
                      {filterCurrency()}
                    </p>
                    <p className="py-2 text-lg">
                      <span className="font-[600]">Languages: </span>
                      {filterLanguages().join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5 md:items-center">
                <p className=" text-lg font-[600]">Border Countries: </p>
                <div className="flex items-center py-2 md:px-3 gap-6 flex-wrap xl:overflow-y-auto xl:max-h-[100px]">
                  {borderCountries.length > 0 &&
                    borderCountries.map((bCountry, index) => (
                      <div key={index}>
                        <Link to={`/country-details/${bCountry}`}>
                          <div
                            className={`${
                              themeMode === 'dark' ? 'dark-mode-elements' : 'light-mode-elements'
                            } flex items-center max-h-[36px] py-1 px-6 rounded-sm shadow-md cursor-pointer hover:shadow-lg hover:scale-110 transition-all`}>
                            {bCountry}
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetailsPage;
