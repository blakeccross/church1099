import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import { palette } from "../../Assets/config/colors";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const MyJobsStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  createTxt: {
    color: "#333333",
    fontSize: 20,
    fontFamily: fontFamily.light,
  },
  titleTxt: {
    color: "#333333",
    fontSize: 18,
    fontFamily: fontFamily.bold,
  },
  optionTag: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    margin: 5,
    marginRight: 3,
    marginBottom: 5,
    justifyContent: "center",
    borderColor: "#F4F4F5",
    borderWidth: 1,
  },
  input: {
    borderWidth: 0,
    width: "100%",
    backgroundColor: "rgba(247,247,247,1)",
    color: "rgb(0,0,0)",
    padding: 10,
  },
  H1: {
    fontSize: 30,
    fontFamily: fontFamily.bold,
    textAlign: "center",
  },
  H2: {
    color: "grey",
    fontSize: 15,
    fontFamily: fontFamily.bold,
    textAlign: "center",
  },
});
