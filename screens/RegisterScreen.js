import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const RegisterSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
  picture: yup.string(),
});

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleSubmit = async (values, actions) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append(
      "picturePath",
      values.picture ? values.picture.name : "empty.jpeg"
    );

    const savedUserResponse = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    actions.resetForm(); // this is a func that Formik gives us to reset the form

    if (savedUser) {
      navigation.navigate("LoginScreen");
    }
  };

  return (
    // <SafeAreaView>
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
        Register
      </Text>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          location: "",
          occupation: "",
        }}
        validationSchema={RegisterSchema}
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
              label="First Name"
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
              mode="outlined"
              textColor={theme.colors.textPrimary}
              style={{ marginBottom: 10 }}
              autoCapitalize="none"
              autoCompleteType="off"
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
            />
            {errors.firstName && touched.firstName && (
              <Text style={[styles.error, { color: theme.colors.error }]}>
                {errors.firstName}
              </Text>
            )}
            <TextInput
              label="Last Name"
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              mode="outlined"
              textColor={theme.colors.textPrimary}
              style={{ marginBottom: 10 }}
              autoCapitalize="none"
              autoCompleteType="off"
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
            />
            {errors.lastName && touched.lastName && (
              <Text style={[styles.error, { color: theme.colors.error }]}>
                {errors.lastName}
              </Text>
            )}
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
              style={{ marginBottom: 10 }}
              autoCapitalize="none"
              autoCompleteType="off"
              secureTextEntry={true}
              error={Boolean(touched.password) && Boolean(errors.password)}
            />
            {errors.password && touched.password && (
              <Text style={[styles.error, { color: theme.colors.error }]}>
                {errors.password}
              </Text>
            )}
            <TextInput
              label="Location"
              onChangeText={handleChange("location")}
              onBlur={handleBlur("location")}
              value={values.location}
              mode="outlined"
              textColor={theme.colors.textPrimary}
              style={{ marginBottom: 10 }}
              autoCapitalize="none"
              autoCompleteType="off"
              error={Boolean(touched.location) && Boolean(errors.location)}
            />
            {errors.location && touched.location && (
              <Text style={[styles.error, { color: theme.colors.error }]}>
                {errors.location}
              </Text>
            )}
            <TextInput
              label="Occupation"
              onChangeText={handleChange("occupation")}
              onBlur={handleBlur("occupation")}
              value={values.occupation}
              mode="outlined"
              textColor={theme.colors.textPrimary}
              style={{ marginBottom: 10 }}
              autoCapitalize="none"
              autoCompleteType="off"
              error={Boolean(touched.occupation) && Boolean(errors.occupation)}
            />
            {errors.occupation && touched.occupation && (
              <Text style={[styles.error, { color: theme.colors.error }]}>
                {errors.occupation}
              </Text>
            )}
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.surface}
            >
              Register
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
              onPress={() => navigation.navigate("LoginScreen")}
            >
              Already have an account? Login here
            </Text>
          </View>
        )}
      </Formik>
    </View>
    // </SafeAreaView>
  );
};

export default RegisterScreen;

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
    marginTop: 20,
    borderRadius: 5,
  },
  registerTextStyle: {
    fontSize: 16,
    marginTop: 30,
    marginLeft: 5,
  },
});
