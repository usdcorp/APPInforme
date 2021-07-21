import React, { Component, useEffect, useState, useContext } from "react";
import { Card } from "react-native-elements";

import {
  View,
  TextInput,
  Image,
  Text,
  StyleSheet,
  Animated,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { credentialsContext } from "../components/Context";

const MantenimientoEquipo = ({ route }) => {
  const { storedCredentials, setstoredCredentials } =
    useContext(credentialsContext);
  const { BusinessPartnerId, BusinessPartner } = storedCredentials;
  const { AnalyzerId, OptionId } = route.params;
  const [objBusinesspartneroptions, setobjBusinesspartneroptions] = useState(
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    fetch("http://119.8.144.182:1035/api/businesspartneroptions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        BusinessPartnerId: BusinessPartnerId,
        AnalyzerId: AnalyzerId,
        OptionId: OptionId,
      }),
    })
      .then((resp) => resp.json())
      .then((respData) => {
        if (respData !== null) {
          setobjBusinesspartneroptions(respData);
          // console.log(respData)
        } else {
          console.log("Array vacio");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const Item = ({
    MaintenanceId,
    TipoMant,
    FechaMant,
    Estado,
    Ingeniero,
    Reporte,
  }) => {
    return (
      <SafeAreaView >
        <ScrollView >
          <Card containerStyle={{backgroundColor:'#FFF'}}>
            <View style={{flexDirection:'row'}}>
              <Text>Tipo Mant.</Text>
              <Text>{TipoMant}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text>Tipo Mant.</Text>
              <Text>{TipoMant}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text>Tipo Mant.</Text>
              <Text>{TipoMant}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text>Tipo Mant.</Text>
              <Text>{TipoMant}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text>Tipo Mant.</Text>
              <Text>{TipoMant}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text>Tipo Mant.</Text>
              <Text>{TipoMant}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text>Tipo Mant.</Text>
              <Text>{TipoMant}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text>Tipo Mant.</Text>
              <Text>{TipoMant}</Text>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <View style={{ backgroundColor: "#000", flex: 1 }}>
      {/* <StatusBar style="light" /> */}

      <Animated.FlatList
        keyExtractor={(item) => item.MaintenanceId.toString()}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>Not found</Text>
          </View>
        )}
        data={objBusinesspartneroptions}
        renderItem={({ item }) => {
          return (
            <Item
              MaintenanceId={item.MaintenanceId}
              TipoMant={item.TipoMant}
              FechaMant={item.FechaMant}
              Estado={item.Estado}
              Ingeniero={item.Ingeniero}
              Reporte={item.Reporte}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default MantenimientoEquipo;
