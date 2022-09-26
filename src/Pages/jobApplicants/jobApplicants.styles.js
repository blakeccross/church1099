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
  flatlist: {
    paddingHorizontal: WP(1),
    //flex: 1,
    //justifyContent: "space-between",
    //alignContent: "space-between",
    // alignItems: "center",
    //alignSelf: "stretch",
  },
  applicantText: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: "#666666",
    paddingLeft: WP(2),
    paddingTop: HP(0.5),
  },
  name: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: "black",
  },
  location: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: "grey",
  },
  applicantViewContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: HP(0.5),
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    //height: 120,
    padding: 10,
    backgroundColor: "white",
    marginTop: WP(2),
    marginHorizontal: WP(1),
  },
  image: {
    height: 65,
    width: 65,
    backgroundColor: "lightgrey",
    borderRadius: 50,
    resizeMode: "cover",
    alignSelf: "center",
  },
  viewProfile: {
    alignItems: "center",
    justifyContent: "center",
  },
  viewProfileText: {
    fontFamily: fontFamily.medium,
    textAlign: "center",
    fontSize: 13,
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
