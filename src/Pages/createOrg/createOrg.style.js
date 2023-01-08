import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import { palette } from "../../Assets/config/colors";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const CreateOrgStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "white",
  },
  titleTxt: {
    color: "black",
    fontSize: 25,
    fontFamily: fontFamily.bold,
    textAlign: "center",
  },
  subTxt: {
    color: "#BDBDBD",
    fontSize: 20,
    fontFamily: fontFamily.light,
    textAlign: "center",
  },
  txt: {
    fontFamily: fontFamily.bold,
    marginBottom: 5,
    fontSize: 15,
    color: "#000000",
  },
  forgotTxt: {
    color: "#000000",
    fontSize: 14,
    fontFamily: fontFamily.medium,
    textAlign: "center",
  },
});