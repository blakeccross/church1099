import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import { palette } from "../../Assets/config/colors";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "rgb(244, 244, 245)",
  },
  heading: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: "#000000",
    paddingLeft: WP(2),
    paddingTop: HP(0.5),
  },
  applicantText: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: "#666666",
    paddingLeft: WP(2),
    paddingTop: HP(0.5),
  },
  name: {
    paddingTop: HP(1),
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    width: WP(45),
  },
  applicantViewContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: HP(0.5),
  },
  item: {
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: WP(2),
    width: WP(45),
    height: HP(30),
    backgroundColor: "white",
    //shadowRadius: 3.84,
    //elevation: 5,
    marginBottom: HP(2),
    justifyContent: "space-between",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: "cover",
    marginTop: HP(1),
    alignSelf: "center",
  },
  viewProfile: {
    width: WP(40),
    height: HP(6),
    borderRadius: 5,
    borderColor: "dodgerblue",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: HP(1),
  },
  viewProfileText: {
    fontFamily: fontFamily.medium,
    textAlign: "center",
    width: WP(45),
    fontSize: 20,
    color: "dodgerblue",
  },
  conditionText: {
    fontFamily: fontFamily.bold,
    fontSize: 23,
    color: "#000000",
    textAlign: "center",
  },
});

export default styles;
