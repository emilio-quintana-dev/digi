import { Image, View } from "react-native";

import { Card, Text } from "react-native-paper";

const bancoDelPacifico = require("../assets/banco-del-pacifico-logo.png");

export default function AccountRow({ account }) {
  const { balance, name, masked_account_number } = account;

  return (
    <Card
      style={{
        marginBottom: 20,
      }}
    >
      <Card.Content
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View style={{ flexGrow: 1, flexDirection: "row" }}>
          <View style={{ marginRight: 20 }}>
            <Card
              style={{
                width: 50,
                height: 50,
                backgroundColor: "white",
              }}
            >
              <Card.Content>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  source={bancoDelPacifico}
                />
              </Card.Content>
            </Card>
          </View>

          <View style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>{name}</Text>
            <Text>{masked_account_number}</Text>
          </View>
        </View>

        <Text style={{ fontSize: 15, color: "white" }}>
          ${balance.toFixed(2)}
        </Text>
      </Card.Content>
    </Card>
  );
}
