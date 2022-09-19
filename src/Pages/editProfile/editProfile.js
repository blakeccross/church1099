import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Imgs } from "../../Assets/Imgs";
import { EditStyle as Styles } from "./edit.style";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";
import { Header } from "../../Components/header/header";
import { API } from "../../services/api.services";
import AlertService from "../../services/alertService";
import { Picker } from "@react-native-picker/picker";
import ReactNativeModal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { firebaseServices } from "../../services/firebase.services";
import { getUser } from "../../root/reducer";
import { storageServices } from "../../services/storage.services";
import { manipulateAsync } from "expo-image-manipulator";
import { useSelector } from "react-redux";

const EditProfile = (props) => {
  const user = useSelector((state) => state.user.data);
  const [img, setImg] = useState("https:" + user.profilePhoto);
  const prevImg = "https:" + user.profilePhoto;
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [loc, setLoc] = useState(user.location);
  const [bio, setBio] = useState(user.header);
  const [gender, setGender] = useState(user.gender ? user.gender : "");
  const [genderMod, setGenderMod] = useState(false);
  const dispatch = useDispatch();

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

  const updateProfile = async () => {
    if (img !== prevImg) {
      let imageName = Date.now().toString();
      await firebaseServices.updateProfileImage(
        imageName,
        img,
        async (image) => {
          let obj = {
            Name: name,
            ["Profile Photo"]: image,
            Bio: bio,
            Gender: gender,
            ["Phone Number"]: phone,
            Location: loc,
          };
          await API.editProfile(obj);
        }
      );
    } else {
      let obj = {
        Name: name,
        ["Profile Photo"]: img,
        Bio: bio,
        Gender: gender,
        ["Phone Number"]: phone,
        Location: loc,
      };
      await API.editProfile(obj);
    }
    const userID = await storageServices.fetchKey("id");
    let user = await API.getUserData(userID);
    dispatch(getUser(user));
    props.navigation.goBack();
  };

  const onSubmit = async () => {
    if (name != "" && bio != "" && gender != "" && phone != "") {
      Alert.alert("Update", "Would you like to submit changes", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => updateProfile(),
        },
      ]);
    } else AlertService.show("Required all  fields!");
  };
  return (
    <>
      <View style={Styles.container}>
        <Header
          title="Edit Profile"
          onPress={() => props.navigation.goBack()}
        />
        <ScrollView
          contentContainerStyle={{ paddingBottom: HP(8), marginTop: HP(2) }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              paddingHorizontal: WP(6),
            }}
          >
            <TouchableOpacity
              onPress={pickImage}
              style={{
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#f4f4f5",
                paddingBottom: HP(2),
              }}
            >
              {img ? (
                <Image source={{ uri: img }} style={{ ...Styles.dp }} />
              ) : (
                <Image source={Imgs.dp} style={{ ...Styles.dp }} />
              )}
              <Text style={{ ...Styles.changePhotoTxt, paddingTop: HP(1) }}>
                Change Profile Picture
              </Text>
            </TouchableOpacity>
            <View style={Styles.row}>
              <Text style={{ ...Styles.setting }}>Name</Text>
              <View style={Styles.inputContainer}>
                <Input
                  col={"white"}
                  value={name}
                  setValue={setName}
                  placeTxt={"Full Name"}
                />
              </View>
            </View>
            <View style={Styles.row}>
              <Text style={{ ...Styles.setting }}>Phone</Text>
              <View style={Styles.inputContainer}>
                <Input
                  col={"white"}
                  value={phone}
                  setValue={setPhone}
                  placeTxt={"Phone Number"}
                  keyboard={"phone-pad"}
                />
              </View>
            </View>
            <View style={Styles.row}>
              <Text style={{ ...Styles.setting }}>Location</Text>
              <View style={Styles.inputContainer}>
                <Input
                  col={"white"}
                  value={loc}
                  setValue={setLoc}
                  placeTxt={"Location"}
                />
              </View>
            </View>
            <View style={Styles.row}>
              <Text style={{ ...Styles.setting }}>Gender</Text>
              <TouchableOpacity
                onPress={() => {
                  setGenderMod(true);
                }}
                style={Styles.inputContainer}
              >
                <View style={Styles.input}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      paddingBottom: 2,
                    }}
                  >
                    {gender}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={Styles.row}>
              <Text style={{ ...Styles.setting }}>Header</Text>
              <View style={{ ...Styles.inputContainer, height: 40 }}>
                <Input
                  col={"white"}
                  value={bio}
                  setValue={setBio}
                  placeTxt={"Header"}
                  multiline={false}
                />
              </View>
            </View>
            <View style={{ marginTop: HP(5) }}>
              <Button onPress={() => onSubmit()} btnTxt={"Submit"} />
            </View>
          </View>
          <ReactNativeModal
            isVisible={genderMod}
            style={{ margin: 0 }}
            onBackButtonPress={() => setGenderMod(false)}
            onBackdropPress={() => setGenderMod(false)}
          >
            <View style={Styles.centeredView}>
              <View style={Styles.rectangle} />
              <Picker
                selectedValue={gender}
                onValueChange={(gender, index) => {
                  setGender(gender);
                  setGenderMod(false);
                }}
                mode="dropdown" // Android only
                //style={styles.picker}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
          </ReactNativeModal>
        </ScrollView>
      </View>
    </>
  );
};

export default EditProfile;
