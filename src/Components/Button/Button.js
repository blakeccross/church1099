import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import * as Haptics from "expo-haptics";

export const Button = ({
  btnStyle,
  btnTxt,
  onPress,
  disable,
  btnCol,
  textCol,
  loadCol,
}) => {
  const Styles = StyleSheet.create({
    btn: {
      padding: 15,
      backgroundColor: btnCol ? btnCol : "#2b47fc",
      alignItems: "center",
      width: "100%",
      justifyContent: "center",
      borderRadius: 25,
    },
  });
  return (
    <View>
      <TouchableOpacity
        disabled={disable}
        onPress={onPress}
        style={{ ...Styles.btn, ...btnStyle }}
      >
        {disable ? (
          <ActivityIndicator color={loadCol ? loadCol : "white"} size="small" />
        ) : (
          <Text
            style={{
              color: textCol ? textCol : "rgb(255,255,255)",
              fontFamily: fontFamily.bold,
              fontSize: 15,
            }}
          >
            {btnTxt}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
