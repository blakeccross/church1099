import React, { useState } from "react";
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
import { addPhotoStyle as Styles } from "./addPhoto.style";
import Icon from "react-native-vector-icons/Ionicons";
import { API } from "../../services/api.services";
import * as ImagePicker from "expo-image-picker";
import IconCam from "react-native-vector-icons/SimpleLineIcons";
import { firebaseServices } from "../../services/firebase.services";
import { manipulateAsync } from "expo-image-manipulator";

const AddPhoto = (props) => {
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    const manipResult = await manipulateAsync(result.uri, [
      { resize: { height: 1080, width: 1080 } },
    ]);
    if (!result.cancelled) {
      setImg(manipResult.uri);
    }
  };

  const post = async () => {
    let imageName = Date.now().toString();
    await firebaseServices.updateProfileImage(imageName, img, async (image) => {
      await API.createPost(image, description);
    });
    props.navigation.replace("Profile");
  };

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
        <Text style={{ ...GlobalStyles.H3, color: "white" }}>Add Photo</Text>
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
        {img ? (
          <View style={{ paddingHorizontal: WP(4), paddingBottom: HP(3) }}>
            <Text style={Styles.txt}>Description</Text>
            <TextInput
              onChangeText={(e) => {
                setDescription(e);
              }}
              value={description}
              multiline
              height={HP(15)}
              numberOfLines={8}
              textAlignVertical={"top"}
              autoCapitalize={"none"}
              //placeholderTextColor={"#666666"}
              placeholder="Enter a description"
              style={Styles.input}
            />
          </View>
        ) : null}
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: "black",
            width: WP(100),
            height: WP(100),
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          {img ? (
            <Image
              source={{ uri: img }}
              style={{ width: WP(100), height: WP(100) }}
            />
          ) : (
            <IconCam name="camera" size={30} color={"#BDBDBD"} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};
export default AddPhoto;
