import React, { Component, useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { credentialsContext } from "../components/Context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Perfil = () => {
  const { storedCredentials, setstoredCredentials } =
    useContext(credentialsContext);
  const { BusinessPartnerId, BusinessPartner } = storedCredentials;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}></View>

        <View
          style={{
            alignSelf: "center",
            backgroundColor: "#fff",
            borderRadius: 100,
            marginTop: 90,
          }}
        >
          <View style={styles.profileImage}>
            <Image
              source={require("./../src/images/alphateclogoBLACK.png")}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>

          <View style={styles.active}></View>
        </View>
        <View
          style={{
            alignSelf: "center",
            backgroundColor: "#000",
            borderRadius: 100,
            marginTop: 90,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            {BusinessPartner}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },

  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
});

export default Perfil;
