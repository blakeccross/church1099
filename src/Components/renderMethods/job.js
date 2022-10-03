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

const RenderJob = ({ item, hideBook, refresh }) => {
  const bookmark = async (item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    let job = item.id;
    await API.saveJob(job);
    refresh();
    //getJobList();
  };
  const removeJob = async (item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    let job = item.id;
    await API.removeJob(job);
    refresh();
    //getJobList();
  };
  return (
    <View style={Styles.item}>
      <View style={GlobalStyles.row}>
        {item?.image?.length > 2 && (
          <Image
            source={{ uri: "https:" + item?.image }}
            style={{ ...Styles.dp }}
          />
        )}
        <View style={{ marginRight: WP(4), flex: 1 }}>
          <Text style={{ ...Styles.keyTxt }}>{item.title}</Text>
          <Text
            style={{
              ...Styles.conTxt,
              color: "#666666",
              fontSize: 16,
              paddingHorizontal: 0,
              fontSize: 14,
              marginTop: 2,
            }}
          >
            {item?.church}
          </Text>
        </View>
        {hideBook ? null : (
          <View style={{ position: "absolute", right: 0 }}>
            {item.saved == "true" ? (
              <TouchableOpacity onPress={() => removeJob(item)}>
                <MaterialIcons name="bookmark" size={28} color="blue" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => bookmark(item)}>
                <MaterialIcons name="bookmark-outline" size={28} color="grey" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      <View style={{ marginRight: WP(4) }}>
        <Text
          numberOfLines={3}
          style={{
            ...Styles.conTxt,
            paddingHorizontal: 0,
            fontSize: 14,
            color: "#666666",
            marginTop: 6,
          }}
        >
          {item.description}
        </Text>
        <View style={{ ...GlobalStyles.row, marginVertical: HP(1) }}>
          <View
            style={{
              ...GlobalStyles.row,
              alignSelf: "flex-start",
              paddingHorizontal: WP(3),
              paddingVertical: HP(1),
              borderRadius: 10,
              justifyContent: "center",
              backgroundColor: "#F5F5F5",
            }}
          >
            <MaterialIcons name="location-on" size={15} color={"#666666"} />
            <Text
              style={{
                ...Styles.conTxt,
                paddingHorizontal: 3,
                fontSize: 14,
                color: "rgb(102, 102, 102)",
              }}
            >
              {item?.location}
            </Text>
          </View>
          {item.remote == "yes" && (
            <View
              style={{
                ...GlobalStyles.row,
                alignSelf: "flex-start",
                paddingHorizontal: WP(3),
                paddingVertical: HP(1),
                borderRadius: 10,
                justifyContent: "center",
                backgroundColor: "#F5F5F5",
                marginLeft: 7,
              }}
            >
              <MaterialIcons name="wifi" size={15} color="#666666" />
              <Text
                style={{
                  ...Styles.conTxt,
                  paddingHorizontal: 3,
                  fontSize: 14,
                  color: "rgb(102, 102, 102)",
                }}
              >
                Remote Friendly
              </Text>
            </View>
          )}
        </View>
        {item["Applicants"]?.length && (
          <Text
            style={{
              ...Styles.applicants,
              paddingHorizontal: 3,
              marginBottom: HP(1),
              fontSize: 14,
            }}
          >
            {item["Applicants"]?.length} applicants
          </Text>
        )}
      </View>
    </View>
  );
};

// define your styles
const Styles = StyleSheet.create({
  container: {},
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
    paddingVertical: HP(2),
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    backgroundColor: "white",
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

//make this component available to the app
export default RenderJob;
