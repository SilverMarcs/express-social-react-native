import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import React, { useEffect } from "react";
import { IconButton, useTheme } from "react-native-paper";
import HomeScreen from "screens/HomeScreen";
import ProfileScreen from "screens/ProfileScreen";
import SettingsScreen from "screens/SettingsScreen";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const theme = useTheme();
  useEffect(() => {
    // setBackgroundColorAsync(theme.colors.surface);
  });
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "cog" : "cog-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account-outline";
          }

          // Set the icon color based on whether it is focused or not
          const iconColor = focused ? color : "grey";

          // You can return any component that you like here!
          return <IconButton icon={iconName} size={26} iconColor={iconColor} />;
        },

        tabBarStyle: {
          backgroundColor: theme.colors.surfaceDarker,
          borderTopColor: theme.colors.border, // set the border color
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: theme.colors.surfaceDarker,
          shadowColor: theme.colors.border,
        },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <IconButton
            icon="message-outline"
            iconColor={theme.colors.textPrimary}
            size={23}
            onPress={() => {
              // TODO
            }}
            style={{ marginRight: 10 }}
          />
        ),
        headerLeft: () => (
          <IconButton
            icon="account-outline"
            iconColor={theme.colors.textPrimary}
            size={25}
            onPress={() => {
              // TODO
            }}
            style={{ marginLeft: 10 }}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
