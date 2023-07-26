// import React, { useEffect, useState } from "react";
// import { FlatList, SafeAreaView, Text, View } from "react-native";
// // import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "../../State";
// import PostWidget from "./PostWidget";

// import { EXPO_PUBLIC_API_URL, env, process } from "@env";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../State";
import PostWidget from "./PostWidget";

const HomeScreen = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        {posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;
