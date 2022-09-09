import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import { palette } from "../../Assets/config/colors";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const addPhotoStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "white",
  },
  txt: {
    marginTop: HP(2),
    fontFamily: fontFamily.bold,
    marginBottom: 5,
    fontSize: 15,
    color: "#000000",
  },
  item: {
    backgroundColor: "white",
    borderBottomColor: "#F4F4F5",
    borderBottomWidth: 1,
    paddingLeft: WP(4),
    paddingVertical: HP(2),
  },
  input: {
    borderWidth: 0,
    borderRadius: 10,
    width: WP(100),
  },
  skillItem: {
    backgroundColor: "#F4F4F5",
    borderRadius: 20,
    padding: 9,
    marginRight: 5,
    marginBottom: 8,
    justifyContent: "center",
  },
  subText: {
    color: "grey",
    fontSize: 15,
    fontFamily: fontFamily.regular,
    marginTop: HP(2),
    marginBottom: HP(1),
    marginLeft: WP(4),
  },
  postTxt: {
    fontFamily: fontFamily.bold,
    marginBottom: 5,
    fontSize: 15,
    color: "white",
  },
});
