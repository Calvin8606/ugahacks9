// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddFundsScreen from './screens/AddFundsScreen';
import RemoveFundsScreen from './screens/RemoveFundsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [balance, setBalance] = useState(100); // Starting balance

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} balance={balance} />}
        </Stack.Screen>
        <Stack.Screen name="Add Funds">
          {props => <AddFundsScreen {...props} setBalance={setBalance} />}
        </Stack.Screen>
        <Stack.Screen name="Remove Funds">
          {props => <RemoveFundsScreen {...props} setBalance={setBalance} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
