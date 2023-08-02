import User from "components/User";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "store/reducers";

const FriendListWidget = ({ _id }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const friends = useSelector((state) => state.user.friends);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    setIsLoading(true);
    getFriends();
    setIsLoading(false);
  }, []);

  const getFriends = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/users/${_id}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <View style={{ backgroundColor: theme.colors.surface }}>
      <Text color={theme.colors.textPrimary}>Friend List</Text>
      {!isLoading && friends && friends.length > 0 ? (
        <View>
          {friends.map((friend) => (
            <User
              key={friend._id}
              userId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
        </View>
      ) : (
        <Text color={theme.colors.textSecondary}>No friends yet</Text>
      )}
    </View>
  );
};
export default FriendListWidget;
