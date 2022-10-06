import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import { palette } from "../../Assets/config/colors";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const skillsStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "white",
  },
  createTxt: {
    color: "#333333",
    fontSize: 20,
    fontFamily: fontFamily.light,
  },
  item: {
    backgroundColor: "white",
    borderBottomColor: "#F4F4F5",
    borderBottomWidth: 1,
    paddingLeft: WP(4),
    paddingVertical: HP(2),
  },
  portItem: {
    flex: 1,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: WP(4),
    marginBottom: HP(2),
    marginTop: 10,
    backgroundColor: "#F4F4F5",
    borderRadius: 10,
  },
  grid: {
    backgroundColor: "#F4F4F5",
    paddingBottom: HP(10),
  },
  input: {
    flex: 1,
    padding: 0,
    fontSize: 16,
    borderRadius: 10,
    height: 45,
    backgroundColor: "#F4F4F5",
  },
});
