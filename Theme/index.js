import { DefaultTheme } from "react-native-paper";

export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    770: "#171717",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
};

// Theme settings
export const themeSettings = (mode = "dark") => ({
  ...DefaultTheme,
  dark: mode === "dark",
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: colorTokens.primary[500],
    background: mode === "dark" ? colorTokens.grey[900] : colorTokens.grey[10],
    surface: mode === "dark" ? colorTokens.grey[800] : colorTokens.grey[50],
    surfaceDarker:
      mode === "dark" ? colorTokens.grey[770] : colorTokens.grey[100],
    textPrimary:
      mode === "dark" ? colorTokens.grey[100] : colorTokens.grey[900],
    textSecondary:
      mode === "dark" ? colorTokens.grey[300] : colorTokens.grey[600],
    border: mode === "dark" ? colorTokens.grey[1000] : colorTokens.grey[300],
    error: mode === "dark" ? "#d73856" : "#B00020",
  },
});
