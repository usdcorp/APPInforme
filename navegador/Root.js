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
import nose from "../pantallas/nose";

const Stack = createStackNavigator();

const Root = () => {
  return (
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
        <Stack.Screen options={{}} name="Login" component={Login} />
        <Stack.Screen options={{}} name="Inicio" component={Inicio} />
        <Stack.Screen
          name="MantenimientoEquipo"
          component={MantenimientoEquipo}
        />
        <Stack.Screen name="ActualizacionSW" component={ActualizacionSW} />
        <Stack.Screen name="AgendaCita" component={AgendaCita} />
        <Stack.Screen name="Compras" component={Compras} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};
export default Root;
