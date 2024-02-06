import { FaMoon } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="light-mode-elements flex justify-between items-center px-4 md:px-14 xl:px-28  py-8 shadow-md">
      <div>
        <h1 className="light-mode-text text-lg md:text-3xl font-[800]">Where in the world?</h1>
      </div>

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => console.log('Dark Mode')}>
        <FaMoon />
        {/* <FaSun /> */}
        <p className=" light-mode-text md:text-lg font-[600]">Dark Mode</p>
      </div>
    </div>
  );
};

export default Header;
