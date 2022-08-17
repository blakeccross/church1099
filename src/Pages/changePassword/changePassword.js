import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Header } from "../../Components/header/header";
import { ChangeStyle as Styles } from "./change.style";
import Icon from "react-native-vector-icons/Ionicons";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";
import { GlobalStyles } from "../../global/global.styles";
import AlertService from "../../services/alertService";
import { API } from "../../services/api.services";

const ChangePassword = (props) => {
  const [old, setOld] = useState("");
  const [newPas, setNewPas] = useState("");
  const [confirmPas, setConfirmPas] = useState("");

  const changePass = async () => {
    if (old != "" && newPas != "" && confirmPas != "") {
      if (newPas === confirmPas) {
        await API.changePassword(
          `update_ps?newps=${newPas}&oldps=${old}`,
          props
        );
      } else
        AlertService.show("That's not right", "Please confirm new passwords");
    } else AlertService.show("Hmmm...", "Try filling in the form first");
  };
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <SafeAreaView style={{ ...Styles.container }}>
        <Header
          title="Change Password"
          onPress={() => props.navigation.goBack()}
        />
        <View style={{ paddingHorizontal: WP(5), paddingTop: HP(1) }}>
          <View style={{ paddingTop: HP(2) }}>
            <Text style={{ ...Styles.setTxt }}>Old Password</Text>
            <Input value={old} pass={true} setValue={setOld} />
          </View>
          <View style={{ paddingTop: HP(2) }}>
            <Text style={{ ...Styles.setTxt }}>New Password</Text>
            <Input value={newPas} pass={true} setValue={setNewPas} />
          </View>
          <View style={{ paddingTop: HP(2) }}>
            <Text style={{ ...Styles.setTxt }}>Verify Password</Text>
            <Input value={confirmPas} pass={true} setValue={setConfirmPas} />
          </View>
          <View style={{ marginTop: HP(5) }}>
            <Button onPress={() => changePass()} btnTxt={"Change Password"} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
export default ChangePassword;
