import { useState, useEffect } from "react";

import axios from "axios";

import capitalize from "lodash/capitalize";

import { ActivityIndicator, TextInput, Button, Text } from "react-native-paper";

import { Image, View, ScrollView } from "react-native";

const bancoDelPacifico = require("../assets/banco-del-pacifico-logo.png");
const prometeoLogo = require("../assets/prometeo.png");

const LinkAccountModal = ({ selectedProvider, navigation, setVisible }) => {
  const [formFields, setFormFields] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialFormFields = {};
    selectedProvider.auth_fields.forEach((field) => {
      initialFormFields[field.name] = "";
    });
    setFormFields(initialFormFields);
  }, [selectedProvider]);

  const handleInputChange = (name, value) => {
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePress = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        // "http://localhost:3000/provider_auth_sessions",
        "http://192.168.0.7:3000/provider_auth_sessions",
        {
          provider_id: selectedProvider.id,
          user_id: 1,
          ...formFields,
        },
      );

      if (response) {
        setIsLoading(false);
        setVisible(false);

        navigation.push("Home");
      }

      return null;
    } catch (error) {
      console.error("Error creating session:", error);
      return null;
    }
  };

  if (!selectedProvider) {
    return <ActivityIndicator />;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        display: "flex",
        justifyContent: "space-evenly",
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <View
          style={{
            padding: 15,
            borderRadius: 25,
          }}
        >
          <Image
            style={{
              height: 50,
              width: 50,
              padding: 10,
            }}
            source={bancoDelPacifico}
          />
        </View>
      </View>

      <View>
        {selectedProvider.auth_fields.map((field, index) => {
          return (
            <TextInput
              key={index}
              label={capitalize(field.name)}
              value={formFields[field.name]}
              onChangeText={(text) => handleInputChange(field.name, text)}
              mode="outlined"
              textColor="black"
              activeOutlineColor="red"
              outlineColor="gray"
              style={{ marginBottom: 10, backgroundColor: "white" }}
            />
          );
        })}
      </View>

      <Button
        mode="outlined"
        onPress={handlePress}
        buttonColor="red"
        textColor="white"
        style={{ borderColor: "red" }}
        icon="lock"
      >
        Link Account
      </Button>

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "gray" }}>Powered by</Text>

        <Image
          source={prometeoLogo}
          style={{
            width: 100,
            height: 50,
            resizeMode: "contain",
          }}
        />
      </View>
    </ScrollView>
  );
};

export default LinkAccountModal;
