import React, { Component, useEffect, useState, useContext } from "react";
import { Card } from "react-native-elements";
import { Entypo, AntDesign } from "@expo/vector-icons";

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
  Keyboard,
} from "react-native";
import { credentialsContext } from "../components/Context";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");
const { width: WIDTH } = Dimensions.get("window");

const CompraProducto = ({ route }) => {
  const { storedCredentials, setstoredCredentials } =
    useContext(credentialsContext);
  const { BusinessPartnerId, BusinessPartner } = storedCredentials;
  const { AnalyzerId, OptionId } = route.params;
  const [objProductos, setobjProductos] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    fetch("http://119.8.144.182:1035/api/businesspartnercustomerproducts", {
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
          setobjProductos(respData);
        } else {
          console.log("Array vacio");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const Item = ({ ProductoId, Descripcion, Cantidad }) => {

    const onAdd = () => {
      setCount(Cantidad + 1)
    }
    const onSubtract = () => {
      setCount(Cantidad - 1)
    }

    return (
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 20,
              paddingLeft: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                padding: 5,
              }}
            >
              <Text style={{ color: "white" }}>{Descripcion}</Text>
            </View>
            <View style={{ flexDirection: "row", marginLeft: 20 }}>
              <TouchableOpacity onPress={() => setCount(count - 1)}>
                <AntDesign name="minuscircleo" size={24} color="red" />
              </TouchableOpacity>
              <TextInput
                style={{
                  width: 30,
                  borderRadius: 10,
                  fontSize: 16,
                  backgroundColor: "#000",
                  color: "rgba(255, 255, 255, 0.9)",
                  textAlign: "center",
                }}
                value={count.toString()}
                placeholder={"00/00/0000"}
                placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                underlineColorAndroid="transparent"
              />

              <TouchableOpacity onPress={() => setCount(count + 1)}>
                <AntDesign name="pluscircleo" size={24} color="green" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <View style={{ backgroundColor: "#000", flex: 1, paddingTop: 90 }}>
      <StatusBar style="light" />

      <Animated.FlatList
        keyExtractor={(item) => item.ProductoId.toString()}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>Not found</Text>
          </View>
        )}
        data={objProductos}
        renderItem={({ item }) => {
          return (
            <Item
              ProductoId={item.ProductoId}
              Descripcion={item.Descripcion}
              Cantidad={item.Cantidad}
            />
          );
        }}
      />
      <View style={{ paddingTop: 30, marginLeft: 20, marginBottom: 20 }}>
        <TouchableOpacity
          // onPress={sedParameters}
          style={{
            backgroundColor: "#de5433",
            padding: 10,
            borderRadius: 5,
            width: WIDTH - 30,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Generar Compra
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    textTransform: "uppercase",
    paddingBottom: 10,
    color: "#fff",
    fontWeight: "600",
    textAlign: "left",
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
});

export default CompraProducto;
