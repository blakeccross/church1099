import React, { useEffect, useState } from "react";
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

export const EditExpModal = ({ exp, show, setShow, onPress, pressSave }) => {
  const [title, setTitle] = useState("");
  const [empType, setEmpType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEmployee, setisEmployee] = useState(true);
  const [isWorking, setIsWorking] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const toggleSwitch = () => setIsWorking(!isWorking);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setdateType] = useState("");

  useEffect(() => {
    setTitle(exp.Title);
    setEmpType(exp["Employment Type"]);
    setCompanyName(exp.Company);
    setLocation(exp.Location);
    setStartDate(exp["Start Date"]);
    setDescription(exp.Description);
    setIsWorking(exp["Current Position"]);
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
      ["Employment Type"]: empType,
      ["Current Position"]: isEmployee,
      Location: location,
      ["Start Date"]: startDate,
      ...(endDate.length > 0 && { ["End Date"]: endDate }),
      Description: description,
    };
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
      <View
        style={{
          paddingTop: HP(7),
          paddingBottom: HP(2),
          ...GlobalStyles.row,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => setShow(false)}
          style={{
            paddingHorizontal: WP(3),
            position: "absolute",
            left: 0,
            top: HP(6),
          }}
        >
          <Ionicons name="ios-close-sharp" size={35} color="#333333" />
        </TouchableOpacity>
        <Text style={{ ...GlobalStyles.H3 }}>Edit Experience</Text>
      </View>
      <KeyboardAwareScrollView extraScrollHeight={50}>
        <ScrollView
          contentContainerStyle={{
            //paddingBottom: HP(8),
            //marginBottom: HP(10),
            paddingHorizontal: HP(3),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ ...Styles.enterTxt }}>Job Title</Text>
            <Input value={title} setValue={setTitle} />
            <Text style={{ ...Styles.enterTxt, paddingTop: HP(2) }}>
              Employement Type
            </Text>
            <Input value={empType} setValue={setEmpType} />
            <Text style={{ ...Styles.enterTxt, paddingTop: HP(2) }}>
              Company Name
            </Text>
            <Input value={companyName} setValue={setCompanyName} />
            <Text style={{ ...Styles.enterTxt, paddingTop: HP(2) }}>
              Location
            </Text>
            <Input value={location} setValue={setLocation} />
            <View style={{ ...GlobalStyles.row, paddingTop: HP(2) }}>
              <Text style={{ ...Styles.enterTxt, flex: 1 }}>
                I am currently working in this role
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#2b47fc" }}
                thumbColor={isWorking ? "#ffff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isWorking}
                style={{ marginLeft: 0 }}
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
                <Text style={{ ...Styles.enterTxt }}>Start Date </Text>
                <TouchableOpacity
                  onPress={() => {
                    setDatePickerVisibility(true);
                    setdateType("start");
                  }}
                >
                  <View style={Styles.input}>
                    <Text
                      style={{
                        ...Styles.enterTxt,
                        fontFamily: fontFamily.regular,
                      }}
                    >
                      {moment(startDate).format("MMM YYYY")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {isWorking ? (
                <></>
              ) : (
                <View style={{ width: "48%" }}>
                  <Text style={{ ...Styles.enterTxt }}>End Date</Text>
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
                          fontFamily: fontFamily.regular,
                        }}
                      >
                        {moment(endDate).format("MMM YYYY")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Text style={{ ...Styles.enterTxt, paddingTop: HP(2) }}>
              Description
            </Text>
            <TextInput
              value={description}
              onChangeText={(e) => setDescription(e)}
              multiline
              placeholder=""
              style={{ ...Styles.multiInput }}
            />
            <View style={{ marginTop: HP(5) }}>
              <Button onPress={editExperience} btnTxt={"Edit Experience"} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
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
  enterTxt: {
    fontFamily: fontFamily.bold,
    marginBottom: 5,
    fontSize: 15,
    color: "#000000",
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
});
export default EditExpModal;
