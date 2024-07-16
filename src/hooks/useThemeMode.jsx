import { useContext } from 'react';
import ThemeContext from '../context/ThemeProvider';

const useThemeMode = () => {
  return useContext(ThemeContext);
};

export default useThemeMode;
