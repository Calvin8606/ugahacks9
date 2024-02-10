import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { Deposit, Transaction, User, Withdraw } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// @ts-ignore
import { EXPO_PUBLIC_BACKEND_URL } from "@env";

interface Props {
  user: User;
  setUserId: Function;
  setUser: Function;
}

export const HomeScreen = ({ user, setUserId, setUser }: Props) => {
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
          setUser((prev: User) => ({
            ...prev,
            deposits: res.data as Deposit[],
          }));
        });

      axios
        .get(
          `http://${
            EXPO_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL
          }/nessie?url=http://api.nessieisreal.com/accounts/${
            user?.account._id
          }/withdrawals/?key=bf8433e4df1dc693db643a4926845cbb`
        )
        .then((res: any) => {
          console.log("HEEE", res);
          setUser((prev: User) => ({
            ...(prev as User),
            withdrawals: res.data as Withdraw[],
          }));
        });
      const customHeaders = {
        "X-Custom-Header": `http://api.nessieisreal.com/accounts/${user?.account?._id}/transfers?type=payer&key=bf8433e4df1dc693db643a4926845cbb`,
      };
      console.log("Custome head", customHeaders);
      axios
        .get(
          `http://${
            EXPO_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL
          }/nessie?url=http://api.nessieisreal.com/accounts/${
            user?.account?._id
          }/transfers?type=payer&key=bf8433e4df1dc693db643a4926845cbb`,
          {
            headers: customHeaders,
          }
        )
        .then((res: any) => {
          console.log("TRANS", res);
          setUser((prev: User) => ({
            ...(prev as User),
            transactionsTo: res.data as Transaction[],
          }));
        });
      const customHeaders2 = {
        "X-Custom-Header": `http://api.nessieisreal.com/accounts/${user?.account?._id}/transfers?type=payee&key=bf8433e4df1dc693db643a4926845cbb`,
      };
      axios
        .get(
          `http://${
            EXPO_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL
          }/nessie?url=http://api.nessieisreal.com/accounts/${
            user?.account?._id
          }/transfers?type=payee&key=bf8433e4df1dc693db643a4926845cbb`,
          {
            headers: customHeaders2,
          }
        )
        .then((res: any) => {
          console.log("TRANS", res);
          setUser((prev: User) => ({
            ...(prev as User),
            transactionsFrom: res.data as Transaction[],
          }));
        });
    }
  }, [user.account]);
  interface roww {
    _id: string;
    amount: number;
    type: string;
    date: string;
  }
  type row = { type: string; amount: string; date: string };
  const [rows, setRows] = useState<roww[]>();
  useEffect(() => {
    if (user.withdrawals && user.deposits) {
      const withdraws = user?.withdrawals.map((withd) => {
        return {
          type: "withdraw",
          amount: withd.amount,
          date: withd.transaction_date,
        } as roww;
      });

      const deposits = user?.deposits.map((withd) => {
        return {
          type: "deposit",
          amount: withd.amount,
          date: withd.transaction_date,
        } as roww;
      });

      setRows([...deposits, ...withdraws]);
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Welcome {user.first_name}</Text>
      {user.account && (
        <Text style={styles.balanceText}>Balance ${user.account.balance}</Text>
      )}
      <Text style={styles.transactionsHeader}>Transactions</Text>
      <FlatList
        data={rows}
        keyExtractor={(item) => `yoo ${Math.random()}`}
        renderItem={({ item }) => {
          // Capitalize the first letter and replace 'withdraw' with 'Withdraw' and 'deposit' with 'Deposit'
          const transactionType =
            item.type === 'withdraw'
              ? 'Withdraw'
              : item.type === 'deposit'
              ? 'Deposit'
              : item.type; // Adjust as needed for other types, if any

          return (
            <View style={styles.transactionRow}>
              <Text
                style={[
                  styles.transactionText,
                  item.type === 'deposit' ? styles.depositText : styles.withdrawText,
                ]}
              >
                {transactionType} - {item.date}: ${item.amount}
              </Text>
            </View>
          );
        }}
      />

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
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  balanceText: {
    fontSize: 24,
    marginBottom: 20,
  },
  transactionsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  transactionRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  transactionText: {
    fontSize: 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  transactionText: {
      fontSize: 16,
    },
    depositText: {
      color: 'green', // Choose a color for deposits
    },
    withdrawText: {
      color: 'red', // Choose a color for withdrawals
    },
});

export default HomeScreen;