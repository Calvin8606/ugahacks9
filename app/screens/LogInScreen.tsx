// Import necessary components and hooks
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
interface props {
  setLos: Function;
  setUserId: Function;
}

export const LoginForm = ({ setLos, setUserId }: props) => {
  // State to store input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [customerId, setCustomerId] = useState("");

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Make a POST request with the form data
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_BACKEND_URL}/nessie?url=http://api.nessieisreal.com/customers/?key=bf8433e4df1dc693db643a4926845cbb&method=POST`,
        {
          first_name: firstName,
          last_name: lastName,
          _id: customerId,
        }
      );
      // Handle success
      Alert.alert("Success", "You have logged in successfully!");
    } catch (error) {
      // Handle error
      Alert.alert("Error", "There was an issue with your login.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Customer ID"
        value={customerId}
        onChangeText={setCustomerId}
        style={styles.input}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button title="Log In" onPress={handleSubmit} />
        <Button
          title="need an account? Sign up"
          onPress={() => setLos(1)} // Update state on button click
        />
      </View>
    </View>
  );
};

// Styles for the form
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    gap: 5,
    marginBottom: 12,
  },
});

export default LoginForm;
