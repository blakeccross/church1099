import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Button } from "../../Components/Button/Button";
import { Input } from "../../Components/Input/Input";
import AlertService from "../../services/alertService";
import { API } from "../../services/api.services";
import { forgotPasswordStyle as Styles } from "./forgotPasswordStyles";
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/Ionicons";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const ForgotPassword = (props) => {
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");

  const handlePress = async () => {
    if (email != "") {
      let reg =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (reg.test(email)) {
        setLoad(true);
        API.forgot(email, props);
      } else {
        AlertService.show("Invalid Email");
      }
    } else {
      AlertService.show("Missing", "Please provide all required data!");
    }
  };

  return (
    <SafeAreaView style={{ ...Styles.container }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: WP(10),
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            paddingLeft: WP(5),
            position: "absolute",
            left: 0,
            top: HP(4),
          }}
        >
          <Icon name={"chevron-back"} color={"black"} size={30} />
        </TouchableOpacity>
        <View>
          <Text style={{ ...Styles.titleTxt }}>Reset Password</Text>
          <Text style={{ ...Styles.subTxt }}>
            Enter the email associated with your account, and we'll email you a
            link to reset your password.
          </Text>
        </View>
        <View style={{ paddingTop: HP(2) }}>
          <Text style={{ ...Styles.txt }}>Email</Text>
          <Input
            setValue={setEmail}
            placeTxt={""}
            keyboard={"email-address"}
            autoCorrect={false}
          />
        </View>
        <View style={{ paddingTop: HP(2) }}>
          <Button
            onPress={() => {
              handlePress();
            }}
            btnTxt={"Login"}
          />
        </View>

        {load && (
          <BlurView
            intensity={10}
            style={{
              width: WP(100),
              height: HP(100),
              position: "absolute",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={"black"} />
          </BlurView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default ForgotPassword;
