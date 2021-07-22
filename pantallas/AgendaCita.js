import React, { Component, useEffect, useState, useContext } from "react";
import { credentialsContext } from "../components/Context";
import { Card } from "react-native-elements";
import {
  Entypo,
  AntDesign
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
const { width, height } = Dimensions.get("window");
const { width: WIDTH } = Dimensions.get("window");

const AgendaCita = ({ navigation, route }) => {
  const { storedCredentials, setstoredCredentials } =
    useContext(credentialsContext);
  const { BusinessPartnerId, BusinessPartner } = storedCredentials;
  const { AnalyzerId, OptionId } = route.params;

  const [objOption, setobjOption] = useState([]);

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
    SchedulerId,
    BusinessPartnersId,
    AnalyzerId,
    ScheduleTypeId,
    Tipo,
    FechaCita,
    Asunto,
    Comentario,
    Atendido,
    EstadoColor,
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
            {/* <View
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
            ></View> */}

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}>Tipo</Text>

              <Text
                style={{
                  color: "black",
                  textTransform: "uppercase",
                }}
              >
                {Tipo}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}>Asunto</Text>

              <Text
                style={{
                  color: "black",
                  textTransform: "uppercase",
                }}
              >
                {Asunto}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}>Comentario</Text>

              <Text
                style={{
                  color: "black",
                  textTransform: "uppercase",
                }}
              >
                {Comentario}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTitle}>Atendido</Text>

              <Text
                style={{
                  color: "black",
                  textTransform: "uppercase",
                }}
              >
                {Atendido ? "Si" : "No"}
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
                <View
                  style={{
                    backgroundColor: EstadoColor,
                    position: "absolute",
                    // bottom: width * 0.27,
                    left: width * 0.75,
                    padding: 4,
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                  }}
                ></View>
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
          navigation.navigate("AgendaSuCita", {
            AnalyzerId: AnalyzerId,
            OptionId: OptionId,
          });
        }}
      >
        <Text style={styles.description}>Genere su cita </Text>
        <AntDesign
          name="right"
          size={20}
          color="white"
          style={{ position: "absolute", top: 15, right: 30 }}
        />
        {/* <Text style={{ color: "white", fontSize: 16 }}>Genere su cita</Text> */}
      </TouchableOpacity>
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
              SchedulerId={item.SchedulerId}
              BusinessPartnersId={item.BusinessPartnersId}
              AnalyzerId={item.AnalyzerId}
              ScheduleTypeId={item.ScheduleTypeId}
              Tipo={item.Tipo}
              FechaCita={item.FechaCita}
              Asunto={item.Asunto}
              Comentario={item.Comentario}
              Atendido={item.Atendido}
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

export default AgendaCita;
