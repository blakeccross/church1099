import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  Switch,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Imgs } from "../../Assets/Imgs";
import { EditStyle as Styles } from "./edit.style";
import Icon from "react-native-vector-icons/Ionicons";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";
import { GlobalStyles } from "../../global/global.styles";
import DropDownPicker from "react-native-dropdown-picker";
import { Header } from "../../Components/header/header";
import { API } from "../../services/api.services";
import AlertService from "../../services/alertService";
import { ChangeBackgroundColor, GetUser } from "../../root/action";
import { connect } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import ReactNativeModal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";

const EditProfile = (props) => {
  const [img, setImg] = useState(props?.route?.params?.userData.profilePhoto);
  const [name, setName] = useState(props?.route?.params?.userData.name);
  const [email, setEmail] = useState(
    props?.route?.params?.userData.authentication?.email.email
  );
  const [phone, setPhone] = useState(props?.route?.params?.userData.phone);
  const [loc, setLoc] = useState(props?.route?.params?.userData?.location);
  const [bio, setBio] = useState(props?.route?.params?.userData.header);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(
    props?.route?.params?.userData.gender
      ? props?.route?.params?.userData.gender
      : ""
  );
  const [genderMod, setGenderMod] = useState(false);

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

  const updateProfile = async () => {
    let obj = {
      Name: name,
      ["Profile Photo"]: img,
      Bio: bio,
      Gender: gender,
      ["Phone Number"]: phone,
      Location: loc,
    };
    await API.editProfile(obj);
    let user = await API.getUser();
    props.getUser(user);
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
const mapStateToProps = (state) => {
  const { backgroundColor } = state;
  const { user } = state;

  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeBackgroundColor: (bg) => dispatch(ChangeBackgroundColor(bg)),
    getUser: (userInfo) => dispatch(GetUser(userInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
