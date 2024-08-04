import { Link } from 'react-router-dom';
import useThemeMode from '../hooks/useThemeMode';

/* eslint-disable react/prop-types */
const CountryCard = ({ country }) => {
  const { themeMode } = useThemeMode();

  return (
    <div
      className={`${
        themeMode === 'dark'
          ? 'dark-mode-elements dark-mode-text'
          : 'light-mode-elements light-mode-text'
      } w-[320px] lg:w-[400px] xl:w-[100%] h-[452px] mx-auto rounded-lg shadow-md cursor-pointer transition-all hover:duration-200 hover:scale-110 hover:shadow-2xl`}>
      <Link to={`/country-details/${country.name.common}`}>
        <div>
          {/* <div className="bg-sky-500 h-48 rounded-t-md"></div> */}

          <img
            className="w-[100%] max-h-[272px] rounded-t-lg select-none"
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
          />

          <div className="px-6 pt-6 pb-12">
            <h4 className="font-[800] text-2xl">{country.name.common}</h4>

            <div className="mt-6">
              <p className="py-[2px]">
                <span className="font-[600]">Population: </span>
                {country.population.toLocaleString()}
              </p>
              <p className="py-[2px]">
                <span className="font-[600]">Region: </span>
                {country.region}
              </p>
              <p className="py-[2px]">
                <span className="font-[600]">Capital: </span>
                {country.capital[0]}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CountryCard;
