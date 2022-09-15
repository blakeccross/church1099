import React, { useEffect, useState, useRef } from "react";
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
import { EditExpStyle as Styles } from "./EditExp.style";
import { GlobalStyles } from "../../global/global.styles";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";
import { API } from "../../services/api.services";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import ReactNativeModal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditExp = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [emp, setEmp] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const toggleSwitch = () => setIsWorking(!isWorking);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setdateType] = useState("");
  const [empModal, setEmpModal] = useState(false);
  const ref = useRef();
  const exp = route.params.exp;

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
    let obj = {
      Company: companyName,
      Title: title,
      ["Employment Type"]: emp,
      ["Current Position"]: isCurrent,
      Location: location,
      ["Start Date"]: startDate,
      ...(endDate ? { ["End Date"]: endDate } : null),
      Description: description,
    };
    console.log(obj);
    let id = exp._id;

    await API.editExperience(obj, id, navigation);
  };

  return (
    <>
      <Header title={title} onPress={() => navigation.goBack()} />
      <View style={{ ...Styles.container }}>
        <KeyboardAwareScrollView
          extraScrollHeight={100}
          keyboardShouldPersistTaps="always"
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
              enablePoweredByContainer={false}
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
        </KeyboardAwareScrollView>
        <View
          style={{
            marginBottom: HP(5),
            marginTop: HP(1),
            marginHorizontal: WP(5),
          }}
        >
          <Button onPress={editExperience} btnTxt={"Edit Experience"} />
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};
export default EditExp;
