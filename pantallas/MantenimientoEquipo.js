import React, { Component, useEffect, useState, useContext } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  StyleSheet,
  Animated,
  FlatList,
  TouchableOpacity
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
      <View>
        <View>
        <Text style={{color:'white'}}>Tipo Mant.</Text>
        <Text style={{color:'white', position: "absolute", top: 4, right: 30}}>{TipoMant}</Text>
        </View>
        <View>
        <Text style={{color:'white'}}>Fecha</Text>
        <Text style={{color:'white', position: "absolute", top: 4, right: 30}}>{FechaMant}</Text>
        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

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
    backgroundColor: "black",
  },
  whiteCard: {
    marginTop: 90,
    backgroundColor: "#FFF",
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
  },
  blackCard: {
    marginTop: 1,
    marginBottom: 1,
    backgroundColor: "#000",
    marginRight: 1,
    marginLeft: 1,
    borderRadius: 15,
  },
  backHeaderCard: {
    backgroundColor: "#de5433",
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  textHeader: {
    color: "#fff",
    fontSize: 12,
    width: 75,
    marginRight: 5,
    fontWeight: "bold",
  },
  separator: {
    alignSelf: "stretch",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  contentText: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  textContent: {
    color: "white",
    fontSize: 11,
    width: 75,
    marginRight: 5,
  },
});

export default MantenimientoEquipo;
