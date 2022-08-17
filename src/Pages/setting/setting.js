import React, { Fragment, useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { API } from "../../services/api.services";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { SettingStyle as Styles } from "./setting.style";
import Icon from "react-native-vector-icons/Ionicons";
import { GlobalStyles } from "../../global/global.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import AlertService from "../../services/alertService";
import { ChangeBackgroundColor, GetUser } from "../../root/action";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Header } from "../../Components/header/header";
/*
const Setting = (props) => {
  useEffect(() => {
    getData();
  }, []);
    const getData = async () => {
    let res = await API.getUser();
    setuserData(res);
    setLoading(false);
  };

  */
const Setting = (props) => {
  const [userData, setUserData] = useState(props.route.params.userData);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let res = await API.getUser();
  };

  const onSignOut = async () => {
    AlertService.confirm("Are you sure you want to Logout?").then(
      async (res) => {
        if (res) {
          await AsyncStorage.removeItem("id");
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("email");
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        }
      }
    );
  };
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <SafeAreaView style={{ ...Styles.container }}>
        <Header title="Settings" onPress={() => props.navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: WP(5), paddingTop: HP(2) }}>
            <TouchableOpacity
              style={{
                ...Styles.section,
                ...GlobalStyles.row,
                paddingVertical: 15,
                paddingHorizontal: 15,
              }}
              onPress={() =>
                props.navigation.navigate("EditProfile", { userData })
              }
            >
              <Image
                source={{ uri: userData["Profile Photo"] }}
                style={{ ...Styles.dp }}
              />
              <Text style={{ ...Styles.setTxt, fontSize: 20 }}>
                {userData["Name"]}
              </Text>
              <Icon
                name={"chevron-forward"}
                style={{ position: "absolute", right: 15 }}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Text style={Styles.secHeader}>Settings</Text>
            <View style={{ ...Styles.section }}>
              <TouchableOpacity
                style={{
                  ...GlobalStyles.row,
                  ...Styles.settingItem,
                  width: "100%",
                }}
                onPress={() => props.navigation.navigate("ChangePassword")}
              >
                <MaterialCommunityIcons name="key" size={24} color="black" />
                <Text style={{ ...Styles.setTxt }}>Change Password</Text>
                <Icon
                  name={"chevron-forward"}
                  style={{ position: "absolute", right: 0 }}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...GlobalStyles.row,
                  ...Styles.settingItem,
                  width: "100%",
                }}
                onPress={() => props.navigation.navigate("Subscription")}
              >
                <MaterialIcons name="payment" size={24} color="black" />
                <Text style={{ ...Styles.setTxt }}>Subscription</Text>
                <Icon
                  name={"chevron-forward"}
                  style={{ position: "absolute", right: 0 }}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                ...Styles.section,
                justifyContent: "center",
                paddingVertical: 15,
                marginTop: 10,
              }}
              onPress={() => {
                onSignOut();
              }}
            >
              <Text
                style={{
                  ...Styles.setTxt,
                  marginLeft: 0,
                  color: "red",
                }}
              >
                Signout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View>
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Version 1.0
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};
const mapStateToProps = (state) => {
  const { backgroundColor } = state;
  const { user } = state;
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeBackgroundColor: (bg) => dispatch(ChangeBackgroundColor(bg)),
    getUser: (userInfo) => dispatch(GetUser(userInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
