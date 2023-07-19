import { Formik } from "formik";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

//TODO reset from when chnaging page

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginScreen = ({ navigation }) => {
  const handleSubmit = async (values, actions) => {
    const { email, password } = values;
    try {
      const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const loggedIn = await loggedInResponse.json();
      if (loggedIn && loggedIn.msg !== "User not found") {
        navigation.replace("DrawerNavigationRoutes");
      } else {
        actions.setFieldError("general", "Incorrect email or password");
      }
    } catch (error) {
      actions.setFieldError("general", error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
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
          <View>
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Email Address"
              style={styles.input}
              autoCapitalize="none"
              autoCompleteType="off"
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Password"
              style={styles.input}
              secureTextEntry
            />
            <Button onPress={handleSubmit} title="Submit" />
            {errors.general && (
              <Text style={styles.error}>{errors.general}</Text>
            )}
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              New Here ? Register
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
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  error: {
    color: "red",
  },
});
