import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import FriendListWidget from "widgets/FriendListWidget";

const FriendListScreen = () => {
  const { _id } = useSelector((state) => state.user);
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={styles.roundedContainer}>
        <FriendListWidget _id={_id} />
      </View>
    </SafeAreaView>
  );
};

export default FriendListScreen;

//unused at the moment
const getStyles = (theme) =>
  StyleSheet.create({
    roundedContainer: {
      borderRadius: 10,
      backgroundColor: theme.colors.background,
      // padding: 8,
    },
  });
