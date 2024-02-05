const CountryCard = () => {
  return (
    <div className="light-mode-elements w-80 rounded-md shadow-md cursor-pointer">
      <div className="bg-sky-500 h-48 rounded-t-md"></div>

      <div className="px-6 pt-6 pb-12">
        <h4 className="light-mode-text font-[800] text-2xl">Argentina</h4>

        <div className="mt-6">
          <p className="py-[2px]">
            <span className="light-mode-text font-[600]">Population:</span> 45,810,000
          </p>
          <p className="py-[2px]">
            <span className="light-mode-text font-[600]">Region:</span> Americas
          </p>
          <p className="py-[2px]">
            <span className="light-mode-text font-[600]">Capital:</span> Buenos Aires
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
