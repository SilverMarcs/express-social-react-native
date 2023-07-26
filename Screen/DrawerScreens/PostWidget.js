// import { EXPO_PUBLIC_API_URL, env, process } from "@env";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../State";

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
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image
          style={styles.userPicture}
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}/assets/${picturePath}`,
          }}
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
      {picturePath && (
        <Image
          style={styles.picture}
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}/assets/${picturePath}`,
          }}
        />
      )}
      <View style={styles.cardFooter}>
        <TouchableOpacity onPress={patchLike}>
          <Text style={styles.like}>{isLiked ? "Liked" : "Like"}</Text>
        </TouchableOpacity>
        <Text style={styles.likeCount}>{likeCount}</Text>
        <TouchableOpacity onPress={() => setIsComments(!isComments)}>
          <Text style={styles.comment}>Comments</Text>
        </TouchableOpacity>
        <Text style={styles.commentCount}>{comments && comments.length}</Text>
      </View>
      {isComments && (
        <View style={styles.commentSection}>
          {comments.map((comment, i) => (
            <View key={`${name}-${i}`} style={styles.commentContainer}>
              <Image
                style={styles.commenterPicture}
                source={{
                  uri: `${process.env.EXPO_PUBLIC_API_URL}/assets/${comment.commenterPicturePath}`,
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
    </View>
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
