import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { User } from "../App"; // Assuming these interfaces are defined in App.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// @ts-ignore
import { EXPO_PUBLIC_BACKEND_URL } from "@env";

interface Props {
  user: User;
  setUserId: Function;
  setUser: Function;
}

// Define a type for the unified transaction to ensure type safety
interface UnifiedTransaction {
  _id: string;
  amount: number;
  transaction_date: string;
  type: 'Deposit' | 'Withdrawal' | 'Transaction To' | 'Transaction From';
}

export const HomeScreen = ({ user, setUserId, setUser }: Props) => {
useEffect(() => {
    if (user.account) {
      // Fetch deposits
      axios.get(`http://${
      EXPO_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL
      }/nessie?url=http://api.nessieisreal.com/accounts/${
      user?.account._id
      }/withdrawals/?key=bf8433e4df1dc693db643a4926845cbb`)
        .then((res) => {
          const depositsWithTypes = res.data.map((deposit) => ({
            ...deposit,
            type: 'Deposit',
          }));
          setUser(prev => ({ ...prev, deposits: depositsWithTypes }));
        })
        .catch(error => console.error("Error fetching deposits:", error));

      // Fetch withdrawals
      axios.get(`http://api.nessieisreal.com/accounts/${user?.account?._id}/transfers?type=payer&key=bf8433e4df1dc693db643a4926845cbb`)
        .then((res) => {
          const withdrawalsWithTypes = res.data.map((withdrawal) => ({
            ...withdrawal,
            type: 'Withdrawal',
          }));
          setUser(prev => ({ ...prev, withdrawals: withdrawalsWithTypes }));
        })
        .catch(error => console.error("Error fetching withdrawals:", error));

      // Add similar API calls for transactionsTo and transactionsFrom with appropriate handling
    }
  }, [user.account, EXPO_PUBLIC_BACKEND_URL, setUser]);

  // Create a unified transactions list with type safety
  const allTransactions: UnifiedTransaction[] = [
    ...(user.deposits || []).map(deposit => ({
      ...deposit,
      type: 'Deposit' as const, // Ensures the type is exactly 'Deposit'
    })),
    ...(user.withdrawals || []).map(withdrawal => ({
      ...withdrawal,
      type: 'Withdrawal' as const, // Ensures the type is exactly 'Withdrawal'
    })),
    ...(user.transactionsTo || []).map(transaction => ({
      ...transaction,
      type: 'Transaction To' as const, // Ensures the type is exactly 'Transaction To'
    })),
    ...(user.transactionsFrom || []).map(transaction => ({
      ...transaction,
      type: 'Transaction From' as const, // Ensures the type is exactly 'Transaction From'
    })),
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Welcome {user.first_name}</Text>
      {user.account && (
        <Text style={styles.balanceText}>Balance: ${user.account.balance}</Text>
      )}
      <Text style={styles.transactionsHeader}>Transactions</Text>
      <FlatList
        data={allTransactions}
        keyExtractor={(item, index) => `${item._id}-${index}`} // Guarantee uniqueness
        renderItem={({ item }) => (
          <View style={styles.transactionRow}>
            <Text style={styles.transactionText}>
              {item.type}: {item.transaction_date} - ${item.amount}
            </Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Log out"
          onPress={() => {
            AsyncStorage.removeItem("@storage_Key");
            setUserId("");
            setUser(undefined); // Reset user state upon logout
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
    marginTop: 20,
    alignItems: "center",
  },
});

export default HomeScreen;
