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
import { CreateJobStyle as Styles } from "./addExp.style";
import { GlobalStyles } from "../../global/global.styles";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";
import { API } from "../../services/api.services";
import AlertService from "../../services/alertService";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const AddExp = (props) => {
  const [title, setTitle] = useState("");
  const [empType, setEmpType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(true);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const toggleSwitch = () => setIsworking(!isworking);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setdateType] = useState("");

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

  const postExperience = async () => {
    let obj = {
      title: title,
      type: empType,
      company: companyName,
      description: description,
      start: startDate,
      photo: companyPhoto,
      ["Current Position"]: isEmployee,
      end: endDate,
    };
    let res = await API.addExperience(obj);
    setMod(true);
    await getData();
  };

  return (
    <>
      <Header
        title="Add Experience"
        onPress={() => props.navigation.goBack()}
      />
      <View style={{ ...Styles.container }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: WP(6),
            paddingBottom: HP(5),
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
            <Text style={{ ...Styles.enterTxt }}>Job Title</Text>
            <Input value={title} setValue={setTitle} />
            <Text style={{ ...Styles.enterTxt, paddingTop: HP(1) }}>
              Employement Type
            </Text>
            <Input value={empType} setValue={setEmpType} />
            <Text style={{ ...Styles.enterTxt, paddingTop: HP(1) }}>
              Company Name
            </Text>
            <View style={{ ...GlobalStyles.row }}>
              <Input value={companyName} setValue={setCompanyName} />
            </View>
            <Text style={{ ...Styles.enterTxt, paddingTop: HP(1) }}>
              Location
            </Text>
            <Input value={location} setValue={setLocation} />
            <View style={{ ...GlobalStyles.row, paddingTop: HP(1) }}>
              <Text style={{ ...Styles.enterTxt, flex: 1 }}>
                I am currently working in this role
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isCurrent ? "#ffff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isCurrent}
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
                  <Input
                    setValue={setStartDate}
                    value={startDate}
                    editable={false}
                    placeTxt={""}
                  />
                </TouchableOpacity>
              </View>
              {!isCurrent ? (
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
                    <Input
                      setValue={setEndDate}
                      value={endDate}
                      editable={false}
                      placeTxt={""}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={{ paddingTop: HP(2) }}>
              <Text style={{ ...Styles.enterTxt }}>Description</Text>
              <TextInput
                value={description}
                onChangeText={(e) => setDescription(e)}
                multiline
                placeholder=""
                style={{ ...Styles.input }}
              />
            </View>
            <View style={{ marginTop: HP(5) }}>
              <Button onPress={postExperience} btnTxt={"Add Experience"} />
            </View>
          </View>
        </ScrollView>
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
