//import liraries
import moment from "moment";
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";

// create a component
const RenderExperience = ({ item }) => {
  function getYearDiff(dateOne, dateTwo) {
    return dateOne.diff(dateTwo, "years", true);
  }
  let date = moment(item["End Date"]).diff(item["Start Date"]);
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: item["Company Image"] }} />
        <Text style={styles.headingText}>{item?.Title}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 0 }}>
        <Text style={styles.description}>{item.Company}</Text>
        <Text style={styles.description}> · {item["Employment Type"]}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 0 }}>
        <Text style={styles.description}>
          {moment(item["Start Date"]).format("MMM YYYY")}
        </Text>
        <Text style={styles.description}>
          {moment(item["End Date"]).format(" - MMM YYYY")}
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  item: {
    // height: HP(15),
    width: WP(100),
    alignSelf: "center",
    backgroundColor: "white",
    marginVertical: 0,
    borderRadius: 0,
    paddingHorizontal: WP(4),
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  headingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
  },
});

//make this component available to the app
export default RenderExperience;
