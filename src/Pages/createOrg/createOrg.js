import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import fontFamily from "../../Assets/config/fontFamily";
import { Header } from "../../Components/header/header";
import { CreateOrgStyle as Styles } from "./createOrg.style";
import { Button } from "../../Components/Button/Button";
import { Input } from "../../Components/Input/Input";
import { API } from "../../services/api.services";
import IconCam from "react-native-vector-icons/SimpleLineIcons";
import * as ImagePicker from "expo-image-picker";
import { firebaseServices } from "../../services/firebase.services";
import { manipulateAsync } from "expo-image-manipulator";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AlertService from "../../services/alertService";
import { BlurView } from "expo-blur";

const CreateOrg = ({ navigation, route }) => {
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [img, setImg] = useState("");
  const ref = useRef();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    const manipResult = await manipulateAsync(result.uri, [
      { resize: { height: 320, width: 320 } },
    ]);

    if (!result.cancelled) {
      setImg(manipResult.uri);
    }
  };

  const handleCreateOrg = async () => {
    setLoad(true);
    if (
      img != "" &&
      name != "" &&
      phone != "" &&
      website != "" &&
      location != ""
    ) {
      let imageName = Date.now().toString();
      await firebaseServices.uploadImage(imageName, img, async (image) => {
        await API.createOrg(image, name, phone, website, location, navigation);
        setLoad(false);
      });
    } else {
      AlertService.show("Missing", "Make sure to fill out every field");
    }
  };
  return (
    <>
      <Header
        title={"Create New Organization"}
        onPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          paddingHorizontal: WP(6),
          paddingTop: HP(2),
        }}
      >
        <Text style={{ ...Styles.txt }}>Logo</Text>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: "rgb(247,247,247)",
            width: 150,
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 100,
          }}
        >
          {img ? (
            <Image
              source={{ uri: img }}
              style={{ width: 150, height: 150, borderRadius: 100 }}
            />
          ) : (
            <IconCam name="camera" size={30} color={"#BDBDBD"} />
          )}
        </TouchableOpacity>
        <View style={{ paddingTop: HP(2) }}>
          <Text style={{ ...Styles.txt }}>Organization Name</Text>
          <Input
            setValue={setName}
            placeTxt={""}
            keyboard={"default"}
            autoCorrect={false}
          />
        </View>
        <View style={{ paddingTop: HP(2) }}>
          <Text style={{ ...Styles.txt }}>Phone Number</Text>
          <Input
            setValue={setPhone}
            placeTxt={""}
            keyboard={"number-pad"}
            autoCorrect={false}
            type={"telephoneNumber"}
          />
        </View>
        <View style={{ marginTop: HP(2) }}>
          <Text style={{ ...Styles.txt }}>Website</Text>
          <Input
            setValue={setWebsite}
            placeTxt={""}
            keyboard={"url"}
            autoCorrect={false}
          />
        </View>
        <View style={{ flex: 1, marginTop: HP(2) }}>
          <Text style={{ ...Styles.txt }}>Organization Location</Text>
          <GooglePlacesAutocomplete
            enablePoweredByContainer={false}
            styles={{
              textInput: {
                height: 45,
                backgroundColor: "rgba(247,247,247,1)",
                fontSize: 16,
              },
            }}
            ref={ref}
            placeholder=""
            onPress={(data, details = null) => {
              setLocation(data.description);
            }}
            query={{
              key: "AIzaSyCqfZsYioXmmp-FpCdAEZjnw8uJ4dwsYFo",
              language: "en",
            }}
          />
        </View>
        <Button
          btnStyle={{ marginTop: HP(2) }}
          btnTxt={"Create Organization"}
          onPress={handleCreateOrg}
        />

        {load && (
          <BlurView
            intensity={10}
            style={{
              width: WP(100),
              height: HP(100),
              position: "absolute",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={"black"} />
          </BlurView>
        )}
      </KeyboardAwareScrollView>
    </>
  );
};
export default CreateOrg;
