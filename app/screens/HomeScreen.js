import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

function HomeScreen({ navigation, balance }) {
  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Current Balance: ${balance}</Text>
      <Button
        title="Add Funds"
        onPress={() => navigation.navigate("Add Funds")}
      />
      <Button
        title="Remove Funds"
        onPress={() => navigation.navigate("Remove Funds")}
      />
    </View>
  );
}

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
