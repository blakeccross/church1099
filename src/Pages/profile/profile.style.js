import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const ProfileStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  empty: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: HP(4),
    paddingHorizontal: WP(15),
  },
  emptyTxt: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: fontFamily.regular,
    color: "grey",
  },
  userInfoTxt: {
    color: "#666666",
    fontSize: 15,
    fontFamily: fontFamily.regular,
  },
  dp: {
    width: WP(30),
    height: WP(30),
    alignSelf: "center",
    marginTop: HP(4),
    borderRadius: WP(15),
    backgroundColor: "#F4F4F5",
  },
  panelView: {
    backgroundColor: "white",
    paddingHorizontal: WP(4),
    paddingVertical: HP(2),
    marginTop: HP(1),
    marginHorizontal: 8,
    borderRadius: 15,
  },
  sectionHeader: {
    color: "black",
    fontFamily: fontFamily.bold,
    fontSize: 22,
  },
  skillItem: {
    backgroundColor: "#F4F4F5",
    borderRadius: 20,
    padding: 9,
    marginRight: 3,
    marginBottom: 5,
    justifyContent: "center",
  },
});
