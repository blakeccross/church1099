import React from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";
import Icon from "react-native-vector-icons/Ionicons";

export const Header = ({ onPress, title }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <View
        style={{
          ...GlobalStyles.row,
          justifyContent: "center",
          paddingTop: HP(1),
          paddingBottom: HP(2),
          backgroundColor: "#2b47fc",
        }}
      >
        <Text style={{ ...GlobalStyles.H3, color: "white" }}>{title}</Text>
        <TouchableOpacity
          onPress={onPress}
          style={{ paddingLeft: WP(3), position: "absolute", left: 0 }}
        >
          <Icon name={"chevron-back"} color={"white"} size={24} />
        </TouchableOpacity>
      </View>
    </>
  );
};
