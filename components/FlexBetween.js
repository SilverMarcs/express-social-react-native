import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

const FlexBetween = ({ children }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.background,
        padding: 16,
      }}
    >
      {children}
    </View>
  );
};
