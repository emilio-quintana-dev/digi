import { View, StyleSheet } from "react-native";
import { Button, Text, Icon } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    justifyContent: "center",
    flex: 1,
  },
  privacyText: { color: "gray", fontSize: 10 },
});

export default function Join({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Icon source="atom" size={125} />
      </View>

      <Text variant="displaySmall" style={{ marginBottom: 20 }}>
        Únete a Digi
      </Text>

      <Button
        icon="email"
        mode="outlined"
        onPress={() => navigation.push("Onboarding")}
        textColor="white"
        style={{ textAlign: "left", marginBottom: 10 }}
        compact
      >
        Continuar con Email
      </Button>

      <Button
        icon="google"
        mode="outlined"
        onPress={() => navigation.push("Onboarding")}
        textColor="white"
        style={{ textAlign: "left", marginBottom: 10 }}
        compact
        disabled
      >
        Continuar con Google
      </Button>

      <Button
        icon="apple"
        mode="outlined"
        onPress={() => navigation.push("Onboarding")}
        textColor="white"
        style={{ textAlign: "left", marginBottom: 20 }}
        compact
        disabled
      >
        Continuar con Apple
      </Button>

      <Text style={styles.privacyText}>
        Al registrarse, acepta los{" "}
        <Text style={{ textDecorationLine: "underline" }}>términos</Text> y la{" "}
        <Text style={{ textDecorationLine: "underline" }}>
          política de privacidad
        </Text>{" "}
        de Digi.
      </Text>
    </View>
  );
}
