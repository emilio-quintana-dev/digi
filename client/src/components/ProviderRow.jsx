import { StyleSheet, View, Image } from "react-native";
import { Card, Text } from "react-native-paper";

const bancoDelPacifico = require("../assets/banco-del-pacifico-logo.png");
const bancoDelPichincha = require("../assets/banco-del-pichincha-logo.png");
const bancoInternacional = require("../assets/banco-internacional-logo.png");

const styles = StyleSheet.create({
  container: { padding: 10, marginBottom: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: { flex: 1 },
  columnHeader: { fontWeight: "bold", marginBottom: 5 },
  logo: {
    width: 50,
    height: 50,
  },
});

export default function ProviderRow({ provider, setSelectedProvider }) {
  const { name } = provider;

  const getLogo = (name) => {
    if (name.includes("Pacifico")) {
      return bancoDelPacifico;
    }

    if (name.includes("Pichincha")) {
      return bancoDelPichincha;
    }

    return bancoInternacional;
  };

  return (
    <Card
      mode="contained"
      style={styles.container}
      onPress={() => setSelectedProvider(provider)}
    >
      <Card.Content style={styles.row}>
        <Image style={styles.logo} source={getLogo(name)} />

        <View style={styles.column}>
          <Card.Content style={styles.row}>
            <Text variant="bodyLarge">{name}</Text>
          </Card.Content>
        </View>
      </Card.Content>
    </Card>
  );
}
