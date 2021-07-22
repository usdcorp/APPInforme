import React, { Component, useEffect, useState, useContext } from "react";
import { credentialsContext } from "../components/Context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Fontisto } from "@expo/vector-icons";

import {
  View,
  TextInput,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Keyboard,
  Picker,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("window");
const { width: WIDTH } = Dimensions.get("window");

const AgendaSuCita = ({ route }) => {
  const { storedCredentials, setstoredCredentials } =
    useContext(credentialsContext);
  const { BusinessPartnerId, BusinessPartner } = storedCredentials;
  const { AnalyzerId, OptionId } = route.params;
  const [objCombo, setobjCombo] = useState([]);
  const [objComboSeleccionado, setobjComboSeleccionado] = useState([]);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");

  const onChange = (event, selectedDate) => {
    const courrentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(courrentDate);

    let tempDate = new Date(courrentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
    console.log(fDate);
  };

  const showMode = (courrentMode) => {
    setShow(true);
    setMode(courrentMode);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    fetch("http://119.8.144.182:1035/api/businesspartnerschedulertype", {
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
          setobjCombo(respData);
        } else {
          console.log("Array vacio");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <View
      style={{
        backgroundColor: "#000",
        flex: 1,
        paddingTop: 90,
        paddingLeft: 20,
      }}
    >
      <View>
        <Text
          style={{
            textTransform: "uppercase",
            paddingBottom: 5,
            color: "#FFF",
            fontWeight: "bold",
            textAlign: "left",
            width: width * 0.35,
            marginRight: 10,
            fontSize: 16,
            lineHeight: 16 * 1.5,
          }}
        >
          Tipo
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 5,
            width: WIDTH - 30,
          }}
        >
          <Picker
            style={{
              color: "white",
            }}
            selectedValue={objComboSeleccionado}
            onValueChange={(itemValue, itemIndex) =>
              setobjComboSeleccionado(itemValue)
            }
          >
            {objCombo.map((item) => {
              return (
                <Picker.Item
                  key={item.ScheduleTypeId}
                  color="c2c2c1"
                  value={item.ScheduleTypeId}
                  label={item.Descripcion}
                />
              );
            })}
          </Picker>
        </View>
      </View>

      <View style={{ paddingTop: 20 }}>
        <Text
          style={{
            textTransform: "uppercase",
            paddingBottom: 5,
            color: "#FFF",
            fontWeight: "bold",
            textAlign: "left",
            width: width * 0.35,
            marginRight: 10,
            fontSize: 16,
            lineHeight: 16 * 1.5,
          }}
        >
          Fecha
        </Text>

        <View>
          <TextInput
            style={{
              width: WIDTH - 30,
              backgroundColor: "white",
              height: 45,
              borderRadius: 10,
              fontSize: 16,
              backgroundColor: "rgba(255, 255, 255, 255)",
              color: "rgba(0, 0, 0, 0.5)",
              textAlign: "center",
              // marginHorizontal: 25,
              // marginBottom: 12,
            }}
            // value={Password}
            // onChangeText={(anything) => setPassword(anything)}
            // secureTextEntry={isSecuryEntry}
            placeholder={"password"}
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            // onPress={() => {
            //   setIsSecureEntry((prev) => !prev);
            // }}
            style={{
              position: "absolute",
              top: 8,
              right: 37,
            }}
          >
            <Fontisto name="date" size={26} color={"rgba(0, 0, 0, 0.5)"} />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={{ color: "white" }}> {text} </Text>
          <View>
            <Button
              title="Fecha"
              onPress={() => {
                showMode("date");
              }}
            />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </View>

      <View style={{ paddingTop: 20 }}>
        <Text style={styles.textTitle}>Comentario</Text>
        <TextInput
          style={{
            height: 100,
            width: WIDTH - 30,
            backgroundColor: "white",
            borderRadius: 20,
            fontSize: 16,
            color: "rgba(0, 0, 0, 0.5)",
            textAlignVertical: "top",
            padding: 10,
            borderColor: "white",
          }}
          placeholder="Comentario..."
          underlineColorAndroid="transparent"
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          multiline={true}
          onSubmitEditing={Keyboard.dismiss}
          editable={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    flex: 1,
    backgroundColor: "#FFF",
  },
  textTitle: {
    textTransform: "uppercase",
    paddingBottom: 5,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "left",
    width: width * 0.35,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
});

export default AgendaSuCita;
