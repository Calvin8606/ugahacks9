import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { User } from "../App";
interface props {
  user: User;
}

export const HomeScreen = ({ user }: props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Welcome {user.first_name}</Text>
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
});

export default HomeScreen;
