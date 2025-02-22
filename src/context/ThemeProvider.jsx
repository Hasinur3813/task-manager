import React, { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && theme === "dark") {
      setTheme(theme);
      document.documentElement.classList = theme;
    }
  }, [theme]);

  const handleDarkmode = () => {
    const getTheme = theme === "light" ? "dark" : "light";
    setTheme(getTheme);
    localStorage.setItem("theme", getTheme);
    document.documentElement.classList = getTheme;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, handleDarkmode }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
