import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

import Root from "./navegador/Root";

import { credentialsContext } from "./components/Context";

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setstoredCredentials] = useState("");

  const checkLogincredentials = () => {
    AsyncStorage.getItem("BusinessPartnerCredentials")
      .then((resp) => {
        if (resp !== null) {
          setstoredCredentials(JSON.parse(resp));
        } else {
          setstoredCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLogincredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <credentialsContext.Provider value={{storedCredentials, setstoredCredentials}}>
      <Root />
    </credentialsContext.Provider>
  );
}
