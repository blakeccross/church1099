import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import { palette } from "../../Assets/config/colors";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const NotiStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "white",
  },
  dp: {
    width: WP(10),
    height: WP(10),
    borderRadius: WP(8),
  },
  nameTxt: {
    fontFamily: fontFamily.regular,
    fontSize: 18,
    color: "black",
    marginLeft: WP(2),
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: 17,
    color: "black",
    marginLeft: WP(5),
    paddingVertical: HP(1),
  },
  lastTxt: {
    fontFamily: fontFamily.light,
    fontSize: 12,
    color: "#707070",
    // color:palette.lightGrey
  },
  item: {
    marginTop: HP(2),
    //flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    alignSelf: "center",
    //marginHorizontal: 10,
  },
  portItem: {
    flex: 1,
    //marginBottom: 30,
    justifyContent: "center",
  },
});
