import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const SignupStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "white",
  },
  emailTxt: {
    color: "#BDBDBD",
    fontSize: 20,
    fontFamily: fontFamily.light,
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  createTxt: {
    fontSize: 14,
    color: "rgb(177,177,177)",
    fontFamily: fontFamily.light,
    textAlign: "center",
  },
  infoTxt: {
    fontSize: 14,
    color: "#D3D3D3",
    textAlign: "center",
    fontFamily: fontFamily.regular,
    marginTop: 10,
  },
  input: {
    borderWidth: 0,
    height: 100,
    width: "100%",
    backgroundColor: "rgba(247,247,247,1)",
    color: "rgb(0,0,0)",
    padding: 10,
  },
  phoneInput: {
    borderRadius: 10,
    borderWidth: 0,
    height: 45,
    width: "100%",
    backgroundColor: "rgba(247,247,247,1)",
    color: "rgb(0,0,0)",
    padding: 10,
  },
  stepContainer: {
    paddingHorizontal: WP(5),
  },
  titleTxt: {
    fontSize: 25,
    color: "#2b47fc",
    textAlign: "center",
    fontFamily: fontFamily.bold,
    marginBottom: 20,
  },
  subTxt: {
    color: "#333333",
    fontSize: 17,
    textAlign: "center",
    fontFamily: fontFamily.bold,
  },
  tag: {
    fontSize: 18,
    color: "grey",
    backgroundColor: "rgba(247,247,247,1)",
    //borderRadius: 50,
    padding: 7,
    margin: 3,
  },
  tagSelected: {
    fontSize: 18,
    color: "white",
    backgroundColor: "#2b47fc",
    borderRadius: 5,
    padding: 7,
    margin: 3,
  },
  labelSelected: {
    color: "#FFF",
  },
  skillItem: {
    borderRadius: 20,
    padding: 9,
    marginRight: 4,
    marginBottom: 7,
    justifyContent: "center",
  },
  box: {
    backgroundColor: "#f4f4f5",
    borderRadius: 25,
    width: WP(43),
    height: WP(43),
    justifyContent: "center",
  },
});
