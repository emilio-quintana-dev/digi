import { useEffect, useState } from "react";

import axios from "axios";

import { StyleSheet, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Portal,
  Modal,
  Text,
  Searchbar,
} from "react-native-paper";

import ProviderRow from "../components/ProviderRow";
import LinkAccountModal from "../components/LinkAccountModal";

const styles = StyleSheet.create({
  container: { padding: 20 },
  containerTitle: { fontWeight: "bold", marginBottom: 5, color: "gray" },
  containerAction: { fontWeight: "bold", marginBottom: 5, color: "gray" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    height: "75%",
    borderRadius: 10,
  },
});

export default function Banks({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    if (selectedProvider) {
      showModal();
    } else {
      hideModal();
    }
  }, [selectedProvider]);

  useEffect(() => {
    const fetchProviders = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get("http://localhost:3000/providers");
        // const response = await axios.get("http://192.168.0.7:3000/providers");

        if (response.data) {
          setProviders(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response) {
        } else if (error.request) {
          console.log(error.request);
          setIsLoading(false);
        } else {
          console.log("Error", error.message);
          setIsLoading(false);
        }
      }
    };

    void fetchProviders();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 10 }}>
        Encuentra tu banco
      </Text>

      <Searchbar
        placeholder="Buscar"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ marginBottom: 20 }}
      />

      {providers.map((provider, index) => {
        return (
          <ProviderRow
            key={index}
            provider={provider}
            setSelectedProvider={setSelectedProvider}
          />
        );
      })}

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <LinkAccountModal
            selectedProvider={selectedProvider}
            setVisible={setVisible}
            navigation={navigation}
          />
        </Modal>
      </Portal>
    </ScrollView>
  );
}
