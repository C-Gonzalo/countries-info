/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { getCountryByExactName } from '../../api/services/countries.service';
import Header from '../components/Header';

const CountryDetailsPage = () => {
  const [country, setCountry] = useState(null);

  const { name } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    obtainCountry();
  }, []);

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

    console.log(obtainedCountry);
    setCountry(obtainedCountry);
  };

  return (
    <div className="light-mode-bg h-screen">
      <Header />

      <div className="light-mode-text px-4 md:px-14 xl:px-28 py-14 mt-8">
        <div className="flex">
          <div
            className="light-mode-elements flex items-center gap-2 py-2 pl-4 pr-6 rounded-md shadow-md cursor-pointer hover:shadow-xl transition-all duration-300"
            onClick={() => navigate(-1)}>
            <IoIosArrowRoundBack size={30} />
            <p className="font-[600]">Back</p>
          </div>
        </div>

        {country && (
          <div className="flex mt-24">
            <div className="w-1/2">
              <img
                src={country?.flags?.svg}
                alt={`Flag of ${country?.name?.common}`}
                className="w-[600px] h-[437px]"
              />
            </div>

            <div className="w-1/2 py-8 flex flex-col justify-between">
              <div>
                <h4 className="text-4xl font-[800]">{country?.name?.common}</h4>
                <div className="flex gap-28 mt-8">
                  <div className="w-1/2">
                    <p className="py-1 text-lg">
                      <span className="font-[600]">Native Name: </span>
                      {filterName()}
                    </p>
                    <p className="py-1 text-lg">
                      <span className="font-[600]">Population: </span>
                      {country?.population.toLocaleString()}
                    </p>
                    <p className="py-1 text-lg">
                      <span className="font-[600]">Region: </span>
                      {country?.region}
                    </p>
                    <p className="py-1 text-lg">
                      <span className="font-[600]">Sub Region: </span>
                      {country?.subregion}
                    </p>
                    <p className="py-1 text-lg">
                      <span className="font-[600]">Capital: </span>
                      {country?.capital}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="py-1 text-lg">
                      <span className="font-[600]">Top Level Domain: </span>
                      {country?.tld}
                    </p>
                    <p className="py-1 text-lg">
                      <span className="font-[600]">Currencies: </span>
                      {filterCurrency()}
                    </p>
                    <p className="py-1 text-lg">
                      <span className="font-[600]">Languages: </span>
                      {filterLanguages().join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <p className=" text-lg font-[600]">Border Countries: </p>
                <div className="flex gap-6">
                  <div className="light-mode-elements py-1 px-6 rounded-md shadow-md cursor-pointer hover:shadow-lg hover:scale-110 transition-all">
                    France
                  </div>
                  <div className="light-mode-elements py-1 px-4 rounded-md shadow-md cursor-pointer hover:shadow-lg hover:scale-110 transition-all">
                    Germany
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetailsPage;
