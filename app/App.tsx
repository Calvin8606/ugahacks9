// App.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AddFundsScreen from "./screens/AddFundsScreen";
import RemoveFundsScreen from "./screens/RemoveFundsScreen";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { SignUpForm } from "./screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [balance, setBalance] = useState(100); // Starting balance
  const [userId, setUserId] = useState("none");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <SignUpForm setUserId={setUserId} userId={userId} />}
        </Stack.Screen>
        <Stack.Screen name="user">
          {(props) => <HomeScreen {...props} balance={balance} />}
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
