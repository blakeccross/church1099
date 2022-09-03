import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import { palette } from "../../Assets/config/colors";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const skillsCategoryStyles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "#F4F4F5",
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
  subText: {
    color: "grey",
    fontSize: 15,
    fontFamily: fontFamily.regular,
    marginTop: HP(2),
    marginBottom: HP(1),
    marginLeft: WP(4),
  },
});
