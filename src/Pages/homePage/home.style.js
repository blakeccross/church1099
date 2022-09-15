import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import { palette } from "../../Assets/config/colors";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const HomeStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "white",
  },
  welcomechurchTxt: {
    fontFamily: fontFamily.bold,
    fontSize: 40,
    color: "white",
    marginBottom: HP(2),
    marginHorizontal: WP(5),
    //flex: 0,
    //flexWrap: 'wrap',
    lineHeight: 45,
    //textAlign: 'center'
  },
  subtitle: {
    fontFamily: fontFamily.light,
    fontSize: 17,
    color: "black",
    textAlign: "left",
    width: WP(100),
    marginTop: HP(1),
    paddingLeft: WP(8),
    paddingBottom: HP(1),
  },
  mainContainer: {
    flex: 1,
    //backgroundColor: 'white',
    alignItems: "center",
  },
  image: {
    height: HP(100),
    //width: WP(100),
    resizeMode: "contain",
  },
  logo: {
    height: HP(5),
    width: WP(70),
    resizeMode: "contain",
  },
  absluteContainer: {
    height: HP(45),
    width: WP(100),
    position: "absolute",
    alignSelf: "center",
    marginTop: HP(8),
    //bottom: 0,
    alignItems: "left",
    flexShrink: 1,
  },
  btnStyle: {
    width: WP(90),
    height: HP(8),
    //marginTop: HP(1),
    alignSelf: "center",
  },
  loginBtn: {
    alignSelf: "center",
    width: WP(100),
  },
  loginText: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: "white",
    textAlign: "center",
    width: WP(100),
    marginTop: HP(2),
  },
  video: {
    alignSelf: "center",
    width: WP(100),
    height: HP(100),
    backgroundColor: "black",
    //height: HP(100),
    //width: WP(100),
    //resizeMode: 'contain',
  },
});
