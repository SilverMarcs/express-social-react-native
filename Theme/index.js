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
    850: "#222222",
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

// const themeSettings = (mode) => {
//   const lightTheme = {
//     ...DefaultTheme,
//     dark: false,
//     colors: {
//       ...DefaultTheme.colors,
//       primary: colorTokens.primary[500],
//       primaryDark: colorTokens.primary[700],
//       primaryLight: colorTokens.primary[50],
//       neutralDark: colorTokens.grey[700],
//       neutralMain: colorTokens.grey[500],
//       neutralMediumMain: colorTokens.grey[400],
//       neutralMedium: colorTokens.grey[300],
//       neutralLight: colorTokens.grey[50],
//       background: colorTokens.grey[10],
//       backgroundAlt: colorTokens.grey[0],
//     },
//   };

//   const darkTheme = {
//     ...DefaultTheme,
//     dark: true,
//     colors: {
//       ...DefaultTheme.colors,
//       primary: colorTokens.primary[500],
//       primaryDark: colorTokens.primary[200],
//       primaryLight: colorTokens.primary[800],
//       neutralDark: colorTokens.grey[100],
//       neutralMain: colorTokens.grey[200],
//       neutralMediumMain: colorTokens.grey[300],
//       neutralMedium: colorTokens.grey[400],
//       neutralLight: colorTokens.grey[700],
//       background: colorTokens.grey[900],
//       backgroundAlt: colorTokens.grey[800],
//     },
//   };

//   return mode === "dark" ? darkTheme : lightTheme;
// };

export const themeSettings = (mode = "dark") => ({
  ...DefaultTheme,
  dark: mode === "dark",
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: colorTokens.primary[500],
    background: mode === "dark" ? colorTokens.grey[900] : colorTokens.grey[10],
    surface: mode === "dark" ? colorTokens.grey[800] : colorTokens.grey[50],
    surface2: mode === "dark" ? colorTokens.grey[850] : colorTokens.grey[100],
    surfaceLighter:
      mode === "dark" ? colorTokens.grey[600] : colorTokens.grey[100],
    surfaceDarker:
      mode === "dark" ? colorTokens.grey[770] : colorTokens.grey[100],
    textPrimary:
      mode === "dark" ? colorTokens.grey[100] : colorTokens.grey[900],
    textSecondary:
      mode === "dark" ? colorTokens.grey[300] : colorTokens.grey[600],
    border: mode === "dark" ? colorTokens.grey[1000] : colorTokens.grey[300],
    neutral: mode === "dark" ? colorTokens.grey[700] : colorTokens.grey[100],
    error: mode === "dark" ? "#d73856" : "#B00020",
  },
});

export default themeSettings;
