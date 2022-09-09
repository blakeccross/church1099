//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import moment from "moment";

const RenderMessages = ({ item, myid }) => {
  //console.log(myid);
  return (
    <View
      style={{
        ...styles.container,
        alignSelf: item["Created By"] == myid ? "flex-end" : "flex-start",
      }}
    >
      {item["Created By"] == myid ? (
        <>
          <View
            style={{
              borderRadius: 17,
              backgroundColor: "#2b47fc",
              marginVertical: 2,
              marginRight: 10,
              maxWidth: WP(80),
            }}
          >
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 15,
                paddingVertical: 10,
                textAlign: "left",
                color: "white",
              }}
            >
              {item.content}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 13,
              paddingHorizontal: 15,
              paddingBottom: 10,
              textAlign: "right",
              color: "grey",
            }}
          >
            {moment(item["Created Date"]).format("MMM Do, h:mm a")}
          </Text>
        </>
      ) : (
        <>
          <View
            style={{
              borderRadius: 17,
              backgroundColor: "rgba(247,247,247,1)",
              marginVertical: 2,
              marginLeft: 10,
              maxWidth: WP(80),
            }}
          >
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 15,
                paddingVertical: 10,
                textAlign: "left",
                color: "black",
              }}
            >
              {item.content}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 13,
              paddingHorizontal: 15,
              paddingBottom: 10,
              textAlign: "left",
              color: "grey",
            }}
          >
            {moment(item["Created Date"]).format("MMM Do, h:mm a")}
          </Text>
        </>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
  text: {
    color: "black",
    textAlign: "left",
    textAlignVertical: "center",
    paddingHorizontal: 15,
    backgroundColor: "#EDEFF3",
    minHeight: HP(7),
    borderRadius: 15,
    maxWidth: WP(70),
    fontSize: 14,
    lineHeight: 18,
    paddingVertical: 10,
    marginVertical: HP(0.5),
    marginHorizontal: WP(2),
    fontWeight: "400",
  },
});

//make this component available to the app
export default RenderMessages;
