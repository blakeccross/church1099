import { Video } from "expo-av";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Button } from "../../Components/Button/Button";
import { HomeStyle as Styles } from "./home.style";

const Home = (props) => {
  const [mod, setMod] = useState(false);
  return (
    <View style={Styles.mainContainer}>
      <Video
        source={{
          uri: "https://s3.amazonaws.com/appforest_uf/f1663107285275x207534264490968580/Church1099_BG.mp4",
        }}
        style={Styles.video}
        useNativeControls={false}
        resizeMode="cover"
        isLooping
        isMuted={true}
        shouldPlay={true}
      />
      <View style={Styles.absluteContainer}>
        <Image
          resizeMode={"contain"}
          source={require("../../Assets/Imgs/church1099_LogoWht.png")}
          style={{ height: "100%", width: WP(60), alignSelf: "center" }}
        />
        {/* <Text style={Styles.welcomechurchTxt}>
          Welcome to the future of church contracting.
        </Text> */}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: HP(0),
          paddingBottom: HP(7),
          paddingTop: HP(4),
          width: WP(100),
          alignSelf: "center",
        }}
      >
        <Button
          btnStyle={Styles.loginBtn}
          btnTxt={"Login"}
          btnCol={"white"}
          textCol={"black"}
          onPress={() => props.navigation.navigate("Login")}
        />
        <Button
          btnStyle={Styles.signupBtn}
          btnTxt={"Sign Up"}
          btnCol={"null"}
          textCol={"white"}
          //textCol={"#2B47FC"}
          onPress={() => props.navigation.navigate("Signup")}
        />
      </View>
    </View>
  );
};
export default Home;
