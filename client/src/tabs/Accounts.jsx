import { Button, Card, Icon, Chip } from "react-native-paper";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import AccountRow from "../components/AccountRow";
import BalanceLineChart from "../components/BalanceLineChart";

const styles = StyleSheet.create({
  container: { padding: 10 },
  accountsText: {
    fontSize: 25,
    color: "gray",
    fontWeight: "bold",
    marginBottom: 10,
  },
  assetsText: {
    fontSize: 15,
    textAlign: "center",
    color: "gray",
    fontWeight: "bold",
  },
  balanceAmount: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
  },
  containerTitle: { fontWeight: "bold", marginBottom: 5, fontSize: 15 },
  containerAction: { fontWeight: "bold", marginBottom: 5 },
  row: {
    display: "flex",
    alignItems: "flex-end",
  },
});

const Accounts = ({ accounts, navigation }) => {
  const totalBalance = accounts.reduce((acc, cur) => acc + cur.balance, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.accountsText}>Cuentas</Text>

      <Card style={{ borderColor: "#38383a", borderWidth: 1 }}>
        <Card.Content>
          <View style={{ marginBottom: 10 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ marginRight: 5 }}>
                <Icon source="circle" size={10} color="rgb(84, 219, 200)" />
              </View>

              <Text style={styles.assetsText}>Saldo total</Text>
            </View>

            <Text style={styles.balanceAmount}>${totalBalance}</Text>
          </View>

          <BalanceLineChart />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button mode="contained">7D</Button>
            <Button>1M</Button>
            <Button>3M</Button>
            <Button>6M</Button>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.row}>
        <Button onPress={() => navigation.push("Banks")}>Agregar</Button>
      </View>

      {accounts.length === 0 && (
        <Text style={styles.containerAction}>
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
