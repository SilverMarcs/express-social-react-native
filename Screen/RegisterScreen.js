import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  location: Yup.string().required("Location is required"),
  occupation: Yup.string().required("Occupation is required"),
  picture: Yup.string(),
});

const RegisterScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append(
      "picturePath",
      values.picture ? values.picture.name : "empty.jpeg"
    );

    const savedUserResponse = await fetch(
      `http://localhost:3001/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      alert("Registration successful. Log in to enter.");
      navigation.navigate("LoginScreen");
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          location: "",
          occupation: "",
          picture: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={register}
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
            {errors.firstName && touched.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}
            <TextInput
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
              placeholder="First Name"
              style={styles.input}
              autoCapitalize="words"
              autoCompleteType="off"
            />
            {errors.lastName && touched.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}
            <TextInput
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              placeholder="Last Name"
              style={styles.input}
              autoCapitalize="words"
              autoCompleteType="off"
            />
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
            {errors.location && touched.location && (
              <Text style={styles.error}>{errors.location}</Text>
            )}
            <TextInput
              onChangeText={handleChange("location")}
              onBlur={handleBlur("location")}
              value={values.location}
              placeholder="Location"
              style={styles.input}
              autoCapitalize="words"
              autoCompleteType="off"
            />
            {errors.occupation && touched.occupation && (
              <Text style={styles.error}>{errors.occupation}</Text>
            )}
            <TextInput
              onChangeText={handleChange("occupation")}
              onBlur={handleBlur("occupation")}
              value={values.occupation}
              placeholder="Occupation"
              style={styles.input}
              autoCapitalize="words"
              autoCompleteType="off"
            />
            {errors.picture && touched.picture && (
              <Text style={styles.error}>{errors.picture}</Text>
            )}
            <TextInput
              onChangeText={handleChange("picture")}
              onBlur={handleBlur("picture")}
              value={values.picture}
              placeholder="Leave this empty for now"
              style={styles.input}
              autoCapitalize="none"
              autoCompleteType="off"
            />
            <Button title="Pick an image from gallery" onPress={pickImage} />
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 50, height: 50 }}
              />
            )}
            {errors.picture && touched.picture && (
              <Text style={styles.error}>{errors.picture}</Text>
            )}
            <Button onPress={handleSubmit} title="Register" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterScreen;

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
