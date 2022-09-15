import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Header } from "../../Components/header/header";
import { CreateJobStyle as Styles } from "./createJob.style";
import { GlobalStyles } from "../../global/global.styles";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";
import { API } from "../../services/api.services";
import AlertService from "../../services/alertService";
import ReactNativeModal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

const CreateJob = (props) => {
  const [title, setTitle] = useState("");
  const [church, setChurch] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("");
  const [emp, setEmp] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [modal, setModal] = useState(false);
  const [empModal, setEmpModal] = useState(false);

  const onPost = async () => {
    console.log(isRemote);
    if (
      title != "" &&
      church != "" &&
      emp != "" &&
      description != "" &&
      location != "" &&
      position != ""
    ) {
      await API.PostJob(
        title,
        church,
        location,
        position,
        emp,
        description,
        isRemote,
        props
      );
    } else {
      AlertService.show("Missing", "Enter all required data");
      console.log(title);
    }
  };
  return (
    <>
      <Header title="Create Job" onPress={() => props.navigation.goBack()} />
      <View style={{ ...Styles.container }}>
        <KeyboardAwareScrollView
          extraScrollHeight={100}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            paddingHorizontal: WP(6),
          }}
        >
          <View style={{ width: "100%" }}>
            <Text style={{ ...Styles.createTxt }}>Job Title</Text>
            <Input value={title} setValue={setTitle} />
          </View>
          <View style={{ width: "100%" }}>
            <Text style={{ ...Styles.createTxt }}>Church / Ministry</Text>
            <Input value={church} setValue={setChurch} />
          </View>

          <View style={{ width: "100%" }}>
            <Text style={{ ...Styles.createTxt }}>Job Location</Text>
            <GooglePlacesAutocomplete
              styles={{
                textInput: {
                  height: 45,
                  backgroundColor: "rgba(247,247,247,1)",
                  fontSize: 16,
                },
              }}
              placeholder="Search"
              onPress={(data, details = null) => {
                setLocation(data.description);
              }}
              query={{
                key: "AIzaSyCqfZsYioXmmp-FpCdAEZjnw8uJ4dwsYFo",
                language: "en",
              }}
            />
          </View>
          <View>
            <Text style={{ ...Styles.createTxt }}>Position Type</Text>
            <TouchableOpacity
              onPress={() => {
                setModal(true);
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
                  {position}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ ...Styles.createTxt }}>Employment Type</Text>
            <TouchableOpacity
              onPress={() => {
                setEmpModal(true);
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
                  {emp}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...GlobalStyles.row,
              marginTop: HP(2),
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...Styles.createTxt, marginBottom: 15 }}>
              Is this position remote?
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#2B47FC" }}
              thumbColor={isRemote ? "white" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setIsRemote(!isRemote);
              }}
              value={isRemote}
            />
          </View>
          <View>
            <Text style={{ ...Styles.createTxt }}>Job Description</Text>
            <AutoGrowingTextInput
              style={Styles.input}
              //placeholder={"Message..."}
              onChangeText={(e) => setDescription(e)}
              value={description}
              maxHeight={500}
              minHeight={150}
            />
          </View>
          <ReactNativeModal
            isVisible={modal}
            style={{ margin: 0 }}
            onBackButtonPress={() => setModal(false)}
            onBackdropPress={() => setModal(false)}
          >
            <View style={Styles.centeredView}>
              <View style={Styles.rectangle} />

              <Picker
                selectedValue={position}
                onValueChange={(position, index) => {
                  setPosition(position);
                  setModal(false);
                }}
                mode="dropdown" // Android only
                //style={styles.picker}
              >
                <Picker.Item label="Administration" value="Administration" />
                <Picker.Item label="Communications" value="Communications" />
                <Picker.Item label="Design" value="Design" />
                <Picker.Item label="Film" value="Film" />
                <Picker.Item label="Hospitality" value="Hospitality" />
                <Picker.Item label="Internship" value="Internship" />
                <Picker.Item label="IT" value="IT" />
                <Picker.Item label="Leadership" value="Leadership" />
                <Picker.Item label="Production" value="Production" />
                <Picker.Item label="Social Media" value="Social Media" />
                <Picker.Item label="Students" value="Students" />
                <Picker.Item label="Video" value="Video" />
                <Picker.Item label="Web" value="Web" />
                <Picker.Item label="Worship" value="Worship" />
                <Picker.Item label="Youth / Kids" value="Youth / Kids" />
              </Picker>
            </View>
          </ReactNativeModal>
          <ReactNativeModal
            isVisible={empModal}
            style={{ margin: 0 }}
            onBackButtonPress={() => setEmpModal(false)}
            onBackdropPress={() => setEmpModal(false)}
          >
            <View style={Styles.centeredView}>
              <View style={Styles.rectangle} />

              <Picker
                selectedValue={emp}
                onValueChange={(emp, index) => {
                  setEmp(emp);
                  setEmpModal(false);
                }}
                mode="dropdown" // Android only
                //style={styles.picker}
              >
                <Picker.Item label="Full-Time" value="Full-Time" />
                <Picker.Item label="Part-Time" value="Part-Time" />
                <Picker.Item label="Contract" value="Contract" />
                <Picker.Item label="Tomporary" value="Tomporary" />
                <Picker.Item label="Volunteer" value="Volunteer" />
                <Picker.Item label="Internship" value="Internship" />
              </Picker>
            </View>
          </ReactNativeModal>
        </KeyboardAwareScrollView>
        <View
          style={{
            marginBottom: HP(5),
            marginTop: HP(1),
            marginHorizontal: WP(5),
          }}
        >
          <Button onPress={() => onPost()} btnTxt={"Create Job"} />
        </View>
      </View>
    </>
  );
};
export default CreateJob;
