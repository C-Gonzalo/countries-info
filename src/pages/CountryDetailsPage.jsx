import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCountryByExactName } from '../../api/services/countries.service';
import Header from '../components/Header';

const CountryDetailsPage = () => {
  const [country, setCountry] = useState({});

  const { name } = useParams();

  useEffect(() => {
    obtainCountry();
  }, []);

  const obtainCountry = async () => {
    const obtainedCountry = await getCountryByExactName(name);

    console.log(obtainedCountry);
    setCountry(obtainedCountry);
  };

  return (
    <div className="light-mode-bg h-screen">
      <Header />
      <p>{name}</p>
    </div>
  );
};

export default CountryDetailsPage;
