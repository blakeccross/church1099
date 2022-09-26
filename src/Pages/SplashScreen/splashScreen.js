import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../services/api.services";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../root/reducer";
import { storageServices } from "../../services/storage.services";

const Splash = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    changeScreen();
  }, []);

  const changeScreen = async () => {
    await AsyncStorage.getItem("id").then((res) => {
      if (res != null) {
        getData().then(() => {
          props.navigation.replace("TabNavigator");
        });
      } else {
        props.navigation.replace("Home");
      }
    });
  };

  const getData = async () => {
    const userID = await storageServices.fetchKey("id");
    let user = await API.getUserData(userID);
    dispatch(getUser(user));
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#3920ff", flex: 1 }}>
      <View style={{ width: "50%", alignSelf: "center" }}>
        <Image
          resizeMode={"contain"}
          source={require("../../Assets/Imgs/church1099_LogoWht.png")}
          style={{ height: "100%", width: "100%", alignSelf: "center" }}
        />
      </View>
    </SafeAreaView>
  );
};
export default Splash;
