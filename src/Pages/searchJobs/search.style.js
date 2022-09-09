import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import { palette } from "../../Assets/config/colors";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const SearchStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "white",
  },
  createTxt: {
    fontFamily: fontFamily.bold,
    fontSize: 25,
    color: "#000000",
  },
  nothingTxt: {
    fontFamily: fontFamily.light,
    fontSize: 14,
    color: "#666666",
  },
  input: {
    borderWidth: 0,
    width: "100%",
    backgroundColor: "rgba(247,247,247,1)",
    color: "rgb(0,0,0)",
    padding: 10,
  },
  jobTxt: {
    color: "#333333",
    fontSize: 30,
    fontFamily: fontFamily.bold,
  },
  conTxt: {
    color: "#333333",
    fontSize: 25,
    fontFamily: fontFamily.light,
    paddingHorizontal: WP(20),
  },
  keyTxt: {
    color: "#333333",
    fontSize: 20,
    fontFamily: fontFamily.bold,
  },
  searchSection: {
    flexDirection: "row",
    width: WP(80),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginRight: WP(3),
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
