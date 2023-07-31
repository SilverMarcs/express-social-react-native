// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: ["react-native-reanimated/plugin"],
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      ["module:react-native-dotenv"],
      "react-native-paper/babel",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            screens: "./screens",
            components: "./components",
            widgets: "./widgets",
            navigation: "./navigation",
            theme: "./theme",
            assets: "./assets",
            store: "./store",
          },
        },
      ],
    ],
  };
};
