import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import { palette } from "../../Assets/config/colors";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const editSkillsStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "#F4F4F5",
  },
  createTxt: {
    color: "#333333",
    fontSize: 20,
    fontFamily: fontFamily.light,
  },
  item: {
    backgroundColor: "white",
    borderBottomColor: "#F4F4F5",
    borderBottomWidth: 1,
    paddingHorizontal: WP(4),
    paddingVertical: HP(2),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
});
