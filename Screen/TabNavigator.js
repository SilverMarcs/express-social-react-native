import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { IconButton, useTheme } from "react-native-paper";
import HomeScreen from "./DrawerScreens/HomeScreen";
import ProfileScreen from "./DrawerScreens/ProfileScreen";
import SettingsScreen from "./DrawerScreens/SettingsScreen";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const theme = useTheme();
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
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
