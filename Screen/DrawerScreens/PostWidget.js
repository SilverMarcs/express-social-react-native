import React, { useState } from "react";
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Surface,
  // Text,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../State";
import CustomText from "../Components/CustomText.js";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [commentBoxText, setCommentBoxText] = useState("");
  const theme = useTheme();

  const patchLike = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleComment = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/posts/${postId}/comments`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          postId: postId,
          commentText: commentBoxText,
        }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setCommentBoxText("");
  };

  return (
    <Card
      style={{
        padding: 18,
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        marginVertical: 9,
        marginHorizontal: 14,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{
            width: 55,
            height: 55,
            borderRadius: 27.5,
            marginRight: 13,
          }}
          source={{
            uri:
              `${process.env.EXPO_PUBLIC_API_URL}/assets/${picturePath}` ??
              `${process.env.EXPO_PUBLIC_API_URL}/assets/empty.jpeg`,
          }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 19,
              marginBottom: 5,
              marginTop: -5,
              color: theme.colors.textPrimary,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: 14,
            }}
          >
            {location}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: theme.colors.textPrimary,
          marginVertical: 16,
          fontSize: 15.5,
        }}
      >
        {description}
      </Text>
      {picturePath && (
        <Image
          style={{
            width: "100%",
            height: 200,
            resizeMode: "cover",
            marginBottom: 10,
            borderRadius: 12,
          }}
          source={{
            uri:
              `${process.env.EXPO_PUBLIC_API_URL}/assets/${picturePath}` ??
              `${process.env.EXPO_PUBLIC_API_URL}/assets/empty.jpeg`,
          }}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.surface,
        }}
      >
        <IconButton
          icon={isLiked ? "cards-heart" : "cards-heart-outline"}
          iconColor={isLiked ? theme.colors.primary : theme.colors.textPrimary}
          onPress={patchLike}
          style={{
            marginVertical: -4,
          }}
          size={22}
        ></IconButton>
        <Text
          style={{
            color: theme.colors.textPrimary,
            marginRight: 10,
            fontSize: 18,
          }}
        >
          {likeCount}
        </Text>
        <IconButton
          icon="comment-outline"
          iconColor={theme.colors.textPrimary}
          onPress={() => setIsComments(!isComments)}
          style={{
            marginVertical: -4,
          }}
          size={21}
        ></IconButton>
        <Text
          style={{
            color: theme.colors.textPrimary,
            marginRight: 10,
            fontSize: 18,
            flex: 1,
          }}
        >
          {comments && comments.length}
        </Text>
        <IconButton
          icon="share-variant-outline"
          iconColor={theme.colors.textPrimary}
          onPress={() =>
            Share.share({
              message: `Check out this post on ExpressSocial: ${description}`,
              // url: `${process.env.EXPO_PUBLIC_API_URL}/assets/${picturePath}`,
              title: "ExpressSocial Post",
            })
          }
          style={{
            marginVertical: -4,
          }}
          size={22}
        ></IconButton>
      </View>
      {isComments && (
        <View style={styles.commentSection}>
          {comments.map((comment, i) => (
            <View key={`${name}-${i}`} style={styles.commentContainer}>
              <Image
                style={styles.commenterPicture}
                source={{
                  uri:
                    `${process.env.EXPO_PUBLIC_API_URL}/assets/${comment.userPicturePath}` ??
                    `${process.env.EXPO_PUBLIC_API_URL}/assets/empty.jpeg`,
                }}
              />
              <View style={styles.commentText}>
                <Text style={styles.commenterName}>
                  {comment.commenterName}
                </Text>
                <Text style={styles.commentContent}>{comment.commentText}</Text>
              </View>
            </View>
          ))}
          <TextInput
            style={styles.commentBox}
            placeholder="Write a comment"
            onChangeText={(text) => setCommentBoxText(text)}
            value={commentBoxText}
          />
          <TouchableOpacity
            style={styles.postButton}
            onPress={handleComment}
            disabled={!commentBoxText}
          >
            <Text style={styles.postButtonText}>Post Comment</Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  userPicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  location: {
    color: "#666",
  },
  description: {
    marginVertical: 10,
  },
  picture: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  like: {
    marginRight: 10,
  },
  likeCount: {
    marginRight: 20,
  },
  comment: {
    marginRight: 10,
  },
  commentCount: {
    marginRight: 20,
  },
  commentSection: {
    marginTop: 10,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  commenterPicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentText: {
    flex: 1,
  },
  commenterName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  commentContent: {
    color: "#666",
  },
  commentBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  postButtonText: {
    color: "#fff",
  },
});

export default PostWidget;
