import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { credentialsContext } from "./../components/Context";

import Login from "../pantallas/Login";
import Inicio from "../pantallas/Inicio";
import MantenimientoEquipo from "../pantallas/MantenimientoEquipo";
import ActualizacionSW from "../pantallas/ActualizacionSW";
import AgendaCita from "../pantallas/AgendaCita";
import Compras from "../pantallas/Compras";
import Perfil from "../pantallas/Perfil";
import nose from "../pantallas/nose";

const Stack = createStackNavigator();

const Root = () => {
  return (
    <credentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "transparent" },
              headerTransparent: true,
              headerTitle: "",
              headerLeftContainerStyle: { paddingLeft: 20 },
            }}
            initialRouteName="Login"
          >
            {storedCredentials ? (
              <>
                <Stack.Screen
                  options={{ headerTintColor: "white" }}
                  name="Inicio"
                  component={Inicio}
                />
                <Stack.Screen
                  options={{ headerTintColor: "white" }}
                  name="MantenimientoEquipo"
                  component={MantenimientoEquipo}
                />
                <Stack.Screen
                  options={{ headerTintColor: "white" }}
                  name="ActualizacionSW"
                  component={ActualizacionSW}
                />
                <Stack.Screen
                  options={{ headerTintColor: "white" }}
                  name="AgendaCita"
                  component={AgendaCita}
                />
                <Stack.Screen
                  options={{ headerTintColor: "white" }}
                  name="Compras"
                  component={Compras}
                />
                <Stack.Screen
                  options={{ headerTintColor: "white" }}
                  name="Perfil"
                  component={Perfil}
                />
              </>
            ) : (
              <Stack.Screen options={{}} name="Login" component={Login} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </credentialsContext.Consumer>
  );
};
export default Root;
