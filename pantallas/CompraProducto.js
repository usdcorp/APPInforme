import React, { Component, useEffect, useState } from "react";
import { View, TextInput, Image, Text, StyleSheet } from "react-native";
import { credentialsContext } from "../components/Context";


const Compras = ({ route }) => {
    const { storedCredentials, setstoredCredentials } =
    useContext(credentialsContext);
  const { BusinessPartnerId, BusinessPartner } = storedCredentials;
  const { ProductSaleId } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={{color:'white'}}>AnalyzerId: {ProductSaleId}</Text>
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

export default Compras;
