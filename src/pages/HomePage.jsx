/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { MdArrowBack, MdArrowForward, MdKeyboardArrowDown, MdOutlineSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  getAllCountries,
  getCountriesByRegion,
  getCountryByName,
} from '../../api/services/countries.service';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';

const HomePage = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryToSearch, setCountryToSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [optionsDisplayed, setOptionsDisplayed] = useState(false);
  const [regionSelectValue, setRegionSelectValue] = useState('');
  const [page, setPage] = useState(0);

  const ref = useRef();

  useEffect(() => {
    obtainCountries();
  }, []);

  useEffect(() => {
    setCountries(allCountries[page]);
  }, [allCountries, page]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOptionsDisplayed(false);
        setSearchResults(false);
      }
    };

    document.addEventListener('click', checkIfClickedOutside);

    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, []);

  const obtainCountries = async () => {
    const obtainedCountries = await getAllCountries();

    setAllCountries(obtainedCountries);
  };

  const obtainCountriesByRegion = async (region) => {
    const obtainedCountries = await getCountriesByRegion(region);

    setCountries(obtainedCountries);
  };

  const searchCountryByName = async () => {
    const result = await getCountryByName(countryToSearch);

    setSearchResults(result);
    console.log(result);
  };

  const handleDisplayOptions = () => {
    console.log('Select Opened');
    setOptionsDisplayed(!optionsDisplayed);
  };

  const handleSelectRegion = (region) => {
    console.log(`Region ${region} selected`);
    setRegionSelectValue(region);
    setOptionsDisplayed(false);

    obtainCountriesByRegion(region);
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && countryToSearch.length > 0) {
      console.log(`buscando... ${countryToSearch}`);
      searchCountryByName();
    }
  };

  const handlePage = (page) => {
    if (page > 0 && page <= 15) {
      setPage(page);
    } else {
      console.log('no se puede ir ma patra o padelante perro');
    }
  };

  return (
    <div className="light-mode-bg h-screen">
      <Header />

      <div className="px-4 md:px-14 xl:px-28 py-14">
        <div className="flex flex-col gap-16 lg:flex-row justify-between ">
          <div className="max-w-[32rem] md:w-[32rem]">
            <div className="light-mode-elements flex items-center gap-2 px-6 rounded-md shadow-md">
              <label htmlFor="countrySearch">
                <MdOutlineSearch className="light-mode-input" size={28} />
              </label>
              <input
                id="countrySearch"
                type="text"
                placeholder="Search for a country..."
                className="py-5 pl-4 w-full font-[600] outline-none"
                onChange={(e) => setCountryToSearch(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>

            {searchResults && (
              <div className="light-mode-elements absolute w-[19rem] sm:w-[23rem] mt-2 rounded-md shadow-lg">
                {searchResults.map((country) => (
                  <div key={country.cca3}>
                    <Link to={`/country-details/${country.name.common}`}>
                      <div className="pl-6 py-5 flex items-center gap-4 rounded-md cursor-pointer hover:bg-slate-200">
                        <img
                          src={country?.flags?.png}
                          alt={`Flag of ${country?.name?.common}`}
                          className="w-[60px]"
                        />
                        <p className="light-mode-text font-[600] text-lg">
                          {country?.name?.common}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-64" ref={ref}>
            <div
              className="light-mode-elements flex justify-between items-center py-5 pl-6 pr-4 rounded-md shadow-md cursor-pointer"
              onClick={handleDisplayOptions}>
              <p className="light-mode-text font-[600]">
                {regionSelectValue ? regionSelectValue : 'Filter by Region'}
              </p>
              <MdKeyboardArrowDown size={22} />
            </div>

            {optionsDisplayed && (
              <div className="light-mode-elements absolute w-64 mt-2 py-4 rounded-md shadow-md">
                <div onClick={() => handleSelectRegion('Africa')}>
                  <p className="font-[600] text-lg py-[6px] pl-6 hover:bg-slate-200 cursor-pointer">
                    Africa
                  </p>
                </div>

                <div onClick={() => handleSelectRegion('Americas')}>
                  <p className="font-[600] text-lg py-[6px] pl-6 hover:bg-slate-200 cursor-pointer">
                    America
                  </p>
                </div>

                <div onClick={() => handleSelectRegion('Asia')}>
                  <p className="font-[600] text-lg py-[6px] pl-6 hover:bg-slate-200 cursor-pointer">
                    Asia
                  </p>
                </div>

                <div onClick={() => handleSelectRegion('Europe')}>
                  <p className="font-[600] text-lg py-[6px] pl-6 hover:bg-slate-200 cursor-pointer">
                    Europe
                  </p>
                </div>

                <div onClick={() => handleSelectRegion('Oceania')}>
                  <p className="font-[600] text-lg py-[6px] pl-6 hover:bg-slate-200 cursor-pointer">
                    Oceania
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* <div>
            <select name="region" id="filterRegion" className="py-4 px-6 shadow-md">
              <option value="" disabled selected hidden>
                Filter by Region
              </option>
              <option value="africa">Africa</option>
              <option value="africa">America</option>
              <option value="africa">Asia</option>
              <option value="africa">Europe</option>
              <option value="africa">Oceania</option>
            </select>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-14 gap-14 md:gap-14 lg:gap-20">
          {countries &&
            countries.map((country) => <CountryCard key={country.cca3} country={country} />)}
        </div>

        <div className="flex justify-center gap-5 mt-20">
          <button
            className="text-md light-mode-text font-[600]"
            onClick={() => handlePage(page - 1)}>
            <MdArrowBack size={26} color="#28313d" className="transition-all hover:scale-125" />
          </button>

          <div className="flex gap-3">
            <button
              className={`border-[1px] px-2 rounded-md  ${
                page === 0
                  ? 'bg-slate-100 text-black border-black'
                  : 'bg-[#28313d] text-slate-100 border-[#28313d] hover:bg-slate-100 hover:text-black transition-all'
              }`}
              onClick={() => setPage(0)}>
              1
            </button>
            <button
              className={`border-[1px] px-2 rounded-md  ${
                page === 1
                  ? 'bg-slate-100 text-black border-black'
                  : 'bg-[#28313d] text-slate-100 border-[#28313d] hover:bg-slate-100 hover:text-black'
              }`}
              onClick={() => setPage(1)}>
              2
            </button>
            <button
              className={` border-[1px] px-2 rounded-md ${
                page === 2
                  ? 'bg-slate-100 text-black border-black'
                  : 'bg-[#28313d] text-slate-100 border-[#28313d] hover:bg-slate-100 hover:text-black transition-all'
              }`}
              onClick={() => setPage(2)}>
              3
            </button>
            <button
              className={` border-[1px] px-2 rounded-md ${
                page === 3
                  ? 'bg-slate-100 text-black border-black'
                  : 'bg-[#28313d] text-slate-100 border-[#28313d] hover:bg-slate-100 hover:text-black transition-all'
              }`}
              onClick={() => setPage(3)}>
              4
            </button>
            <button
              className={` border-[1px] px-2 rounded-md ${
                page >= 4
                  ? 'bg-slate-100 text-black border-black'
                  : 'bg-[#28313d] text-slate-100 border-[#28313d] hover:bg-slate-100 hover:text-black transition-all'
              }`}
              onClick={() => setPage(4)}>
              {page > 4 ? page + 1 : 5}
            </button>
          </div>

          <button
            className="text-md light-mode-text font-[600]"
            onClick={() => handlePage(page + 1)}>
            <MdArrowForward size={26} color="#28313d" className="transition-all hover:scale-125" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
