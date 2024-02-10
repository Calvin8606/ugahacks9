import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

function RemoveFundsScreen({ route, navigation, setBalance }) {
  const [amount, setAmount] = useState("");

  const handleRemoveFunds = () => {
    setBalance((prevBalance) => prevBalance - parseFloat(amount));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <Button title="Remove Funds" onPress={handleRemoveFunds} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
});

export default RemoveFundsScreen;
