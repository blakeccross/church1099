import React, { useEffect } from "react";
import { SafeAreaView, Text, Image, View } from "react-native";
import { GlobalStyles } from "../../global/global.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Splash = (props) => {
  useEffect(() => {
    setTimeout(() => {
      changeScreen();
    }, 2000);
  }, []);
  const changeScreen = async () => {
    await AsyncStorage.getItem("id").then((res) => {
      if (res != null) {
        props.navigation.replace("TabNavigator");
      } else {
        props.navigation.replace("Home");
      }
    });
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "#3920ff", ...GlobalStyles.container }}
    >
      <View style={{ width: "50%", alignSelf: "center" }}>
        <Image
          resizeMode={"contain"}
          source={require("../../Assets/Imgs/splash.jpeg")}
          style={{ height: "100%", width: "100%", alignSelf: "center" }}
        />
      </View>
    </SafeAreaView>
  );
};
export default Splash;
