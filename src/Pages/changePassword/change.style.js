import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const ChangeStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  setTxt: {
    color: "#333333",
    fontSize: 18,
    fontFamily: fontFamily.regular,
    marginBottom: 5,
  },
});
