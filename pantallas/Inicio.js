import React, { Component, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { credentialsContext } from "./../components/Context";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  ToastAndroid,
} from "react-native";


const Inicio = () => {

  // const disableBackButton = () => {
  //   BackHandler.exitApp();
  //   return true;
  // };

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", disableBackButton);
  //   return () => {
  //     BackHandler.removeEventListener("hardwareBackPress", disableBackButton);
  //   };
  // }, []);

  const getDataSession = async () =>{
      const value = await AsyncStorage.getItem('BusinessPartner');
      ToastAndroid.showWithGravity(
        value,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
  }

  
  const clearLogin = () => {
    AsyncStorage.removeItem('BusinessPartnerCredentials')
    .then(() =>{
      setstoredCredentials(false);
    })
    .catch(error => console.log(error));
  }
  return (

    <View style={styles.container}>


      <TouchableOpacity style={styles.button} onPress={clearLogin}>
        <Text>Salir </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getDataSession}>
        <Text>Datos </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("ActualizacionSW")}}>
        <Text>ActualizacionSW </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("AgendaCita")}}>
        <Text>AgendaCita </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Compras")}}>
        <Text>Compras </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("MantenimientoEquipo")}}>
        <Text>MantenimientoEquipo </Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
});

export default Inicio;
