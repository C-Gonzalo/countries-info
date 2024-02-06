import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
const CountryCard = ({ country }) => {
  return (
    <Link to={`/country-details/${country.name.common}`}>
      <div className="light-mode-elements w-[320px] lg:w-[400px] xl:w-[100%] mx-auto rounded-lg shadow-md cursor-pointer hover:transition-all hover:duration-200 hover:scale-110 hover:shadow-2xl">
        {/* <div className="bg-sky-500 h-48 rounded-t-md"></div> */}

        <img
          className="w-[320px] lg:w-[400px] rounded-t-lg"
          src={country.flags.png}
          alt={`Bandera de ${country.name.common}`}
        />

        <div className="px-6 pt-6 pb-12">
          <h4 className="light-mode-text font-[800] text-2xl">{country.name.common}</h4>

          <div className="mt-6">
            <p className="py-[2px]">
              <span className="light-mode-text font-[600]">Population: </span>
              {country.population.toLocaleString()}
            </p>
            <p className="py-[2px]">
              <span className="light-mode-text font-[600]">Region: </span>
              {country.region}
            </p>
            <p className="py-[2px]">
              <span className="light-mode-text font-[600]">Capital: </span>
              {country.capital[0]}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
