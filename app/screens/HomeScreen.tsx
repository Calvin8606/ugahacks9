import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { User } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface props {
  user: User;
  setUserId: Function;
}

export const HomeScreen = ({ user, setUserId }: props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Welcome {user.first_name}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Log out"
          onPress={() => {
            AsyncStorage.removeItem("@storage_Key");
            setUserId("");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  balanceText: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 5,
    marginBottom: 12,
  },
});

export default HomeScreen;
