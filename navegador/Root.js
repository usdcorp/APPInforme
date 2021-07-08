import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {credentialsContext} from "./../components/Context"

import Login from "../pantallas/Login";
import Inicio from "../pantallas/Inicio";
import ActualizacionSW from "../pantallas/ActualizacionSW";
import AgendaCita from "../pantallas/AgendaCita";
import Compras from "../pantallas/Compras";
import MantenimientoEquipo from "../pantallas/MantenimientoEquipo";
import nose from "../pantallas/nose";

const Stack = createStackNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Inicio" component={Inicio}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
    
  //   <CredentialsContext.Consumer>
  //     {({ storedCredentials }) => (
  //       <NavigationContainer>
  //         <Stack.Navigator initialRouteName="Login">
  //           {storedCredentials ? (
  //             <Stack.Screen
  //               name="Inicio"
  //               component={Inicio}
  //               options={{
  //                 headerStyle: { backgroundColor: "transparent" },
  //                 headerTransparent: true,
  //                 headerTitle: "",
  //                 headerLeftContainerStyle: { paddingLeft: 20 },
  //               }}
  //             />
  //           ) : (
  //             <>
  //               <Stack.Screen
  //                 name="Login"
  //                 component={Login}
  //                 options={{
  //                   headerStyle: { backgroundColor: "transparent" },
  //                   headerTransparent: true,
  //                   headerTitle: "",
  //                   headerLeftContainerStyle: { paddingLeft: 20 },
  //                 }}
  //               />
  //             </>
  //           )}
  //           {/* <Stack.Screen
  //             name="Login"
  //             component={Login}
  //             options={{
  //               headerStyle: { backgroundColor: "transparent" },
  //               headerTransparent: true,
  //               headerTitle: "",
  //               headerLeftContainerStyle: { paddingLeft: 20 },
  //             }}
  //           /> */}
  //           {/* <Stack.Screen
  //             name="Inicio"
  //             component={Inicio}
  //             options={{
  //               headerStyle: { backgroundColor: "transparent" },
  //               headerTransparent: true,
  //               headerTitle: "",
  //               headerLeftContainerStyle: { paddingLeft: 20 },
  //             }}
  //           /> */}
  //           {/* <Stack.Screen
  //             name="ActualizacionSW"
  //             component={ActualizacionSW}
  //             options={{
  //               headerStyle: { backgroundColor: "transparent" },
  //               headerTransparent: true,
  //               headerTitle: "",
  //               headerLeftContainerStyle: { paddingLeft: 20 },
  //             }}
  //           />
  //           <Stack.Screen
  //             name="AgendaCita"
  //             component={AgendaCita}
  //             options={{
  //               headerStyle: { backgroundColor: "transparent" },
  //               headerTransparent: true,
  //               headerTitle: "",
  //               headerLeftContainerStyle: { paddingLeft: 20 },
  //             }}
  //           />
  //           <Stack.Screen
  //             name="Compras"
  //             component={Compras}
  //             options={{
  //               headerStyle: { backgroundColor: "transparent" },
  //               headerTransparent: true,
  //               headerTitle: "",
  //               headerLeftContainerStyle: { paddingLeft: 20 },
  //             }}
  //           />
  //           <Stack.Screen
  //             name="MantenimientoEquipo"
  //             component={MantenimientoEquipo}
  //             options={{
  //               headerStyle: { backgroundColor: "transparent" },
  //               headerTransparent: true,
  //               headerTitle: "",
  //               headerLeftContainerStyle: { paddingLeft: 20 },
  //             }}
  //           />
  //           <Stack.Screen
  //             name="nose"
  //             component={nose}
  //             options={{
  //               headerStyle: { backgroundColor: "transparent" },
  //               headerTransparent: true,
  //               headerTitle: "",
  //               headerLeftContainerStyle: { paddingLeft: 20 },
  //             }}
  //           /> */}
  //         </Stack.Navigator>
  //       </NavigationContainer>
  //     )}
  //   </CredentialsContext.Consumer>
  // );
}
export default Root;
