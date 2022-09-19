import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const ProfileViewStyle = StyleSheet.create({
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
  locTxt: {
    color: "#666666",
    fontSize: 14,
    fontFamily: fontFamily.light,
  },
  circleIcon: {
    backgroundColor: "white",
    borderRadius: WP(7),
    ...GlobalStyles.row,
    paddingHorizontal: WP(3),
    paddingVertical: WP(3),
  },
  panelView: {
    backgroundColor: "white",
    paddingHorizontal: WP(4),
    paddingVertical: HP(2),
    marginTop: HP(1),
  },
  skillTxt: {
    color: "#333333",
    fontFamily: fontFamily.bold,
    fontSize: 20,
  },
  inp: {
    height: 40,
    marginTop: -HP(1),
    color: "#666666",
    fontFamily: fontFamily.light,
    fontSize: 18,
  },
  skillItem: {
    backgroundColor: "#F4F4F5",
    borderRadius: 20,
    padding: 9,
    marginRight: 3,
    marginBottom: 5,
    justifyContent: "center",
  },
  portItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    //padding: 5,
    marginRight: 10,
    //marginBottom: 5,
    justifyContent: "center",
  },
  item: {
    width: WP(100),
    alignSelf: "center",
    backgroundColor: "white",
    marginVertical: 0,
    borderRadius: 0,
    paddingHorizontal: WP(4),
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  headingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
  },
});
