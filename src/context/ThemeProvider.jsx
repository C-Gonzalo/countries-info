/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('');
  const [changingThemeMode, setChangingThemeMode] = useState(false);

  useEffect(() => {
    getThemeMode();
  }, []);

  useEffect(() => {
    if (changingThemeMode) {
      persistThemeMode();
      setChangingThemeMode(false);
    }
  }, [changingThemeMode]);

  const handleThemeMode = () => {
    console.log('Cambiando a dark/light mode');

    themeMode === 'light' ? setThemeMode('dark') : setThemeMode('light');

    setChangingThemeMode(true);
    console.log('MODE CHANGED BUT NOT SAVED YET', themeMode);
  };

  const getThemeMode = async () => {
    try {
      const themeModeSaved = localStorage.getItem('themeMode');

      setThemeMode(themeModeSaved ? JSON.parse(themeModeSaved) : 'light');

      console.log('MODE LOADED', themeModeSaved);
    } catch (error) {
      console.log(error);
    }
  };

  const persistThemeMode = async () => {
    try {
      // const modeToSave = (themeMode);
      localStorage.setItem('themeMode', JSON.stringify(themeMode));
      console.log('MODE SAVED');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        handleThemeMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };

export default ThemeContext;
