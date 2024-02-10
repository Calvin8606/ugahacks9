import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Deposit, User } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// @ts-ignore
import { EXPO_PUBLIC_BACKEND_URL } from "@env";
interface props {
  user: User;
  setUserId: Function;
  setUser: Function;
}

export const HomeScreen = ({ user, setUserId, setUser }: props) => {
  useEffect(() => {
    if (user.account) {
      axios
        .get(
          `http://${
            EXPO_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL
          }/nessie?url=http://api.nessieisreal.com/accounts/${
            user?.account._id
          }/deposits/?key=bf8433e4df1dc693db643a4926845cbb`
        )
        .then((res: any) => {
          console.log("HEEE", res);
          setUser((prev: User) => ({
            ...(prev as User),
            deposits: res.data as Deposit[],
          }));
        });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Welcome {user.first_name}</Text>
      {user.account && (
        <Text style={styles.balanceText}>balance ${user.account.balance}</Text>
      )}
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
