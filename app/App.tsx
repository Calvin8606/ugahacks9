// App.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AddFundsScreen from "./screens/AddFundsScreen";
import RemoveFundsScreen from "./screens/RemoveFundsScreen";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { SignUpForm } from "./screens/SignUpScreen";
import { LoginForm } from "./screens/LogInScreen";
// @ts-ignore
import { EXPO_PUBLIC_BACKEND_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();
export interface Address {
  street_number: string;
  street_name: string;
  city: string;
  state: string;
  zip: string;
}

export interface Account {
  _id: string;
  balance: number;
  customer_id: string;
  nickname: string;
  reward: number;
  type: string;
}

export interface Deposit {
  _id: string;
  amount: number;
  medium: string;
  payee_id: string;
  status: string;
  transaction_date: string;
  type: string;
}
export interface Withdraw {
  _id: string;
  amount: number;
  medium: string;
  payer_id: string;
  status: string;
  transaction_date: string;
  type: string;
}
export interface Transaction {
  _id: string;
  amount: number;
  medium: string;
  payer_id: string;
  payee_id: string;
  status: string;
  transaction_date: string;
  type: string;
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  address: Address;
  account: Account;
  deposits: Deposit[];
  withdrawals: Withdraw[];
  transactionsTo: Transaction[];
  transactionsFrom: Transaction[];
}
export default function App() {
  const [balance, setBalance] = useState(100); // Starting balance
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        console.log("key", await value);
        setUserId(value);
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("USER", user);
  }, [user]);

  console.log(EXPO_PUBLIC_BACKEND_URL);
  useEffect(() => {
    const storeData = async (value: string) => {
      try {
        await AsyncStorage.setItem("@storage_Key", value);
        const value2 = await AsyncStorage.getItem("@storage_Key");
        console.log("value4444", value2);
      } catch (e) {
        // saving error
      }
    };
    storeData(userId);
    if (!userId) {
      setUser(undefined);
      return;
    }
    axios
      .get(
        `http://${
          EXPO_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL
        }/nessie?url=http://api.nessieisreal.com/customers/${userId}/?key=bf8433e4df1dc693db643a4926845cbb`
      )
      .then((response) => {
        console.log("getting");
        console.log(response.data);
        if (response.data) {
          const userd = response.data;
          //api.nessieisreal.com/customers/65c787c59683f20dd5188e4f/accounts/?key=bf8433e4df1dc693db643a4926845cbb
          axios
            .get(
              `http://${
                EXPO_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL
              }/nessie?url=http://api.nessieisreal.com/customers/${userId}/accounts/?key=bf8433e4df1dc693db643a4926845cbb`
            )
            .then((res: any) => {
              const accounts = res.data;
              console.log("accounts", res.data);
              if (accounts?.length === 0) {
                axios
                  .post(
                    `http://${
                      EXPO_PUBLIC_BACKEND_URL ||
                      process.env.EXPO_PUBLIC_BACKEND_URL
                    }/nessie?url=http://api.nessieisreal.com/customers/${userId}/accounts/?key=bf8433e4df1dc693db643a4926845cbb`,
                    {
                      type: "Checking",
                      nickname: "string",
                      rewards: 0,
                      balance: 500,
                    }
                  )
                  .then((thirdres: any) => {
                    console.log("third", thirdres);
                    setUser((prev) => ({
                      ...(prev as User),
                      account: thirdres.data.objectCreated as Account,
                    }));
                  });
              } else {
                axios
                  .get(
                    `http://${
                      EXPO_PUBLIC_BACKEND_URL ||
                      process.env.EXPO_PUBLIC_BACKEND_URL
                    }/nessie?url=http://api.nessieisreal.com/customers/${userId}/accounts/?key=bf8433e4df1dc693db643a4926845cbb`
                  )
                  .then((test: any) => {
                    console.log("ee", test.data[0]);
                    setUser((prev) => ({
                      ...(prev as User),
                      account: test.data[0] as Account,
                    }));
                  });
              }
            });
          setUser(response.data as User);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message); // handle the error
      });
  }, [userId]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => {
            return !user?.account ? (
              <SignUpForm setUserId={setUserId} userId={userId} />
            ) : (
              <HomeScreen setUser={setUser} setUserId={setUserId} user={user} />
            );
          }}
        </Stack.Screen>
        <Stack.Screen name="Add Funds">
          {(props) => <AddFundsScreen {...props} setBalance={setBalance} />}
        </Stack.Screen>
        <Stack.Screen name="Remove Funds">
          {(props) => <RemoveFundsScreen {...props} setBalance={setBalance} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
