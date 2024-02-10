import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { Deposit, User } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// @ts-ignore
import { EXPO_PUBLIC_BACKEND_URL } from '@env';

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
          `http://${EXPO_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL}/nessie?url=http://api.nessieisreal.com/accounts/${user?.account._id}/deposits/?key=bf8433e4df1dc693db643a4926845cbb`
        )
        .then((res: any) => {
          setUser((prev: User) => ({
            ...prev,
            deposits: res.data as Deposit[],
          }));
        });
    }
  }, [user.account]);

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Welcome {user.first_name}</Text>
      {user.account && (
        <Text style={styles.balanceText}>Balance ${user.account.balance}</Text>
      )}
      <Text style={styles.transactionsHeader}>Transactions</Text>
      <FlatList
        data={user.deposits}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.transactionRow}>
            <Text style={styles.transactionText}>{item.transaction_date}: ${item.amount}</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Log out"
          onPress={() => {
            AsyncStorage.removeItem('@storage_Key');
            setUserId('');
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
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  transactionRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  transactionText: {
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default HomeScreen;
