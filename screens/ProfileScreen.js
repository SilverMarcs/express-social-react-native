import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import FriendListWidget from "widgets/FriendListWidget";

const ProfileScreen = () => {
  const { _id } = useSelector((state) => state.user);

  return (
    <View>
      <FriendListWidget _id={_id} />
    </View>
  );
};

export default ProfileScreen;
