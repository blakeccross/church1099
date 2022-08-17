import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const EditStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "white",
  },
  emailTxt: {
    color: "#333333",
    fontSize: 18,
    fontFamily: fontFamily.regular,
    marginBottom: 5,
  },
  changePhotoTxt: {
    color: "#2b47fc",
    fontSize: 12,
    fontFamily: fontFamily.bold,
    marginBottom: 5,
  },
  dp: {
    width: WP(25),
    height: WP(25),
    borderRadius: WP(20),
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  centeredView: {
    paddingTop: 10,
    backgroundColor: "white",
    height: HP(30),
    width: WP(100),
    position: "absolute",
    bottom: 0,
    paddingVertical: HP(1),
    paddingHorizontal: WP(5),
    alignSelf: "center",
    borderRadius: 25,
  },
  input: {
    justifyContent: "center",
    borderWidth: 0,
    height: 45,
    width: "100%",
    backgroundColor: "rgba(247,247,247,1)",
    color: "rgb(0,0,0)",
    padding: 10,
    borderRadius: 10,
    paddingTop: 7,
  },
  rectangle: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "grey",
    width: 40,
    height: 3,
    borderRadius: 5,
  },
});
