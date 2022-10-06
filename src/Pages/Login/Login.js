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
import { ForgotModal } from "../../Components/forgotModal/forgotModal";
import { Input } from "../../Components/Input/Input";
import AlertService from "../../services/alertService";
import { API } from "../../services/api.services";
import { loginStyle as Styles } from "./loginStyles";
import { BlurView } from "expo-blur";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const Login = (props) => {
  const [mod, setMod] = useState(false);
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      null;
    }
    return token;
  }

  const onLogin = async () => {
    if (email != "" && password != "") {
      let reg =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (reg.test(email)) {
        setLoad(true);
        let token = await registerForPushNotificationsAsync();
        API.login(email, password, token, props);
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
        <View>
          <Text style={{ ...Styles.titleTxt }}>Welcome Back</Text>
          <Text style={{ ...Styles.subTxt }}>
            Please sign into your account
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
          <Text style={{ ...Styles.txt }}>Password</Text>
          <Input setValue={setPassword} placeTxt={""} pass />
        </View>
        <View style={{ paddingTop: HP(2) }}>
          <Button
            onPress={() => {
              onLogin();
            }}
            btnTxt={"Login"}
          />
        </View>
        <TouchableOpacity onPress={() => setMod(!mod)} style={{}}>
          <Text style={{ ...Styles.forgotTxt, paddingVertical: HP(2) }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Signup");
          }}
          style={{}}
        >
          <Text style={{ ...Styles.forgotTxt }}>
            <Text style={{ fontFamily: fontFamily.light }}>
              Don't have an account?{" "}
            </Text>
            Sign Up
          </Text>
        </TouchableOpacity>
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
      <ForgotModal
        mod={mod}
        onPress={() => setMod(false)}
        email={forgotEmail}
        setEmail={setForgotEmail}
      />
    </SafeAreaView>
  );
};
export default Login;
