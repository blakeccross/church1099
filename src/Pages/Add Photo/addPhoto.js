import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Header } from "../../Components/header/header";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { addPhotoStyle as Styles } from "./addPhoto.style";
import { storageServices } from "../../services/storage.services";
import { API } from "../../services/api.services";
import { Input } from "../../Components/Input/Input";
import * as ImagePicker from "expo-image-picker";
import IconCam from "react-native-vector-icons/SimpleLineIcons";

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.2,
  });

  if (!result.cancelled) {
    setImg(result.uri);
  }
};

const AddPhoto = (props) => {
  const [img, setImg] = useState("");
  return (
    <>
      <Header title="New post" onPress={() => props.navigation.goBack()} />
      <View style={Styles.container}>
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
              style={{ width: WP(80), height: WP(80), borderRadius: 10 }}
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
