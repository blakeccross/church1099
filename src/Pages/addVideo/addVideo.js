import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";
import { GlobalStyles } from "../../global/global.styles";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { addVideoStyle as Styles } from "./addVideo.style";
import Icon from "react-native-vector-icons/Ionicons";
import { API } from "../../services/api.services";
import { Input } from "../../Components/Input/Input";
import { firebaseServices } from "../../services/firebase.services";
import YoutubePlayer from "react-native-youtube-iframe";

const AddVideo = (props) => {
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [YT, setYT] = useState("");

  const post = async () => {
    let img = "https://img.youtube.com/vi/" + YT + "/maxresdefault.jpg";
    console.log(img);
    let video = link;
    let imageName = Date.now().toString();
    await firebaseServices.uploadImage(imageName, img, async (image) => {
      await API.createPost(image, description, video);
    });
    props.navigation.goBack();
  };

  useEffect(() => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = link?.match(regExp);
    setYT(match && match[2].length === 11 ? match[2] : undefined);
  }, [link]);

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
        <Text style={{ ...GlobalStyles.H3, color: "white" }}>Add Video</Text>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{ paddingLeft: WP(3), position: "absolute", left: 0 }}
        >
          <Icon name={"chevron-back"} color={"white"} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => post()}
          style={{ paddingRight: WP(3), position: "absolute", right: 0 }}
        >
          <Text style={Styles.postTxt}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.container}>
        <View style={{ paddingHorizontal: WP(4), paddingVertical: HP(2) }}>
          <Text style={{ color: "grey", marginBottom: HP(2) }}>
            Church1099 currently supports the adding of YouTube videos. Simply
            go to the video you would like to add, copy the link, and past it
            here.
          </Text>
          <Input
            //col={"white"}
            placeTxt={"YouTube Video link"}
            value={link}
            setValue={setLink}
          />
        </View>
        {link ? <YoutubePlayer height={500} videoId={YT} /> : null}
      </View>
    </>
  );
};
export default AddVideo;
