import { Text, View, ScrollView } from "react-native";

import { Button, Card } from "react-native-paper";

import AccountRow from "../components/AccountRow";

// import BalanceLineChart from "../components/BalanceLineChart"; // Add later.

const Accounts = ({ accounts, navigation }) => {
  const totalBalance = accounts.reduce((acc, cur) => acc + cur.balance, 0);

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text
        style={{
          fontSize: 25,
          color: "gray",
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Cuentas
      </Text>

      <Card>
        <Card.Content>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                textTransform: "uppercase",
                color: "gray",
                marginBottom: 5,
              }}
            >
              Saldo total
            </Text>
          </View>

          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "#a7be6b",
            }}
          >
            ${totalBalance}
          </Text>
        </Card.Content>
      </Card>

      <View
        style={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Button onPress={() => navigation.push("Banks")}>Agregar</Button>
      </View>

      {accounts.length === 0 && (
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          No accounts linked. Add a bank to get started.
        </Text>
      )}

      {accounts.map((account, index) => {
        return <AccountRow account={account} key={index} />;
      })}
    </ScrollView>
  );
};

export default Accounts;
