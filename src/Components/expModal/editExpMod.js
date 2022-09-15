import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Switch,
  ScrollView,
} from "react-native";
import { API } from "../../services/api.services";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { GlobalStyles } from "../../global/global.styles";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import ReactNativeModal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Header } from "../header/header";

export const EditExpModal = ({ exp, show, setShow, onPress, pressSave }) => {
  const [title, setTitle] = useState("");
  const [emp, setEmp] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEmployee, setisEmployee] = useState(true);
  const [isCurrent, setIsCurrent] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const toggleSwitch = () => setIsWorking(!isWorking);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setdateType] = useState("");
  const [empModal, setEmpModal] = useState(false);
  const ref = useRef();

  useEffect(() => {
    setTitle(exp.Title);
    setEmp(exp["Employment Type"]);
    setCompanyName(exp.Company);
    setLocation(exp?.Location?.address);
    ref.current?.setAddressText(exp.Location?.address);
    setStartDate(exp["Start Date"]);
    setEndDate(exp["End Date"]);
    setDescription(exp.Description);
    setIsCurrent(exp["Current Position"]);
  }, [exp]);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (dateType == "start") {
      setStartDate(moment(date).format("YYYY-MM-DD"));
    } else {
      setEndDate(moment(date).format("YYYY-MM-DD"));
    }
    setDatePickerVisibility(false);
  };
  const editExperience = async () => {
    setShow(false);
    let obj = {
      Company: companyName,
      Title: title,
      ["Employment Type"]: emp,
      ["Current Position"]: isEmployee,
      Location: location,
      ["Start Date"]: startDate,
      ...(endDate.length > 0 && { ["End Date"]: endDate }),
      Description: description,
    };
    console.log(obj);
    let id = exp._id;

    await API.editExperience(obj, id);
  };

  return (
    <Modal
      animationType={"slide"}
      visible={show}
      presentationStyle={"FullScreen"}
      onRequestClose={() => setShow(false)}
      onBackButtonPress={() => setShow(false)}
      onBackdropPress={() => setShow(false)}
    >
      <Header title="Edit Experience" onPress={() => setShow(false)} />
      <View style={{ ...Styles.container }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: WP(6),
            paddingBottom: HP(20),
          }}
        >
          <View>
            <View
              style={{
                ...GlobalStyles.row,
                justifyContent: "space-between",
                paddingBottom: HP(1),
              }}
            ></View>
            <Text style={{ ...Styles.txt }}>Job Title</Text>
            <Input value={title} setValue={setTitle} />
            <Text style={{ ...Styles.txt }}>Employement Type</Text>
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
            <Text style={{ ...Styles.txt }}>Company Name</Text>
            <Input value={companyName} setValue={setCompanyName} />
            <Text style={{ ...Styles.txt }}>Location</Text>
            <GooglePlacesAutocomplete
              styles={{
                textInput: {
                  height: 45,
                  backgroundColor: "rgba(247,247,247,1)",
                  fontSize: 16,
                  borderRadius: 10,
                },
              }}
              //ref={(ref) => {
              //  ref?.setAddressText(exp?.Location?.address);
              //}}
              ref={ref}
              disableScroll={false}
              isRowScrollable={false}
              onPress={(data, details = null) => {
                setLocation(data.description);
              }}
              query={{
                key: "AIzaSyCqfZsYioXmmp-FpCdAEZjnw8uJ4dwsYFo",
                language: "en",
              }}
            />
            <View
              style={{
                ...GlobalStyles.row,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...Styles.txt, marginBottom: 15 }}>
                I am currently working in this role
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#2B47FC" }}
                thumbColor={isCurrent ? "white" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setIsCurrent(!isCurrent);
                }}
                value={isCurrent}
                style={{ marginLeft: 0 }}
              />
            </View>
            <View
              style={{
                ...GlobalStyles.row,
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "48%" }}>
                <Text style={{ ...Styles.txt }}>Start Date </Text>
                <TouchableOpacity
                  onPress={() => {
                    setDatePickerVisibility(true);
                    setdateType("start");
                  }}
                >
                  <View style={Styles.input}>
                    {startDate ? (
                      <Text
                        style={{
                          ...Styles.enterTxt,
                        }}
                      >
                        {moment(startDate).format("MMM YYYY")}
                      </Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              </View>
              {isCurrent ? null : (
                <View style={{ width: "48%" }}>
                  <Text style={{ ...Styles.txt }}>End Date</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setDatePickerVisibility(true);
                      setdateType("end");
                    }}
                  >
                    <View style={Styles.input}>
                      <Text
                        style={{
                          ...Styles.enterTxt,
                        }}
                      >
                        {moment(endDate).format("MMM YYYY")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Text style={{ ...Styles.txt }}>Description</Text>
            <AutoGrowingTextInput
              style={Styles.input}
              onChangeText={(e) => setDescription(e)}
              value={description}
              maxHeight={300}
              minHeight={100}
            />
          </View>
          <View
            style={{
              marginTop: HP(2),
            }}
          >
            <Button onPress={editExperience} btnTxt={"Edit Experience"} />
          </View>
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
                mode="dropdown"
              >
                <Picker.Item label="Full-Time" value="Full-Time" />
                <Picker.Item label="Part-Time" value="Part-Time" />
                <Picker.Item label="Contract" value="Contract" />
                <Picker.Item label="Temporary" value="Temporary" />
                <Picker.Item label="Volunteer" value="Volunteer" />
                <Picker.Item label="Internship" value="Internship" />
              </Picker>
            </View>
          </ReactNativeModal>
        </ScrollView>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Modal>
  );
};
const Styles = StyleSheet.create({
  modView: {
    backgroundColor: "white",
    height: "94%",
    width: "95%",
    position: "absolute",
    top: HP(3),
    paddingVertical: HP(1),
    paddingHorizontal: WP(5),
    alignSelf: "center",
  },
  resetTxt: {
    color: "rgb(0,0,0)",
    fontFamily: fontFamily.bold,
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    justifyContent: "center",
    borderWidth: 0,
    height: 45,
    width: "100%",
    backgroundColor: "rgba(247,247,247,1)",
    color: "rgb(0,0,0)",
    paddingLeft: 10,
    borderRadius: 10,
  },
  multiInput: {
    borderWidth: 0,
    height: 100,
    width: "100%",
    backgroundColor: "rgba(247,247,247,1)",
    color: "rgb(0,0,0)",
    padding: 10,
    borderRadius: 10,
    paddingTop: 7,
  },
  txt: {
    marginTop: HP(2),
    fontFamily: fontFamily.bold,
    marginBottom: 5,
    fontSize: 15,
    color: "#000000",
  },
  input: {
    borderWidth: 0,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "rgba(247,247,247,1)",
    color: "rgb(0,0,0)",
    padding: 10,
    height: 45,
    justifyContent: "center",
  },
  centeredView: {
    paddingTop: 10,
    backgroundColor: "white",
    height: HP(30),
    width: WP(100),
    position: "absolute",
    bottom: 0,
    paddingVertical: HP(1),
    paddingHorizontal: WP(5),
    alignSelf: "center",
    borderRadius: 25,
  },
});
export default EditExpModal;
