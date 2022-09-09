import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const SettingsStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    //backgroundColor: 'rgb(244,244,245)',
  },
  setTxt: {
    color: "black",
    fontSize: 15,
    fontFamily: fontFamily.regular,
    marginLeft: WP(3),
  },
  section: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: "column",
  },
  secHeader: {
    color: "grey",
    fontSize: 15,
    fontFamily: fontFamily.regular,
    marginTop: HP(2),
    marginBottom: HP(1),
  },
  settingItem: {
    paddingVertical: 15,
    borderBottomColor: "#f4f4f5",
    borderBottomWidth: 1,
  },
  dp: {
    width: WP(15),
    height: WP(15),
    borderRadius: WP(15),
  },
});
