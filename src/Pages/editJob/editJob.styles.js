import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import { palette } from "../../Assets/config/colors";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

const Styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "white",
  },
  createTxt: {
    marginTop: HP(2),
    fontFamily: fontFamily.bold,
    marginBottom: 5,
    fontSize: 15,
    color: "#000000",
  },
  input: {
    borderWidth: 0,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "rgba(247,247,247,1)",
    color: "rgb(0,0,0)",
    padding: 10,
    height: 45,
    justifyContent: "center",
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
export default Styles;
