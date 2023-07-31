import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Divider, List, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "store/reducers";

const SettingsScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    // dispatch(setLogout()); // TODO: fix this
    navigation.replace("Auth");
  };

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <ScrollView>
        <List.Item
          title="Profile"
          titleStyle={{ color: theme.colors.textPrimary }}
          left={(props) => <List.Icon {...props} icon="account" />}
        />
        <Divider />
        <List.Item
          title="Notifications"
          titleStyle={{ color: theme.colors.textPrimary }}
          left={(props) => <List.Icon {...props} icon="bell-outline" />}
        />
        <Divider />
        <List.Item
          title="Privacy"
          titleStyle={{ color: theme.colors.textPrimary }}
          left={(props) => <List.Icon {...props} icon="lock-outline" />}
        />
        <Divider />
        <List.Item
          title="Language"
          titleStyle={{ color: theme.colors.textPrimary }}
          left={(props) => <List.Icon {...props} icon="web" />}
        />
        <Divider />
        <List.Item
          title="Help"
          titleStyle={{ color: theme.colors.textPrimary }}
          left={(props) => <List.Icon {...props} icon="help-circle-outline" />}
        />
      </ScrollView>
      <Button
        mode="outlined"
        onPress={handleLogout}
        style={{
          // backgroundColor: theme.colors.primary,
          margin: 20,
        }}
      >
        Logout
      </Button>
    </View>
  );
};

export default SettingsScreen;
