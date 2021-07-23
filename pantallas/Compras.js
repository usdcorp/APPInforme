import React, { Component, useEffect, useState } from "react";
import { View, TextInput, Image, Text, StyleSheet } from "react-native";
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

const { width, height } = Dimensions.get("window");
const { width: WIDTH } = Dimensions.get("window");

const Compras = ({ navigation, route }) => {

  const { AnalyzerId, OptionId } = route.params;
  const [objOption, setobjOption] = useState([]);

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
          setobjOption(respData);
        } else {
          console.log("Array vacio");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };


  const Item = ({
    ProductoId,
    Descripcion,
  }) => {
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
              <Text style={styles.textTitle}>Producto</Text>

              <Text
                style={{
                  color: "black",
                  textTransform: "uppercase",
                }}
              >
                <TouchableOpacity
                  style={{
                    marginLeft: 15,
                    borderRadius: 10,
                    width: WIDTH - 30,

                    alignItems: "center",
                    backgroundColor: "green",
                    padding: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("CompraProducto", {
                      ProductSaleId: ProductoId,
                    });
                  }}
                >
                  <Text style={styles.description}>{Descripcion} </Text>
                  {/* <AntDesign
                    name="right"
                    size={20}
                    color="white"
                    style={{ position: "absolute", top: 15, right: 30 }}
                  />
                  <Text style={{ color: "white", fontSize: 16 }}>Genere su cita</Text> */}
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
      <StatusBar style="light" />
      <Animated.FlatList
        keyExtractor={(item) => item.SchedulerId.toString()}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>Not found</Text>
          </View>
        )}
        data={objOption}
        renderItem={({ item }) => {
          return (
            <Item
              ProductoId={item.ProductoId}
              Descripcion={item.Descripcion}
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
  description: {
    textTransform: "uppercase",
    color: "#fff",
    fontWeight: "600",
    textAlign: "left",
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
});

export default Compras;
