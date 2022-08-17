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
  console.log(props);
  const [img, setImg] = useState(
    props?.route?.params?.userData["Profile Photo"]
  );
  const [name, setName] = useState(props?.route?.params?.userData.Name);
  const [email, setEmail] = useState(
    props?.route?.params?.userData.authentication?.email.email
  );
  const [phone, setPhone] = useState(
    props?.route?.params?.userData["Phone Number"]
  );
  const [loc, setLoc] = useState(props?.route?.params?.userData?.Location);
  const [bio, setBio] = useState(props?.route?.params?.userData.Bio);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(
    props?.route?.params?.userData.Gender
      ? props?.route?.params?.userData.Gender
      : "Male"
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
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <SafeAreaView style={{ ...Styles.container }}>
        <Header
          title="Edit Profile"
          onPress={() => props.navigation.goBack()}
        />
        <ScrollView
          contentContainerStyle={{ paddingBottom: HP(8), marginTop: HP(2) }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={{ paddingHorizontal: WP(6) }}>
              <TouchableOpacity
                onPress={pickImage}
                style={{ alignItems: "center" }}
              >
                {img ? (
                  <Image source={{ uri: img }} style={{ ...Styles.dp }} />
                ) : (
                  <Image source={Imgs.dp} style={{ ...Styles.dp }} />
                )}
                <Text style={{ ...Styles.changePhotoTxt, paddingTop: HP(1) }}>
                  Upload Profile Picture
                </Text>
              </TouchableOpacity>
              <View style={{ paddingTop: HP(2) }}>
                <Text style={{ ...Styles.emailTxt }}>Full Name</Text>
                <Input value={name} setValue={setName} placeTxt={""} />
              </View>
              <View style={{ paddingTop: HP(2) }}>
                <Text style={{ ...Styles.emailTxt }}>Phone</Text>
                <Input
                  value={phone}
                  setValue={setPhone}
                  placeTxt={""}
                  keyboard={"phone-pad"}
                />
              </View>
              <View
                style={{
                  ...GlobalStyles.row,
                  width: "100%",
                  paddingTop: HP(2),
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "48%" }}>
                  <Text style={{ ...Styles.emailTxt }}>
                    Location <Text style={{ fontSize: 10 }}>(City,State)</Text>
                  </Text>
                  <Input value={loc} setValue={setLoc} placeTxt={""} />
                </View>
                <View style={{ width: "48%" }}>
                  <Text style={{ ...Styles.emailTxt }}>Gender</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setGenderMod(true);
                    }}
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
              </View>
              <View style={{ paddingTop: HP(2) }}>
                <Text style={{ ...Styles.emailTxt }}>Title</Text>
                <Input value={bio} setValue={setBio} placeTxt={""} />
              </View>
              <View style={{ marginTop: HP(5) }}>
                <Button onPress={() => onSubmit()} btnTxt={"Submit"} />
              </View>
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
      </SafeAreaView>
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
