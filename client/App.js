import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Icon } from "react-native-paper";

import Home from "./src/screens/Home";
import Banks from "./src/screens/Banks";
import Onboarding from "./src/screens/Onboarding";
import Join from "./src/screens/Join";

import theme from "./src/assets/theme";

function LogoTitle() {
  return <Icon source="atom" size={25} />;
}

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName="Join"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.onBackground,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Join"
            component={Join}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen name="Banks" component={Banks} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
