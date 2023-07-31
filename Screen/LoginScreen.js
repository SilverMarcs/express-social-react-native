import { setBackgroundColorAsync } from "expo-navigation-bar";
// import { StatusBar } from "expo-status-bar";
import { setStatusBarStyle } from "expo-status-bar";
import { Formik } from "formik";
import { useEffect } from "react";
import { Keyboard, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { setLogin } from "../State";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);

  const theme = useTheme();
  useEffect(() => {
    if (Platform.OS === "android") {
      // setBackgroundColorAsync(theme.colors.background);
    }
  });

  useEffect(() => {
    setStatusBarStyle(mode === "dark" ? "light" : "dark");
  });

  const handleSubmit = async (values, actions) => {
    const { email, password } = values;
    try {
      const loggedInResponse = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const loggedIn = await loggedInResponse.json();
      if (
        loggedIn &&
        loggedIn.msg !== "Invalid credentials" &&
        loggedIn.msg !== "User not found"
      ) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        // actions.resetForm();
        navigation.replace("TabNavigator");
      } else {
        alert("Incorrect email or password");
      }
    } catch (error) {
      actions.setFieldError("general", error.message);
    } finally {
      Keyboard.dismiss();
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
        Login
      </Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View
            style={{
              marginBottom: 60,
            }}
          >
            <TextInput
              label="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              mode="outlined"
              textColor={theme.colors.textPrimary}
              style={{ marginBottom: 10 }}
              autoCapitalize="none"
              autoCompleteType="off"
              error={Boolean(touched.email) && Boolean(errors.email)}
            />
            {errors.email && touched.email && (
              <Text style={[styles.error, { color: theme.colors.error }]}>
                {errors.email}
              </Text>
            )}
            <TextInput
              label="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              mode="outlined"
              textColor={theme.colors.textPrimary}
              style={{ marginBottom: 5 }}
              error={Boolean(touched.password) && Boolean(errors.password)}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={[styles.error, { color: theme.colors.error }]}>
                {errors.password}
              </Text>
            )}
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.surface}
            >
              Login
            </Button>
            {errors.general && (
              <Text
                style={[styles.error, { color: theme.colors.textSecondary }]}
              >
                {errors.general}
              </Text>
            )}
            <Text
              style={[
                styles.registerTextStyle,
                { color: theme.colors.primary },
              ]}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              Sign up here
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 30,
  },
  error: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    borderRadius: 5,
  },
  registerTextStyle: {
    fontSize: 16,
    marginTop: 30,
    marginLeft: 5,
  },
});
