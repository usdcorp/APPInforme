import React, { Component, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { credentialsContext } from "../components/Context";

const { width: WIDTH } = Dimensions.get("window");
import COLORES from "../src/utils/Colores";

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
  const {storedCredentials, setstoredCredentials} = useContext(credentialsContext);

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
            const {Estado, Observacion, BPUserRP} = resData;
            const {BusinessPartner} = BPUserRP;
            persistLogin({...BPUserRP}, Observacion, Estado);

            handleToast("BIENVENIDO:  " + BusinessPartner);
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

  const persistLogin = (credentials, Observacion, Estado) =>{
    AsyncStorage.setItem('BusinessPartnerCredentials', JSON.stringify(credentials))
    .then(()=>{
      setstoredCredentials(credentials);
    })
    .catch((error)=>{
      console.warn(error)
    })
  }

  return (
    <View
      style={{
        backgroundColor: COLORES.BLACK,
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
             width: 281,
             height: 285,
            resizeMode: "contain",
            position: "absolute",
          }}
          source={require("../src/images/logob.png")}
        />
      </View>
      {/* <View
        style={{
          marginTop: 70,

          backgroundColor: COLORES.BLACK,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          height: "100%",
          paddingHorizontal: 35,
        }}
      > */}
        <View>
          <TextInput
            style={{
              width: WIDTH - 100,
              backgroundColor: COLORES.WHITE,
              marginTop: 350,
              height: 45,
              borderRadius: 10,
              fontSize: 16,
              backgroundColor: "rgba(255, 255, 255, 255)",
              color: "rgba(0, 0, 0, 0.5)",
              textAlign: "center",
              marginHorizontal: 43,
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
              marginHorizontal: 43,
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
              right: 27,
            }}
          >
            <Ionicons
              name={isSecuryEntry ? "ios-eye-outline" : "ios-eye-off-outline"}
              size={26}
              color={"rgba(254, 254, 254, 0.5)"}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: WIDTH - 220,
              height: 30,
              borderRadius: 4,
              //backgroundColor: "#01a859",
              backgroundColor: "#015dec",
              alignSelf: "flex-end",
              marginTop: 70,
              marginRight: 117
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
          {/* <View style={{ flex: 1, height: 1, backgroundColor: "white" }} /> */}
          <View>
            {/* <Text
              style={ { width: 50, textAlign: "center", color: "white" }}
            ></Text> */}
          </View>
          {/* <View style={{ flex: 1, height: 1, backgroundColor: "white" }} /> */}
        </View>
      {/* </View> */}
    </View>
  );
};
export default Login;
