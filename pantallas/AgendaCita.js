import React, { Component, useEffect, useState } from "react";
import { View, TextInput, Image, Text, StyleSheet } from "react-native";

const AgendaCita = ({ route }) => {
  const { AnalyzerId, OptionId } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={{color:'white'}}>AnalyzerId: {AnalyzerId}</Text>
        <Text style={{color:'white'}}>OptionId: {OptionId}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  subcontainer:{
      marginTop:90,
      marginRight:20,
      marginLeft:20
  }
});

export default AgendaCita;
