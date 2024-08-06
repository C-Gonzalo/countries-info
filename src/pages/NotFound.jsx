import { Link } from 'react-router-dom';
import useThemeMode from '../hooks/useThemeMode';

const NotFound = () => {
  const { themeMode } = useThemeMode();

  return (
    <div
      className={`flex justify-center pt-14 px-6 sm:px-16 ${
        themeMode === 'dark' ? 'dark-mode-bg' : 'light-mode-bg'
      } min-h-screen`}>
      <div
        className={`${themeMode === 'dark' ? 'dark-mode-text' : 'light-mode-text'} font-semibold`}>
        <h2 className=" text-center text-5xl ">Page not found</h2>
        <p className="text-center text-xl mt-20">
          Go to the{' '}
          <Link className="hover:text-slate-500 transition-colors underline" to={'/'}>
            Home Page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
