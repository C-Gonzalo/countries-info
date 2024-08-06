import { FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useThemeMode from '../hooks/useThemeMode';

const Header = () => {
  const { themeMode, handleThemeMode } = useThemeMode();

  return (
    <div
      className={`${
        themeMode === 'dark' ? 'dark-mode-elements' : 'light-mode-elements'
      } flex justify-between items-center px-4 md:px-14 xl:px-28  py-8 shadow-md transition-all`}>
      <Link to={'/'}>
        <h1
          className={`${
            themeMode === 'dark' ? 'dark-mode-text' : 'light-mode-text'
          } text-lg md:text-3xl font-[800] select-none`}>
          Where in the world?
        </h1>
      </Link>

      <div>
        {themeMode === 'dark' ? (
          <div
            className="w-[118px] flex items-center gap-2 cursor-pointer select-none"
            onClick={handleThemeMode}>
            <FaSun color="white" />
            <p className="dark-mode-text font-[600]">Light Mode</p>
          </div>
        ) : (
          <div
            className="w-[118px] flex items-center gap-2 cursor-pointer select-none"
            onClick={handleThemeMode}>
            <FaMoon color="#28313d" />
            <p className="light-mode-text font-[600]">Dark Mode</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
