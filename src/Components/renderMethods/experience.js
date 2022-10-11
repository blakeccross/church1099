import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../../global/global.styles";
import * as Haptics from "expo-haptics";
import { API } from "../../services/api.services";
import moment from "moment";
import { MoreOrLess } from "@rntext/more-or-less";

const RenderExp = ({ item }) => {
  return (
    <View style={Styles.experienceItem}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: item["Company Image"] }} />
        <Text style={Styles.headingText}>{item?.title}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 0 }}>
        <Text style={Styles.description}>{item.employer}</Text>
        <Text style={Styles.description}> · {item?.type}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 0 }}>
        <Text style={Styles.description}>
          {moment(item.startDate, "MMM DD, YYYY").format("MMM YYYY")}
        </Text>
        {item.current ? null : (
          <Text style={Styles.description}>
            {moment(item.endDate, "MMM DD, YYYY").format(" - MMM YYYY")}
          </Text>
        )}
      </View>
      <View style={{ marginTop: HP(1) }}>
        <MoreOrLess numberOfLines={2} textButtonStyle={{ color: "black" }}>
          {item?.description}
        </MoreOrLess>
      </View>
    </View>
  );
};

// define your styles
const Styles = StyleSheet.create({
  experienceItem: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    marginVertical: 0,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  headingText: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: "black",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
  },
});

//make this component available to the app
export default RenderExp;
