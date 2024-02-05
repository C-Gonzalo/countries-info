import { FaMoon } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="light-mode-bg flex justify-between items-center px-20 py-6 shadow-md">
      <div>
        <h1 className="text-2xl font-[800] light-mode-text">Where in the world?</h1>
      </div>

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => console.log('Dark Mode')}>
        <FaMoon />
        <p className="text-lg font-[600] light-mode-text">Dark Mode</p>
      </div>
    </div>
  );
};

export default Header;
