// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import "react-native-gesture-handler";

// Import React and Component
// import dotenv from "dotenv";
// import "dotenv/config";
import React from "react";

// import { Provider } from "react-redux";
import store from "./State/store.js";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import DrawerNavigationRoutes from "./Screen/DrawerNavigationRoutes";
import LoginScreen from "./Screen/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen";
// import SplashScreen from "./Screen/SplashScreen";

// Import Redux Store
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { createStore, useSelector } from "redux";

// import rootReducer from "./reducers"; // Your root reducer

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
        options={{
          title: "Register", //Set Header Title
          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  // const mode = useSelector((state) => state.mode);
  // const isAuth = useSelector((state) => state.token);
  // const store = createStore(rootReducer);
  // const store2 = configureStore({
  //   reducer: rootReducer,
  // });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          {/* SplashScreen which will come once for 5 Seconds */}
          {/* <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        /> */}
          {/* Auth Navigator: Include Login and Signup */}
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
          {/* Navigation Drawer as a landing page */}
          <Stack.Screen
            name="DrawerNavigationRoutes"
            component={DrawerNavigationRoutes}
            // Hiding header for Navigation Drawer
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
