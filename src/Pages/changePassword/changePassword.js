import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Header } from "../../Components/header/header";
import { ChangeStyle as Styles } from "./change.style";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";
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
        <View style={{ paddingHorizontal: WP(4), paddingTop: HP(1) }}>
          <Text style={{ color: "grey", marginBottom: HP(2) }}>
            Your password must be at least 6 characters and should include a
            combination of numbers, letters, and special characters (!$@%)
          </Text>
          <View style={Styles.inputContainer}>
            <Input
              col={"white"}
              placeTxt={"Current Password"}
              value={old}
              pass={true}
              setValue={setOld}
            />
          </View>

          <View style={Styles.inputContainer}>
            <Input
              col={"white"}
              placeTxt={"New Password"}
              value={newPas}
              pass={true}
              setValue={setNewPas}
            />
          </View>
          <View style={Styles.inputContainer}>
            <Input
              col={"white"}
              value={confirmPas}
              placeTxt={"Confirm Password"}
              pass={true}
              setValue={setConfirmPas}
            />
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
