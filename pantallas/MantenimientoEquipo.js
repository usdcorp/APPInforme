import React, { Component, useEffect, useState, useContext } from "react";
import { Card } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as OpenAnything from 'react-native-openanything';

import {
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { credentialsContext } from "../components/Context";
const { width, height } = Dimensions.get("window");

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
    TieneReporte,
    EstadoColor,

  }) => {
    const path = `${Reporte}`;

    return (
      <SafeAreaView>
        <ScrollView>
          <Card
            containerStyle={{
              backgroundColor: "#FFF",
              borderRadius: 10,
              borderColor: "none",
            }}
          >
            <View
              style={{
                backgroundColor: EstadoColor,
                position: "absolute",
                bottom: width * 0.27,
                left: width * 0.75,
                padding: 4,
                height: 30,
                width: 30,
                borderRadius: 15,
              }}
            ></View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}>Tipo Mant.</Text>

              <Text
                style={{
                  color: "black",
                  textTransform: "uppercase",
                }}
              >
                {TipoMant}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}>Fecha</Text>

              <Text
                style={{
                  color: "black",
                  textTransform: "uppercase",
                }}
              >
                {FechaMant}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}>Estado</Text>

              <Text
                style={{
                  color: "black",
                  textTransform: "uppercase",
                }}
              >
                {Estado}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}>Ingeniero</Text>

              <Text
                style={{
                  color: "black",
                  textTransform: "uppercase",
                }}
              >
                {Ingeniero}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}>Reporte</Text>

              <Text
                style={{
                  color: "black",
                  textTransform: "uppercase",
                }}
              > 
                <TouchableOpacity
                  onPress={()=> OpenAnything.Pdf(`${Reporte}`) }
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 37,
                  }}
                >
                  
                  <FontAwesome5
                    name={
                      TieneReporte ? "file-pdf" : ""
                    }
                    size={26}
                    color={"#ff2116"}
                  />
                </TouchableOpacity>
              </Text>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <View style={{ backgroundColor: "#000", flex: 1, paddingTop: 90 }}>
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
              TieneReporte={item.TieneReporte}
              EstadoColor={item.EstadoColor}
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
  textTitle: {
    //textTransform: "uppercase",
    paddingBottom: 5,
    fontWeight: "bold",
    color: "#000",
    fontWeight: "bold",
   // fontWeight: "600",
    textAlign: "left",
    width: width * 0.3,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 135,
    left: width * 0.75,
    padding: 4,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});

export default MantenimientoEquipo;
