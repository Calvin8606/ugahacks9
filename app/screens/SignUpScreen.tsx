import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
// @ts-ignore
import { EXPO_PUBLIC_BACKEND_URL } from "@env";
import LoginForm from "./LogInScreen";
interface Address {
  street_number: string;
  street_name: string;
  city: string;
  state: string;
  zip: string;
}

interface SignUpFormData {
  first_name: string;
  last_name: string;
  address: Address;
}
interface props {
  setUserId: Function;
  userId: string;
}

export const SignUpForm = ({ setUserId, userId }: props) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    first_name: "Evan",
    last_name: "Hanson",
    address: {
      street_number: "132",
      street_name: "watkinsville",
      city: "Watkinsville",
      state: "GA",
      zip: "30677",
    },
  });
  const [los, setLos] = useState(1);

  const handleSubmit = async () => {
    try {
      console.log("form data", formData);
      axios
        .post(
          `http://${
            EXPO_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL
          }/nessie?url=http://api.nessieisreal.com/customers/?key=bf8433e4df1dc693db643a4926845cbb&method=POST`,
          formData
        )
        .then((response) => {
          console.log(response.data); // handle the response data
          const data = response.data;
          console.log(data.code, typeof data.code);
          console.log(data.code === 201);
          if (data.code === 201) {
            console.log("ok");
            console.log(data.objectCreated._id);
            setUserId(data.objectCreated._id);
          } else {
            console.log("not okay");
          }
        })
        .catch((error) => {
          console.error("Error:", error.message); // handle the error
        });
    } catch (error) {}
  };

  return (
    <>
      {los === 1 ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Text>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.first_name}
            onChangeText={(text) =>
              setFormData({ ...formData, first_name: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={formData.last_name}
            onChangeText={(text) =>
              setFormData({ ...formData, last_name: text })
            }
          />
          {/* Address Inputs */}
          <TextInput
            style={styles.input}
            placeholder="Street Number"
            value={formData.address.street_number}
            onChangeText={(text) =>
              setFormData({
                ...formData,
                address: { ...formData.address, street_number: text },
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Street Name"
            value={formData.address.street_name}
            onChangeText={(text) =>
              setFormData({
                ...formData,
                address: { ...formData.address, street_name: text },
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={formData.address.city}
            onChangeText={(text) =>
              setFormData({
                ...formData,
                address: { ...formData.address, city: text },
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={formData.address.state}
            onChangeText={(text) =>
              setFormData({
                ...formData,
                address: { ...formData.address, state: text },
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Zip Code"
            value={formData.address.zip}
            onChangeText={(text) =>
              setFormData({
                ...formData,
                address: { ...formData.address, zip: text },
              })
            }
          />
          <View style={styles.buttonContainer}>
            <Button title="Create account" onPress={handleSubmit} />
            <Button
              title="already have an account? Log in"
              onPress={() => setLos(2)} // Update state on button click
            />
          </View>
        </ScrollView>
      ) : (
        <LoginForm setUserId={setUserId} setLos={setLos} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
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
