import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Switch } from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Header } from "../../Components/header/header";
import { CreateJobStyle as Styles } from "./addExp.style";
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

const AddExp = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [emp, setEmp] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStart] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(true);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setdateType] = useState("");
  const [empModal, setEmpModal] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log(date);
    if (dateType == "start") {
      setStart(moment(date).format("YYYY-MM-DD"));
    } else {
      setEndDate(moment(date).format("YYYY-MM-DD"));
    }
    setDatePickerVisibility(false);
  };

  useEffect(() => {
    setEndDate(moment(Date.now()).format("YYYY-MM-DD"));
  }, []);

  const postExperience = async () => {
    let obj = {
      title: title,
      type: emp,
      company: companyName,
      location: location,
      description: description,
      start: startDate,
      current: isCurrent,
      end: endDate,
    };
    await API.addExperience(obj, navigation);
  };

  return (
    <>
      <Header
        title="Add Experience"
        onPress={() => props.navigation.goBack()}
      />
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
              disableScroll={false}
              isRowScrollable={false}
              setAddressText={"hello"}
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
                      {endDate ? (
                        <Text
                          style={{
                            ...Styles.enterTxt,
                          }}
                        >
                          {moment(endDate).format("MMM YYYY")}
                        </Text>
                      ) : null}
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
          <Button onPress={postExperience} btnTxt={"Add Experience"} />
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
export default AddExp;
