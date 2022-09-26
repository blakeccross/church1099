import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View, StyleSheet } from "react-native";
import { palette } from "../../Assets/config/colors";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";

export const MessageStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "white",
  },
  userdp: {
    width: WP(18),
    height: WP(18),
    borderRadius: WP(9),
  },
  dp: {
    width: WP(13),
    height: WP(13),
    borderRadius: WP(6.5),
  },
  msgTxt: {
    fontFamily: fontFamily.bold,
    color: "black",
    fontSize: 22,
  },
  msgList: {
    marginBottom: 50,
  },
  nameTxt: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: "black",
  },
  swipeAbleButton: {
    width: WP(20),
    height: HP(10),
    backgroundColor: "#ff0000",
    alignSelf: "center",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  swipeAbleButtonContainer: {
    marginLeft: WP(7),
  },
  userName: {
    fontFamily: fontFamily.light,
    fontSize: 18,
    color: palette.black,
    fontWeight: "600",
  },
  item: {
    width: WP(100),
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: "cover",
    marginRight: 10,
  },
  infoContainer: {
    //justifyContent: "space-between",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    height: HP(10),
    justifyContent: "center",
    flex: 1,
  },
  lastMessageTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    //alignItems: "center",
    //paddingTop: 5,
    paddingRight: 10,
  },
  lastMessage: {
    fontSize: 12,
    color: "gray",
    paddingTop: 5,
    width: WP(60),
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
  H1: {
    fontSize: 30,
    fontFamily: fontFamily.bold,
    textAlign: "center",
  },
  H2: {
    color: "grey",
    fontSize: 15,
    fontFamily: fontFamily.bold,
    textAlign: "center",
  },
  addbutton: {
    width: WP(16),
    height: WP(16),
    borderRadius: WP(8),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: HP(3),
    right: WP(5),
  },
});
