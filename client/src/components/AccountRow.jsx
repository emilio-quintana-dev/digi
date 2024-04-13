import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

const bancoDelPacifico = require("../assets/banco-del-pacifico-logo.png");

const styles = StyleSheet.create({
  container: { marginBottom: 20, display: "flex" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  column: { flexDirection: "column" },
  columnHeader: { fontWeight: "bold" },
  balanceAmount: { fontSize: 15, color: "white" },
  logo: {
    height: "100%",
    width: "100%",
  },
  card: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    logo: {
      height: "100%",
      width: "100%",
    },
  },
});

export default function AccountRow({ account }) {
  const { balance, name, masked_account_number } = account;

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.row}>
        <View style={styles.column}>
          <Card style={styles.card}>
            <Card.Content>
              <Image style={styles.card.logo} source={bancoDelPacifico} />
            </Card.Content>
          </Card>
        </View>

        <View>
          <Text>{name}</Text>
          <Text>{masked_account_number}</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}
