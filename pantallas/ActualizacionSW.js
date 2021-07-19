import React, { Component, useEffect, useState } from "react";
import { View, TextInput, Image, Text, StyleSheet } from "react-native";

const ESPACIO = 40;


const ActualizacionSW = ({ route }) => {
  const { AnalyzerId, OptionId } = route.params;

  const [value, onChangeText] = React.useState("Useless Multiline Placeholder");
  return (
    <View
      style={{
        flex: 1,
        // flexDirection: "row",
        backgroundColor: "#000",
      }}
    >
      <View
        style={{
          marginTop: 90,
          marginBottom: 20,
          marginRight: 20,
          marginLeft: 20,
          flexDirection: "row",
        }}
      >
        <Text style={{ color: "white", width: 150, fontSize: 20 }}>Tipo</Text>
        <Text style={{ color: "white", fontSize: 20 }}>Tipo</Text>
      </View>
      <View
        style={{
          marginRight: 20,
          marginBottom: 20,
          marginLeft: 20,
          flexDirection: "row",
        }}
      >
        <Text style={{ color: "white", width: 150, fontSize: 20 }}>Fecha</Text>
        <Text style={{ color: "white", fontSize: 20 }}>Tipo</Text>
      </View>
      <View
        style={{
          marginRight: 20,
          marginBottom: 20,
          marginLeft: 20,
          flexDirection: "row",
        }}
      >
        <Text style={{ color: "white", width: 150, fontSize: 20 }}>
          Comentario
        </Text>
        {/* <TextInput
        style={{backgroundColor:'white'}}
        placeholder='Comentario'
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ActualizacionSW;
