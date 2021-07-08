import React, { Component, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: WIDTH } = Dimensions.get("window");
import COLORES from "../src/utils/Colores";
import { credentialsContext } from "./../components/Context";

import {
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from "react-native";

const Login = ({ navigation }) => {
  const [isSecuryEntry, setIsSecureEntry] = useState(true);
  const [Usuario, setUsuario] = useState("");
  const [Password, setPassword] = useState("");

  const signin = async () => {
    if (Usuario != "" && Password != "") {
      await fetch("http://119.8.144.182:1035/api/businesspartneraccess", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          UserName: Usuario,
          UserPassw: Password,
        }),
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.Observacion == "OK") {
            const result = resData.BPAnalyzerRP;
            const resultado = resData;
            const {Estado, Observacion, AccesoId, BusinessPartner, BPAnalyzerRP} = resultado;
            handleToast("BIENVENIDO:  " + BPAnalyzerRP[1].AnalizadorId);
            // navigation.navigate('Inicio', {...BPAnalyzerRP[0]});
          } else {
            handleToast(Observacion);
          }
        })
        .catch((error) => {
          handleToast("Intente de nuevo por favor!");
        });
    } else {
      handleToast("Campos vacios");
    }
  };

  const handleToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  return (
    <View
      style={{
        backgroundColor: COLORES.ORANGE,
        flex: 1,
      }}
    >
      <View
        style={{
          marginTop: 60,
          paddingTop: 50,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            alignItems: "center",
            width: 220,
            height: 40,
            resizeMode: "contain",
            position: "absolute",
          }}
          source={require("../src/images/alphablanco.png")}
        />
      </View>
      <View
        style={{
          marginTop: 70,

          backgroundColor: COLORES.BLACK,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          height: "100%",
          paddingHorizontal: 35,
        }}
      >
        <View>
          <TextInput
            style={{
              width: WIDTH - 100,
              backgroundColor: COLORES.WHITE,
              marginTop: 250,
              height: 45,
              borderRadius: 10,
              fontSize: 16,
              backgroundColor: "rgba(255, 255, 255, 255)",
              color: "rgba(0, 0, 0, 0.5)",
              textAlign: "center",
              marginHorizontal: 25,
              marginBottom: 12,
            }}
            value={Usuario}
            onChangeText={(anything) => setUsuario(anything)}
            placeholder={"user name"}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            underlineColorAndroid="transparent"
          />
        </View>
        <View>
          <TextInput
            style={{
              width: WIDTH - 100,
              backgroundColor: COLORES.WHITE,
              height: 45,
              borderRadius: 10,
              fontSize: 16,
              backgroundColor: "rgba(255, 255, 255, 255)",
              color: "rgba(0, 0, 0, 0.5)",
              textAlign: "center",
              marginHorizontal: 25,
              marginBottom: 12,
            }}
            value={Password}
            onChangeText={(anything) => setPassword(anything)}
            secureTextEntry={isSecuryEntry}
            placeholder={"password"}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            onPress={() => {
              setIsSecureEntry((prev) => !prev);
            }}
            style={{
              position: "absolute",
              top: 8,
              right: 37,
            }}
          >
            <Ionicons
              name={isSecuryEntry ? "ios-eye-outline" : "ios-eye-off-outline"}
              size={26}
              color={"rgba(0, 0, 0, 0.5)"}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: WIDTH - 220,
              height: 25,
              borderRadius: 4,
              backgroundColor: "#01a859",
              alignSelf: "flex-end",
              marginTop: 20,
              marginRight: 5,
            }}
            onPress={signin}
          >
            <Text
              style={{
                color: "rgba(255, 255, 255, 255)",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ marginTop: 80, flexDirection: "row", alignItems: "center" }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
          <View>
            <Text
              style={{ width: 50, textAlign: "center", color: "white" }}
            ></Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
        </View>
      </View>
    </View>
  );
};
export default Login;
