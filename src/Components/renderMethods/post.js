import React, { useState, useEffect } from "react";
import {
  ActionSheetIOS,
  Alert,
  ActivityIndicator,
  Image,
  RefreshControl,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Share,
  StyleSheet,
} from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";
import YoutubePlayer from "react-native-youtube-iframe";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API } from "../../services/api.services";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Post = ({ show, setShow, selectedPost, loading, props }) => {
  //const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState("");
  const [video, setVideo] = useState("");

  const getYouTubeVideoIdFromUrl = (selectedPost) => {
    const URL = selectedPost.videoURL;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = URL?.match(regExp);
    setVideo(match && match[2].length === 11 ? match[2] : undefined);
  };

  useEffect(() => {
    getYouTubeVideoIdFromUrl(selectedPost);
  }, [selectedPost]);

  const deletePost = async (selectedPost) => {
    let postId = selectedPost.id;
    await API.deletePost(postId);
  };

  const showActionSheet = (selectedPost) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Share", "Delete"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          Share.share({
            message: "Church1099",
            url: "church1099.com",
          });
        } else if (buttonIndex === 2) {
          Alert.alert(
            "Delete Post",
            "Are you sure you want to remove this post?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Delete",
                onPress: () => deletePost(selectedPost),
              },
            ]
          );
        } else if (buttonIndex === 3) {
          props.navigation.navigate("EditJob", item);
        }
      }
    );
  };

  return (
    <>
      {loading ? (
        <View>
          <View style={GlobalStyles.row}>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              shimmerColors={["#fbfbfb", "#f2f2f2", "#fbfbfb"]}
              style={{
                height: 30,
                width: 30,
                borderRadius: 20,
                marginVertical: HP(1),
              }}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              shimmerColors={["#fbfbfb", "#f2f2f2", "#fbfbfb"]}
              style={{ height: 20, marginLeft: WP(2), marginVertical: HP(1) }}
            />
          </View>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            shimmerColors={["#fbfbfb", "#f2f2f2", "#fbfbfb"]}
            style={{ width: WP(100), height: WP(100) }}
          />
        </View>
      ) : (
        <View style={Styles.portItem}>
          <View
            style={{
              ...GlobalStyles.row,
              justifyContent: "space-between",
              paddingHorizontal: WP(2),
            }}
          >
            <TouchableOpacity
              style={{
                ...GlobalStyles.row,
                paddingVertical: HP(1),
              }}
              onPress={() => {
                setShow(false);
                props.navigation.navigate("ProfileView", {
                  user: selectedPost,
                });
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
              />
              <Text style={Styles.nameTxt}>{selectedPost.User}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showActionSheet(selectedPost);
              }}
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
          {selectedPost.videoURL.length < 2 ? (
            <Image
              source={{ uri: "https:" + selectedPost.Photo }}
              style={{
                resizeMode: "cover",
                width: WP(100),
                height: WP(100),
                backgroundColor: "#F4F4F5",
              }}
            />
          ) : (
            <YoutubePlayer height={500} videoId={video} />
          )}
          <Text style={Styles.description}>{selectedPost.description}</Text>
        </View>
      )}
    </>
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

//make this component available to the app
export default Post;