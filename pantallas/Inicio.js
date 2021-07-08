import React, { Component, useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  ToastAndroid,
  ListItem
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CredentialsContext } from "./../components/CredentialsContext";

const Inicio = ({ route }) => {
  const resul = route.params;

  const Item = ({ Analizador }) => (
    <View >
      <Text >{Analizador}</Text>
    </View>
  );

  const nose = () => {
    handleToast(Analizador);
  };

  const handleToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={listItems}>
        <Text>nose </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("ActualizacionSW");
        }}
      >
        <Text>ActualizacionSW </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("AgendaCita");
        }}
      >
        <Text>AgendaCita </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Compras");
        }}
      >
        <Text>Compras </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("MantenimientoEquipo");
        }}
      >
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
