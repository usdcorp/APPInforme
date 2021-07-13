import React, { Component, useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";
("");
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  ToastAndroid,
  FlatList,
  Image,
  Animated,
  Dimensions,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "./../src/utils/Colores";
import { CredentialsContext } from "./../components/CredentialsContext";

const { width, height } = Dimensions.get("window");
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

const Inicio = ({ navigation }) => {
  const [objAnalyzer, setobjAnalyzer] = useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchData();
  }, []);

  const Config = () => {
    // navigation.navigate('Compras');
    handleToast("configuracion");
    console.log("nose");
  };

  const phone = () => {
    handleToast("Llamar");
  };

  const mail = () => {
    handleToast("Mandar email");
  };

  const world = () => {
    handleToast("mundo");
  };

  const whatsapp = () => {
    handleToast("mensaje a whatsapp");
  };

  const ItemMenu = ({ Opcion, AnalyzerId, OptionId }) => {
    const handePress = ({ AnalyzerId, OptionId }) => {
      if (OptionId == 1) {
        navigation.navigate("MantenimientoEquipo", {AnalyzerId: AnalyzerId, OptionId: OptionId});
      } else if (OptionId == 2) {
        navigation.navigate("ActualizacionSW", {AnalyzerId: AnalyzerId, OptionId: OptionId});
      } else if (OptionId == 3) {
        navigation.navigate("AgendaCita", {AnalyzerId: AnalyzerId, OptionId: OptionId});
      } else if (OptionId == 4) {
        navigation.navigate("Compras", {AnalyzerId: AnalyzerId, OptionId: OptionId});
      }
    };

    return (
      <View>
        <TouchableOpacity onPress={() => handePress({ AnalyzerId, OptionId })}>
          <Text style={styles.description}>{Opcion} </Text>
          <AntDesign
            name="right"
            size={20}
            color="orange"
            style={{ position: "absolute", top: 4, right: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const Item = ({ Foto, BPOptionRP, index, scrollX }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const inputRangeOpacity = [
      (index - 0.3) * width,
      index * width,
      (index + 0.3) * width,
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    });
    const translateXHeading = scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.1, 0, -width * 0.1],
    });

    const translateXDescription = scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.7, 0, -width * 0.7],
    });
    const opacity = scrollX.interpolate({
      inputRange: inputRangeOpacity,
      outputRange: [0, 1, 0],
    });

    return (
      <View style={styles.itemStyle}>
        <Animated.Image
          source={{ uri: `data:image/png;base64,${Foto}` }}
          style={[
            styles.imageStyle,
            {
              transform: [{ scale }],
            },
          ]}
        />
        <View style={{ alignItems: "center", alignSelf: "center" }}>
          <Animated.Text
            style={[
              // styles.description,
              {
                opacity,
                transform: [
                  {
                    translateX: translateXDescription,
                  },
                ],
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: -70,
                marginBottom: 15,
              },
            ]}
          >
            <FontAwesome
              style={{ marginRight: 30 }}
              name="phone"
              size={30}
              color="green"
              onPress={phone}
            />
            <Text>ESPA</Text>
            <MaterialCommunityIcons
              name="email-check-outline"
              size={30}
              color="orange"
              onPress={mail}
            />
            <Text>ESPA</Text>
            <Fontisto
              name="world-o"
              size={30}
              color="#38b0de"
              onPress={world}
            />
            <Text>ESPA</Text>
            <FontAwesome
              name="whatsapp"
              size={30}
              color="green"
              onPress={whatsapp}
            />
          </Animated.Text>
        </View>
        <View style={styles.textContainer}>
          <Animated.FlatList
            style={[
              styles.description,
              {
                opacity,
                transform: [
                  {
                    translateX: translateXDescription,
                  },
                ],
              },
            ]}
            data={BPOptionRP}
            renderItem={({ item }) => {
              return (
                <ItemMenu
                  Opcion={item.Opcion}
                  AnalyzerId={item.AnalyzerId}
                  OptionId={item.OptionId}
                />
                // <View>
                //   <TouchableOpacity>
                //     <Text style={styles.description}>{item.Opcion}</Text>
                //     <AntDesign
                //       name="right"
                //       size={20}
                //       color="orange"
                //       style={{ position: "absolute", top: 4, right: 30 }}
                //     />
                //   </TouchableOpacity>
                // </View>
              );
            }}
            keyExtractor={(item) => item.OptionId.toString()}
            ListEmptyComponent={() => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text>Not found</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  };

  const Pagination = ({ scrollX }) => {
    const inputRange = [-width, 0, width];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-DOT_SIZE, 0, DOT_SIZE],
    });

    return (
      <View style={styles.pagination}>
        <Animated.View
          style={[
            styles.paginationIndicator,
            {
              position: "absolute",
              transform: [{ translateX }],
            },
          ]}
        />
        {objAnalyzer.map((item) => {
          return (
            <View key={item.AnalyzerId} style={styles.paginationDotContainer}>
              <View
                style={[styles.paginationDot, { backgroundColor: item.color }]}
              />
            </View>
          );
        })}
      </View>
    );
  };

  const fetchData = async () => {
    fetch("http://119.8.144.182:1035/api/businesspartneranalyzer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        BusinessPartnerId: 1,
      }),
    })
      .then((resp) => resp.json())
      .then((respData) => {
        if (respData !== null) {
          setobjAnalyzer(respData);
        } else {
          console.log("Array vacio");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const handleToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <TouchableOpacity
        style={[
          styles.buttonSetting,
          {
            marginTop: 40,
            marginLeft: 20,
            display: "none",
          },
        ]}
        onPress={Config}
      >
        <AntDesign name="setting" size={30} color="white" />
      </TouchableOpacity>

      <Animated.FlatList
        keyExtractor={(item) => item.AnalyzerId.toString()}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>Not found</Text>
          </View>
        )}
        data={objAnalyzer}
        renderItem={({ item, index }) => (
          <Item {...item} index={index} scrollX={scrollX} />
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Image
        style={styles.imgStard}
        source={require("./../src/images/footerstart.png")}
      />
      <Image
        style={styles.imgEnd}
        source={require("./../src/images/footerend.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  pagination: {
    position: "absolute",
    right: 20,
    bottom: 40,
    flexDirection: "row",
    height: DOT_SIZE,
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  itemStyle: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: width * 0.5,
    height: width * 0.4,
    resizeMode: "contain",
    flex: 1,
  },
  textContainer: {
    alignItems: "flex-start",
    alignSelf: "flex-end",
    flex: 0.5,
    marginBottom: 70,
  },
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
  optionsMiddle: {
    flexDirection: "row",
    // flex:1,
    marginTop: -120,
    marginBottom: 20,
    justifyContent: "space-around",
  },
  imgStard: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: "contain",
    position: "absolute",
    right: width - 180,
    bottom: 10,
  },

  imgEnd: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: "contain",
    position: "absolute",
    left: width - 200,
    bottom: 10,
  },
  buttonSetting: {
    width: 30,
    marginTop: 20,
    borderRadius: 50,
  },
});

export default Inicio;
