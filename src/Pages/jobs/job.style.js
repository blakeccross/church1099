import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const JobStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  HeaderTxt: {
    color: "black",
    fontSize: 30,
    fontFamily: fontFamily.bold,
    marginLeft: WP(3),
    marginTop: HP(2),
    marginBottom: HP(1),
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: WP(4),
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  conTxt: {
    color: "#333333",
    fontSize: 20,
    fontFamily: fontFamily.light,
  },
  applicants: {
    color: "#2b47fc",
    fontSize: 20,
    fontFamily: fontFamily.bold,
  },
  keyTxt: {
    color: "#333333",
    fontSize: 18,
    fontFamily: fontFamily.bold,
    width: 0,
    flexGrow: 1,
    flexWrap: "wrap",
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    maxHeight: HP(92),
    justifyContent: "center",
    alignItems: "center",
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
  dp: {
    width: WP(10),
    height: WP(10),
    borderRadius: WP(8),
    marginRight: WP(4),
  },
  item: {
    flexDirection: "column",
    alignSelf: "center",
    paddingHorizontal: WP(5),
    width: WP(100),
  },
  myJobsTxt: {
    color: "white",
    fontSize: 16,
    fontFamily: fontFamily.bold,
    marginLeft: 3,
  },
  descriptionTex: {
    marginTop: HP(3),
    color: "#333333",
    fontSize: 17,
    fontFamily: fontFamily.light,
    textAlign: "left",
  },
  blurContainer: {
    flex: 1,
  },
});
