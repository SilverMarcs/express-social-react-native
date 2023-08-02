import React, { useState } from "react";
import { Image, Keyboard, StyleSheet, Text, View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "store/reducers";

const NewPostWidget = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  // const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    setIsPosting(true);
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
      }

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setIsPosting(false);
      setImage(null);
      // setIsImage(false);
      setPost("");
    } catch (error) {
      setIsPosting(false);
      alert("An error ocurrer while posting");
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.card}>
      <TextInput
        placeholder="What's on your mind..."
        multiline={true}
        placeholderTextColor={theme.colors.surfaceLighter}
        selectionColor={theme.colors.primary}
        outlineColor={theme.colors.surfaceDarker}
        value={post}
        // onBlur={() => Keyboard.dismiss()}
        onChangeText={setPost}
        mode="outlined"
        textColor={theme.colors.textPrimary}
        style={styles.textInput}
        outlineStyle={styles.textInputOutline}
        // activeOutlineColor={theme.colors.surfaceDarker}
      />

      <View style={styles.cardFooter}>
        <IconButton icon="image-outline" iconColor={theme.colors.textPrimary} />
        <IconButton icon="attachment" iconColor={theme.colors.textSecondary} />
        <IconButton
          icon="microphone-outline"
          iconColor={theme.colors.textSecondary}
        />
        <Button
          onPress={handlePost}
          loading={isPosting}
          mode="contained"
          disabled={!post}
          style={post ? styles.postButton : styles.postButtonDisabled}
          labelStyle={
            post ? styles.postButtonText : styles.postButtonDisabledText
          }
        >
          POST
        </Button>
      </View>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      borderRadius: 10,
      padding: 10,
      marginVertical: 16,
      marginHorizontal: 14,
      backgroundColor: theme.colors.surface,
    },
    textInput: {
      backgroundColor: theme.colors.surface2,
      padding: 9,
      marginBottom: 10,
      marginHorizontal: 10,
    },
    textInputOutline: {
      borderRadius: 10,
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: 10,
    },
    postButton: {
      backgroundColor: theme.colors.primary,
      color: "red",
    },
    postButtonText: {
      color: theme.colors.neutral,
    },
    postButtonDisabled: {
      backgroundColor: theme.colors.surface2,
    },
    postButtonDisabledText: {
      color: theme.colors.textSecondary,
    },
  });

export default NewPostWidget;
