import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  TextInput,
  useTheme,
} from "react-native-paper";

const MyPostWidget = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: theme.colors.surface,
      }}
    >
      <View style={styles.cardHeader}>
        <Image
          style={styles.userImage}
          source={{ uri: "https://via.placeholder.com/50" }}
        />
        <TextInput
          placeholder="What's on your mind..."
          placeholderTextColor={theme.colors.surfaceLighter}
          //   value={post}
          //   onChangeText={setPost}
          mode="outlined"
          textColor={theme.colors.textPrimary}
          style={{
            flex: 1,
            backgroundColor: "#333333",
            padding: 10,
          }}
          outlineStyle={{ borderRadius: 10 }}
          activeOutlineColor={theme.colors.surfaceDarker}
        />
      </View>

      {/* <View style={styles.cardDivider} /> */}
      <Divider style={{ marginVertical: 10 }} />

      <View style={styles.cardFooter}>
        <IconButton icon="image-outline" iconColor={theme.colors.textPrimary} />
        <IconButton icon="attachment" iconColor={theme.colors.textPrimary} />
        <IconButton
          icon="microphone-outline"
          iconColor={theme.colors.textPrimary}
        />

        <Button mode="contained" style={styles.postButton}>
          POST
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // backgroundColor: "#f00",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDivider: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    // padding: 10,
  },
});

export default MyPostWidget;
