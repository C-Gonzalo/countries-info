/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import {
  MdArrowBack,
  MdArrowForward,
  MdClose,
  MdKeyboardArrowDown,
  MdOutlineSearch,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  getAllCountries,
  getCountriesByRegion,
  getCountryByName,
} from '../../api/services/countries.service';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';
import useThemeMode from '../hooks/useThemeMode';

const HomePage = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searching, setSearching] = useState(false);
  const [countryToSearch, setCountryToSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [optionsDisplayed, setOptionsDisplayed] = useState(false);
  const [regionSelectValue, setRegionSelectValue] = useState('');
  const [page, setPage] = useState(0);

  const { themeMode } = useThemeMode();

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
    const obtainedAllCountries = await getAllCountries();

    setAllCountries(obtainedAllCountries);
  };

  const obtainCountriesByRegion = async (region) => {
    const obtainedRegionCountries = await getCountriesByRegion(region);

    setAllCountries(obtainedRegionCountries);
  };

  const searchCountryByName = async () => {
    const result = await getCountryByName(countryToSearch);

    if (result.status != 404) {
      setSearchResults(result);
      console.log(result);
      setSearching(false);
      return;
    }
    alert('not found');
    setSearching(false);
  };

  const handleDisplayOptions = () => {
    console.log('Select Opened');
    setOptionsDisplayed(!optionsDisplayed);
  };

  const handleSelectRegion = async (region) => {
    console.log(`Region ${region} selected`);
    setRegionSelectValue(region);
    setOptionsDisplayed(false);

    await obtainCountriesByRegion(region);

    setPage(0);
  };

  const handleSearch = async () => {
    if (countryToSearch.length > 0) {
      setSearching(true);
      console.log(`buscando... ${countryToSearch}`);
      await searchCountryByName();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && countryToSearch.length > 0) {
      handleSearch();
    }
  };

  const handlePage = (page) => {
    if (page >= 0 && page < allCountries.length) {
      setPage(page);
    }
  };

  const handleClearInput = () => {
    if (countryToSearch.length > 0) {
      setCountryToSearch('');
    }
  };

  return (
    <div
      className={`${
        themeMode === 'dark' ? 'dark-mode-bg' : 'light-mode-bg'
      } min-h-screen transition-all`}>
      <Header />

      <div className="px-4 md:px-14 xl:px-28 py-14">
        <div className="flex flex-col gap-16 lg:flex-row justify-between ">
          <div className="max-w-[32rem] md:w-[32rem]">
            <div
              className={`${
                themeMode === 'dark' ? 'dark-mode-elements' : 'light-mode-elements'
              } flex items-center gap-2 px-6 rounded-md shadow-md transition-all`}>
              {searching ? (
                <div className="sk-circle">
                  <div className="sk-circle1 sk-child"></div>
                  <div className="sk-circle2 sk-child"></div>
                  <div className="sk-circle3 sk-child"></div>
                  <div className="sk-circle4 sk-child"></div>
                  <div className="sk-circle5 sk-child"></div>
                  <div className="sk-circle6 sk-child"></div>
                  <div className="sk-circle7 sk-child"></div>
                  <div className="sk-circle8 sk-child"></div>
                  <div className="sk-circle9 sk-child"></div>
                  <div className="sk-circle10 sk-child"></div>
                  <div className="sk-circle11 sk-child"></div>
                  <div className="sk-circle12 sk-child"></div>
                </div>
              ) : (
                <div>
                  <MdOutlineSearch
                    className={
                      countryToSearch.length > 0 && 'transition-all hover:scale-125 cursor-pointer'
                    }
                    size={28}
                    color={countryToSearch.length > 0 ? '#28313d' : '#989fa8'}
                    onClick={handleSearch}
                  />
                </div>
              )}

              <input
                id="countrySearch"
                type="text"
                value={countryToSearch}
                placeholder="Search for a country..."
                className={`${
                  themeMode === 'dark'
                    ? 'dark-mode-elements dark-mode-text'
                    : 'light-mode-elements light-mode-text'
                } py-5 pl-4 w-full font-[600] outline-none transition-all`}
                onChange={(e) => setCountryToSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div>
                <MdClose
                  className={`light-mode-input ${
                    countryToSearch.length > 0 && 'transition-all hover:scale-125 cursor-pointer'
                  }`}
                  size={24}
                  color={countryToSearch.length > 0 ? '#28313d' : '#989fa8'}
                  onClick={handleClearInput}
                />
              </div>
            </div>

            {searchResults.length > 0 && (
              <div
                className={`${
                  themeMode === 'dark' ? 'dark-mode-elements' : 'light-mode-elements'
                } absolute w-[19rem] sm:w-[23rem] mt-2 rounded-md shadow-lg`}>
                {searchResults.map((country) => (
                  <div key={country.cca3}>
                    <Link to={`/country-details/${country.name.common}`}>
                      <div
                        className={`pl-6 py-5 flex items-center gap-4 rounded-md cursor-pointer ${
                          themeMode === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-200'
                        } `}>
                        <img
                          src={country?.flags?.png}
                          alt={`Flag of ${country?.name?.common}`}
                          className="w-[60px] select-none"
                        />
                        <p
                          className={`${
                            themeMode === 'dark' ? 'dark-mode-text' : 'light-mode-text'
                          } font-[600] text-lg`}>
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
              className={`${
                themeMode === 'dark' ? 'dark-mode-elements ' : 'light-mode-elements'
              } flex justify-between items-center py-5 pl-6 pr-4 rounded-md shadow-md cursor-pointer transition-all`}
              onClick={handleDisplayOptions}>
              <p
                className={`${
                  themeMode === 'dark' ? 'dark-mode-text' : 'light-mode-text'
                } font-[600]`}>
                {regionSelectValue ? regionSelectValue : 'Filter by Region'}
              </p>
              <MdKeyboardArrowDown size={22} color={themeMode === 'dark' ? 'white' : 'black'} />
            </div>

            {optionsDisplayed && (
              <div
                className={`${
                  themeMode === 'dark'
                    ? 'dark-mode-elements dark-mode-text'
                    : 'light-mode-elements light-mode-text'
                } absolute w-64 mt-2 py-4 rounded-md shadow-md`}>
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

        <div className="flex justify-center gap-5 mt-24">
          <div
            className={`${page > 0 && 'cursor-pointer'} text-md light-mode-text font-[600]`}
            onClick={() => handlePage(page - 1)}>
            <MdArrowBack
              size={26}
              color={page == 0 ? '#989fa8' : '#28313d'}
              className={page > 0 && 'transition-all hover:scale-125'}
            />
          </div>

          <div className="flex gap-3">
            {/* {allCountries.map((ctr, index) => ( */}
            <div
              className={`border-[1px] px-2 rounded-md cursor-pointer  ${
                page === 0
                  ? 'bg-slate-100 text-black border-black'
                  : 'bg-[#28313d] text-slate-100 border-[#28313d] hover:bg-slate-100 hover:text-black transition-all'
              }`}
              onClick={() => setPage(0)}>
              1
            </div>
            {/* ))} */}

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
                page === 4
                  ? 'bg-slate-100 text-black border-black'
                  : 'bg-[#28313d] text-slate-100 border-[#28313d] hover:bg-slate-100 hover:text-black transition-all'
              }`}
              onClick={() => setPage(4)}>
              5
            </button>
            <button
              className={` border-[1px] px-2 rounded-md ${
                page === 5
                  ? 'bg-slate-100 text-black border-black'
                  : 'bg-[#28313d] text-slate-100 border-[#28313d] hover:bg-slate-100 hover:text-black transition-all'
              }`}
              onClick={() => setPage(5)}>
              6
            </button>
            <button
              className={` border-[1px] px-2 rounded-md ${
                page === 6
                  ? 'bg-slate-100 text-black border-black'
                  : 'bg-[#28313d] text-slate-100 border-[#28313d] hover:bg-slate-100 hover:text-black transition-all'
              }`}
              onClick={() => setPage(6)}>
              7
            </button>
            <button
              className={` border-[1px] px-2 rounded-md ${
                page >= 7
                  ? 'bg-slate-100 text-black border-black'
                  : 'bg-[#28313d] text-slate-100 border-[#28313d] hover:bg-slate-100 hover:text-black transition-all'
              }`}
              onClick={() => setPage(7)}>
              {page > 7 ? page + 1 : 8}
            </button>
          </div>

          <div
            className={`${
              page + 1 < allCountries.length && 'cursor-pointer'
            } text-md light-mode-text font-[600]`}
            onClick={() => handlePage(page + 1)}>
            <MdArrowForward
              size={26}
              color={page + 1 < allCountries.length ? '#28313d' : '#989fa8'}
              className={page + 1 < allCountries.length && 'transition-all hover:scale-125'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
