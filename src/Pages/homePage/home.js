import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Button } from "../../Components/Button/Button";
import { HomeStyle as Styles } from "./home.style";
import { Video } from "expo-av";

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
        <Text style={Styles.welcomechurchTxt}>
          Welcome to the future of church contracting.
        </Text>
      </View>
      <View
        style={{ position: "absolute", bottom: HP(7), alignSelf: "center" }}
      >
        <Button
          btnStyle={Styles.btnStyle}
          btnTxt={"Get Started"}
          btnCol={"#2B47FC"}
          onPress={() => props.navigation.navigate("Signup")}
        />
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Login")}
          style={Styles.loginBtn}
        >
          <Text style={Styles.loginText}>
            Already have an account?{" "}
            <Text style={{ color: "#2B47FC" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;
