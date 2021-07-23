import React, { Component, useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
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
} from "react-native";
import { credentialsContext } from "../components/Context";

const { width, height } = Dimensions.get("window");
const { width: WIDTH } = Dimensions.get("window");

const CompraDetalle = ({ route }) => {
  const { storedCredentials, setstoredCredentials } =
    useContext(credentialsContext);
  const { BusinessPartnerId, BusinessPartner } = storedCredentials;
  const { ProductSaleId } = route.params;
  const [objProductoDetail, setobjProductoDetail] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    fetch("http://119.8.144.182:1035/api/businesspartnersproductsaledet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        BusinessPartnerId: BusinessPartnerId,
        ProductSaleId: ProductSaleId,
      }),
    })
      .then((resp) => resp.json())
      .then((respData) => {
        if (respData !== null) {
          setobjProductoDetail(respData);
        } else {
          console.log("Array vacio");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const Item = ({ ProductSaleDetailId, Descripcion, Cantidad }) => {
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
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}>Descripcion</Text>

              <Text
                style={{
                  marginRight:125,
                  color: "black",
                  textTransform: "uppercase",
                }}
              >
                {Descripcion}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}>Cantidad</Text>

              <Text
                style={{
                  color: "black",
                  textTransform: "uppercase",
                }}
              >
                {Cantidad}
              </Text>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <View style={{ backgroundColor: "#000", flex: 1, paddingTop: 90 }}>
      <StatusBar style="light" />
      <Animated.FlatList
        keyExtractor={(item) => item.ProductSaleDetailId.toString()}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>Not found</Text>
          </View>
        )}
        data={objProductoDetail}
        renderItem={({ item }) => {
          return (
            <Item
              ProductSaleDetailId={item.ProductSaleDetailId}
              Descripcion={item.Descripcion}
              Cantidad={item.Cantidad}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    textTransform: "uppercase",
    paddingBottom: 5,
    color: "#000",
    fontWeight: "bold",
    fontWeight: "600",
    textAlign: "left",
    width: width * 0.3,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
});

export default CompraDetalle;
