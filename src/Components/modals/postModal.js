import React, { Component, useState } from "react";
import {
  Modal,
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { API } from "../../services/api.services";
import { HP, WP } from "../../Assets/config/screen-ratio";
import * as Haptics from "expo-haptics";
import { Button } from "../Button/Button";
import fontFamily from "../../Assets/config/fontFamily";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../global/global.styles";
import Icon from "react-native-vector-icons/Ionicons";

const PostModal = ({ show, setShow, selectedPost, user, props }) => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState("");
  //console.log(props);

  return (
    <Modal
      animationType={"slide"}
      visible={show}
      presentationStyle={"fullscreen"}
      selectedPost={selectedPost}
      onRequestClose={() => setShow(false)}
      onBackButtonPress={() => setShow(false)}
      onBackdropPress={() => setShow(false)}
    >
      <SafeAreaView>
        <View
          style={{
            ...GlobalStyles.row,
            justifyContent: "center",
            paddingTop: HP(1),
            paddingBottom: HP(2),
          }}
        >
          <Text style={{ ...GlobalStyles.H3 }}>Discover</Text>
          <TouchableOpacity
            onPress={() => setShow(false)}
            style={{ paddingHorizontal: WP(3), position: "absolute", left: 0 }}
          >
            <Icon name={"chevron-back"} color={"black"} size={24} />
          </TouchableOpacity>
        </View>
        <View style={Styles.portItem}>
          <TouchableOpacity
            style={{
              ...GlobalStyles.row,
              paddingLeft: WP(2),
              paddingVertical: HP(1),
            }}
            onPress={() => {
              setShow(false);
              props.navigation.navigate("ProfileView", { user: selectedPost });
            }}
          >
            <Image
              style={{
                width: 30,
                height: undefined,
                aspectRatio: 1 / 1,
                borderRadius: 20,
              }}
              source={{ uri: "https:" + selectedPost.profilePhoto }}
            ></Image>
            <Text style={Styles.nameTxt}>{selectedPost.User}</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: "https:" + selectedPost.Photo }}
            style={{
              //flex: 1,
              resizeMode: "center",
              width: WP(100),
              height: HP(50),
              backgroundColor: "#F4F4F5",
            }}
          />
          <Text style={Styles.description}>{selectedPost.description}</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

// define your styles
const Styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: "white",
  },
  dp: {
    width: WP(10),
    height: WP(10),
    borderRadius: WP(8),
  },
  nameTxt: {
    fontFamily: fontFamily.regular,
    fontSize: 18,
    color: "black",
    marginLeft: WP(2),
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: 17,
    color: "black",
    marginLeft: WP(5),
    paddingVertical: HP(1),
  },
  lastTxt: {
    fontFamily: fontFamily.light,
    fontSize: 12,
    color: "#707070",
  },
  item: {
    marginTop: HP(2),
    alignItems: "center",
    backgroundColor: "white",
    alignSelf: "center",
  },
  portItem: {
    //flex: 1,
  },
});

export default PostModal;
