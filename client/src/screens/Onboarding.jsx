import { useState } from "react";

import { View, Text, StyleSheet } from "react-native";

import { default as OnboardingSwiper } from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";

import { TextInput, useTheme, Icon } from "react-native-paper";

import introductionAnimation from "../assets/animations/introduction.json";
import securityAnimation from "../assets/animations/security.json";
import linkingAnimation from "../assets/animations/linking.json";

// Screen 1: Enter e-mail screen
// Screen 2: Let's get you set up in 3 easy steps: Your info, Subscribe and Connect Banks
// Screen 3: What whould we call you?
// Screen 4: [Name], you are in safe hands. Data is encrypted.
// Screen 5: Let's start connecting.
// Screen 5: Connect to your banks.

const styles = StyleSheet.create({
  icon: { marginRight: 10 },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  container: {
    flex: 1,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 17.5,
    color: "gray",
  },
  subHeaderText: {
    color: "gray",
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    width: "90%",
  },
  lottie: {
    height: 375,
    width: 400,
  },
});

export default function Onboarding({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <OnboardingSwiper
        onDone={() => navigation.push("Banks")}
        nextLabel="Siguiente"
        showSkip={false}
        pages={[
          {
            backgroundColor: "rgb(27, 27, 31)",
            image: (
              <View style={styles.input}>
                <Text style={styles.headerText}>Ingresa tu email</Text>

                <Text style={styles.subHeaderText}>
                  Te enviaremos un codigo para verificar tu cuenta.
                </Text>

                <TextInput
                  label="Email"
                  value={email}
                  mode="outlined"
                  onChangeText={(email) => setEmail(email)}
                  activeOutlineColor={theme.colors.secondary}
                  outlineColor={theme.colors.secondary}
                />
              </View>
            ),
            title: "",
            subtitle: "",
          },
          {
            backgroundColor: "rgb(27, 27, 31)",
            image: (
              <View>
                <LottieView
                  autoPlay
                  loop
                  style={styles.lottie}
                  source={introductionAnimation}
                />
              </View>
            ),
            title: (
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginBottom: 20,
                  }}
                >
                  Vamos a configurar tu cuenta en 3 sencillos pasos
                </Text>
              </View>
            ),
            subtitle: (
              <View style={{ width: "100%", paddingLeft: 20 }}>
                <View style={styles.flexRow}>
                  <View style={styles.icon}>
                    <Icon source="numeric-1-box" size={30} />
                  </View>

                  <Text style={styles.listItem}>Información personal</Text>
                </View>

                <View style={styles.flexRow}>
                  <View style={styles.icon}>
                    <Icon source="numeric-2-box" size={30} />
                  </View>

                  <Text style={styles.listItem}>Suscríbete</Text>
                </View>

                <View style={styles.flexRow}>
                  <View style={styles.icon}>
                    <Icon source="numeric-3-box" size={30} />
                  </View>

                  <Text style={styles.listItem}>Conecta tus bancos</Text>
                </View>
              </View>
            ),
          },
          {
            backgroundColor: "rgb(27, 27, 31)",
            image: (
              <View style={styles.input}>
                <Text style={styles.headerText}>Cual es tu nombre?</Text>

                <TextInput
                  label="Nombre"
                  value={name}
                  mode="outlined"
                  onChangeText={(name) => setName(name)}
                  activeOutlineColor={theme.colors.secondary}
                  outlineColor={theme.colors.secondary}
                />
              </View>
            ),
            title: "",
            subtitle: "",
          },
          {
            backgroundColor: "rgb(27, 27, 31)",
            image: (
              <View>
                <LottieView
                  autoPlay={true}
                  loop={true}
                  style={styles.lottie}
                  source={securityAnimation}
                />
              </View>
            ),
            title: (
              <View>
                <Text style={styles.headerText}>
                  {name}, estas en buenas manos.
                </Text>
              </View>
            ),
            subtitle:
              "Digi toma muchas precauciones para proteger tus datos. Usamos encripción AES-256 para proteger tus datos en reposo y TLS para protegerlos mientras están en tránsito.",
          },
          {
            backgroundColor: "rgb(27, 27, 31)",
            image: (
              <View>
                <LottieView
                  autoPlay
                  loop
                  style={styles.lottie}
                  source={linkingAnimation}
                />
              </View>
            ),
            title: (
              <View>
                <Text style={styles.headerText}>Conecta tus bancos</Text>
              </View>
            ),
            subtitle:
              "Agrega todas las instituciones que utilizas cada mes para recibir ingresos, realizar compras, pagar facturas o ahorrar dinero.",
          },
        ]}
      />
    </View>
  );
}
