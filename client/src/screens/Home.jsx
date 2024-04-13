import { useEffect, useState } from "react";

import axios from "axios";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { ActivityIndicator } from "react-native-paper";

import Accounts from "../tabs/Accounts";
import Transactions from "../tabs/Transactions";

export default function Home({ navigation }) {
  const Tab = createMaterialBottomTabNavigator();
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:3000/users/1/accounts",
          "http://192.168.0.7:3000/users/1/accounts",
        );

        if (response.data) {
          setAccounts(response.data);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:3000/users/1/transactions",
          "http://192.168.0.7:3000/users/1/transactions",
        );

        if (response.data) {
          setTransactions(response.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
    fetchTransactions();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Tab.Navigator initialRouteName="Cuentas">
      <Tab.Screen
        name="Cuentas"
        options={{
          tabBarIcon: "account-multiple",
        }}
      >
        {() => <Accounts accounts={accounts} navigation={navigation} />}
      </Tab.Screen>

      <Tab.Screen
        name="Transacciones"
        options={{
          tabBarIcon: "bank-plus",
        }}
      >
        {() => <Transactions transactions={transactions} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
