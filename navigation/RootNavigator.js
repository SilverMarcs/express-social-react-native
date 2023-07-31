import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { useSelector } from "react-redux";
import LoginScreen from "screens/LoginScreen";
import RegisterScreen from "screens/RegisterScreen";
import themeSettings from "theme";
import TabNavigator from "./TabNavigator.js";

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const mode = useSelector((state) => state.mode);
  const isAuth = useSelector((state) => state.token);

  return (
    <PaperProvider theme={themeSettings(mode)}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootNavigator;
