import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { User } from "../App";
import axios from "axios";
// @ts-ignore
import { EXPO_PUBLIC_BACKEND_URL } from "@env";
interface Props {
  user: User;
  setUser?: Function;
  setRe: Function;
}

export const WithdrawScreen = ({ user, setUser, setRe }: Props) => {
  const [amount, setAmount] = useState("");
  function getCurrentDateFormatted(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // JS months are 0-based
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const handleAddFunds = () => {
    const customHeaders2 = {
      "X-Custom-Header": `http://api.nessieisreal.com/accounts/${user?.account?._id}/withdrawals?key=bf8433e4df1dc693db643a4926845cbb`,
    };
    const body = {
      medium: "balance",
      transaction_date: getCurrentDateFormatted().toString(),
      status: "pending",
      description: "a balance",
      amount: parseInt(amount),
    };
    console.log(body, customHeaders2);
    axios
      .post(
        `http://${
          EXPO_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL
        }/nessie?url=http://api.nessieisreal.com/accounts/${
          user?.account?._id
        }/withdrawals?key=bf8433e4df1dc693db643a4926845cbb`,
        body,
        {
          headers: customHeaders2,
        }
      )
      .then((res: any) => {
        console.log("eeee69", res);
        setRe((prev: number) => {
          prev + 1;
        });
      });
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
      <Button title="Withdraw Funds" onPress={handleAddFunds} />
    </View>
  );
};

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

export default WithdrawScreen;
