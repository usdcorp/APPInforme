import React, { useState } from "react";
import Root from "./navegador/Root";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { credentialsContext } from "./components/Context";

export default function App() {
  const [appReady, setappReady] = useState(false);
  const [storedCredentials, setstoredCredentials] = useState("");

  checkLogin = () => {
    AsyncStorage.getItem("BusinessPartnerCredentials")
      .then((result) => {
        if (result !== null) {
          setstoredCredentials(JSON.parse(result));
        } else {
          setstoredCredentials(null);
        }
      })
      .catch((error) => console.warn(error));
  };

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLogin}
        onFinish={() => setappReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <credentialsContext.Provider
      value={{ storedCredentials, setstoredCredentials }}
    >
      <Root />
    </credentialsContext.Provider>
  );
}
