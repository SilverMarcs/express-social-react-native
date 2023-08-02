import { Image, Text, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "store/reducers";

const User = ({ userId, name, subtitle, userPicturePath }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const friends = useSelector((state) => state.user.friends);
  const { _id } = useSelector((state) => state.user); // logged in user
  const isFriend = friends.find((friend) => friend._id === userId);
  const isSelf = _id === userId;

  const patchFriend = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${_id}/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      alert("An error ocurred while adding friend.");
    }
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        style={{
          width: 55,
          height: 55,
          borderRadius: 27.5,
          marginRight: 13,
        }}
        source={{
          uri: userPicturePath,
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
          {subtitle}
        </Text>
      </View>
      {!isSelf && (
        <IconButton
          animated={true}
          mode="contained-tonal"
          iconColor={theme.colors.primaryDark}
          containerColor={theme.colors.primaryLight}
          onPress={patchFriend}
          icon={isFriend ? "account-minus-outline" : "account-plus-outline"}
          // icon="cog-outline"
        />
      )}
    </View>
  );
};

export default User;
