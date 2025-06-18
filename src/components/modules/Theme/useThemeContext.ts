import { createContext, useContext } from "react";
import { ThemeContextType } from "./ThemeContextComponent.types";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
}

export default useThemeContext;
