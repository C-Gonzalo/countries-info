/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import {
  MdArrowBack,
  MdArrowForward,
  MdClose,
  MdKeyboardArrowDown,
  MdOutlineSearch,
} from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getAllCountries,
  getCountriesByRegion,
  getCountryByName,
} from '../../api/services/countries.service';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';
import PageButton from '../components/PageButton';
import Spinner from '../components/Spinner';
import { REGIONS } from '../constants/constants';
import useThemeMode from '../hooks/useThemeMode';

const HomePage = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const [searching, setSearching] = useState(false);
  const [countryToSearch, setCountryToSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);

  const [regionsDisplayed, setRegionsDisplayed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { themeMode } = useThemeMode();

  const ref = useRef();

  const queryParams = new URLSearchParams(location.search);
  const region = queryParams.get('region');

  const queryPage = queryParams.get('page');
  const page = queryPage ? +queryPage : 1;

  useEffect(() => {
    if (allCountries.length && page && (page < 0 || page > allCountries.length))
      return navigate('/');

    setCountries(allCountries[page - 1]);
  }, [allCountries, page]);

  useEffect(() => {
    if (region) {
      if (REGIONS.includes(region)) {
        obtainCountriesByRegion(region);
        return;
      } else {
        navigate('/');
      }
    }

    obtainCountries();
  }, [region]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setRegionsDisplayed(false);
        setSearchResult(false);
        setShowSearchResult(false);
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
    setLoadingCountries(false);
  };

  const obtainCountriesByRegion = async (region) => {
    const obtainedRegionCountries = await getCountriesByRegion(region);

    setAllCountries(obtainedRegionCountries);
    setLoadingCountries(false);
  };

  const searchCountryByName = async () => {
    const result = await getCountryByName(countryToSearch);
    console.log(result.status);
    setShowSearchResult(true);
    if (result.status != 404) {
      setSearchResult(result);
      setSearching(false);
      return;
    }
    setSearching(false);
  };

  const handleDisplayOptions = () => {
    setRegionsDisplayed(!regionsDisplayed);
  };

  const handleSelectRegion = async (region) => {
    queryParams.set('region', region);
    queryParams.set('page', 1);
    navigate(`${location.pathname}?${queryParams.toString()}`);

    setRegionsDisplayed(false);
  };

  const handleSearch = async () => {
    if (countryToSearch.length > 0) {
      setSearching(true);
      await searchCountryByName();
    } else {
      toast.error('The search field cannot be empty');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleQueryParamsPage = (page) => {
    queryParams.set('page', page);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const handlePageWithArrows = (page) => {
    if (page >= 0 && page <= allCountries.length) {
      handleQueryParamsPage(page);
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
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme={themeMode === 'dark' ? 'dark' : 'light'}
      />
      <div className="px-4 md:px-14 xl:px-28 py-14">
        <div className="flex flex-col gap-16 lg:flex-row justify-between ">
          <div className="max-w-[32rem] md:w-[32rem]">
            <div
              className={`${
                themeMode === 'dark' ? 'dark-mode-elements' : 'light-mode-elements'
              } flex items-center gap-2 px-6 rounded-md shadow-md transition-all`}>
              {searching ? (
                <Spinner />
              ) : (
                <div className={`${countryToSearch.length === 0 && 'opacity-40'}`}>
                  <MdOutlineSearch
                    className={
                      countryToSearch.length > 0 && 'transition-all hover:scale-125 cursor-pointer'
                    }
                    size={28}
                    color={themeMode === 'dark' ? '#989fa8' : '#28313d'}
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
              <div className={`${countryToSearch.length === 0 && 'opacity-40'}`}>
                <MdClose
                  className={`light-mode-input ${
                    countryToSearch.length > 0 && 'transition-all hover:scale-125 cursor-pointer'
                  }`}
                  size={24}
                  color={themeMode === 'dark' ? '#989fa8' : '#28313d'}
                  onClick={handleClearInput}
                />
              </div>
            </div>

            {showSearchResult && (
              <div
                className={`${
                  themeMode === 'dark' ? 'dark-mode-elements' : 'light-mode-elements'
                } absolute w-[19rem] sm:w-[23rem] mt-2 rounded-md shadow-lg`}>
                {searchResult.length > 0 ? (
                  searchResult.map((country) => (
                    <div key={country.cca3}>
                      <Link to={`/country-details/${country.name.common}`}>
                        <div
                          className={`pl-6 py-5 flex items-center gap-4 rounded-md cursor-pointer ${
                            themeMode === 'dark' ? 'hover:bg-[#28313d]' : 'hover:bg-slate-200'
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
                  ))
                ) : (
                  <div className="flex justify-center items-center p-6">
                    <p className="text-white">Country not found</p>
                  </div>
                )}
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
                {region ? region : 'Filter by Region'}
              </p>
              <MdKeyboardArrowDown size={22} color={themeMode === 'dark' ? 'white' : 'black'} />
            </div>

            {regionsDisplayed && (
              <div
                className={`${
                  themeMode === 'dark'
                    ? 'dark-mode-elements dark-mode-text'
                    : 'light-mode-elements light-mode-text'
                } absolute w-64 mt-2 py-4 rounded-md shadow-md`}>
                {REGIONS.map((region, index) => (
                  <div key={index} onClick={() => handleSelectRegion(region)}>
                    <p
                      className={`font-[600] text-lg py-[6px] pl-6 cursor-pointer  ${
                        themeMode === 'dark' ? 'hover:bg-[#28313d]' : 'hover:bg-slate-200'
                      }`}>
                      {region}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {loadingCountries ? (
          <div className="flex justify-center mt-40">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-14 gap-14 md:gap-14 lg:gap-20">
              {countries &&
                countries.map((country) => <CountryCard key={country.cca3} country={country} />)}
            </div>

            <div className="flex justify-center gap-5 mt-24">
              <button
                type="button"
                className={`${
                  page > 1 && 'cursor-pointer'
                } text-md light-mode-text font-[600] disabled:opacity-30`}
                onClick={() => handlePageWithArrows(page - 1)}
                disabled={page === 1}>
                <MdArrowBack
                  size={26}
                  color={themeMode === 'dark' ? '#989fa8' : '#28313d'}
                  className={page > 1 && 'transition-all hover:scale-125'}
                />
              </button>

              <div className="flex gap-3">
                {allCountries.length < 6 ? (
                  allCountries.map((_, index) => (
                    <PageButton
                      key={index}
                      page={page}
                      handleQueryParamsPage={handleQueryParamsPage}
                      buttonNumber={index + 1}
                    />
                  ))
                ) : (
                  <>
                    <PageButton
                      page={page}
                      handleQueryParamsPage={handleQueryParamsPage}
                      buttonNumber={1}
                    />
                    <PageButton
                      page={page}
                      handleQueryParamsPage={handleQueryParamsPage}
                      buttonNumber={2}
                    />
                    <PageButton
                      page={page}
                      handleQueryParamsPage={handleQueryParamsPage}
                      buttonNumber={3}
                    />
                    <PageButton
                      page={page}
                      handleQueryParamsPage={handleQueryParamsPage}
                      buttonNumber={4}
                    />
                    <PageButton
                      page={page}
                      handleQueryParamsPage={handleQueryParamsPage}
                      buttonNumber={5}
                    />

                    <button
                      type="button"
                      disabled={page >= 6}
                      className={` border-[1px] px-2 rounded-md ${
                        page >= 6
                          ? 'bg-slate-100 text-black border-black'
                          : 'bg-[#28313d] text-slate-100 border-[#28313d] hover:bg-slate-100 hover:text-black transition-all'
                      }`}
                      onClick={() => handleQueryParamsPage(6)}>
                      {page > 6 ? page : 6}
                    </button>
                  </>
                )}
              </div>

              <button
                type="button"
                className={'text-md light-mode-text font-[600] disabled:opacity-30'}
                disabled={page === allCountries.length}
                onClick={() => handlePageWithArrows(page + 1)}>
                <MdArrowForward
                  size={26}
                  color={themeMode === 'dark' ? '#989fa8' : '#28313d'}
                  className={page < allCountries.length && 'transition-all hover:scale-125'}
                />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
