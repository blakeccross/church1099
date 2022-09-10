import React, { Component, useState, useEffect } from "react";
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
import fontFamily from "../../Assets/config/fontFamily";
import { GlobalStyles } from "../../global/global.styles";
import Icon from "react-native-vector-icons/Ionicons";
import YoutubePlayer from "react-native-youtube-iframe";
import Post from "../renderMethods/post";

const PostModal = ({ show, setShow, selectedPost, user, props }) => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState("");
  const [video, setVideo] = useState("");

  const getYouTubeVideoIdFromUrl = (selectedPost) => {
    const URL = selectedPost.videoURL;
    // Our regex pattern to look for a youTube ID
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    //Match the url with the regex
    const match = URL.match(regExp);
    //console.log(match[2]);
    setVideo(match && match[2].length === 11 ? match[2] : undefined);
    //Return the result
    //return match && match[2].length === 11 ? match[2] : undefined;
  };

  useEffect(() => {
    getYouTubeVideoIdFromUrl(selectedPost);
  }, [selectedPost]);

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
        <Post selectedPost={selectedPost} props={props} setShow={setShow} />
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