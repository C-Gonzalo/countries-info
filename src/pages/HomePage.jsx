import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineSearch } from 'react-icons/md';
import { getAllCountries, getCountriesByRegion } from '../../api/services/countries.service';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [countryToSearch, setCountryToSearch] = useState('');
  const [optionsDisplayed, setOptionsDisplayed] = useState(false);
  const [regionSelectValue, setRegionSelectValue] = useState('');

  useEffect(() => {
    obtainCountries();
  }, []);

  const obtainCountries = async () => {
    const obtainedCountries = await getAllCountries();

    setCountries(obtainedCountries);
  };

  const obtainCountriesByRegion = async (region) => {
    const obtainedCountries = await getCountriesByRegion(region);

    setCountries(obtainedCountries);
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

  return (
    <div className="light-mode-bg h-screen">
      <Header />

      <div className="px-28 py-14">
        <div className="flex justify-between">
          <div className="light-mode-elements flex items-center gap-2 w-[32rem] px-6 rounded-md shadow-md">
            <MdOutlineSearch className="light-mode-input" size={30} />
            <input
              type="text"
              placeholder="Search for a country..."
              className="py-5 pl-4 w-full font-[600] outline-none"
              onChange={(e) => setCountryToSearch(e.target.value)}
            />
          </div>

          <div>
            <div
              className="light-mode-elements w-64 flex justify-between items-center py-5 pl-6 pr-4 rounded-md shadow-md cursor-pointer"
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

        <div className="grid grid-cols-4 mt-14 gap-24">
          {countries &&
            countries.map((country) => <CountryCard key={country.tld[0]} country={country} />)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
