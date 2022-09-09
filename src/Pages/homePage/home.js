import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Button } from "../../Components/Button/Button";
import { LoginModal } from "../../Components/loginModal/loginModal";
import { HomeStyle as Styles } from "./home.style";
import { Video } from "expo-av";

const Home = (props) => {
  const [mod, setMod] = useState(false);
  return (
    <View style={Styles.mainContainer}>
      {/*}
        <Image
          source={require('../../Assets/Imgs/Worship.jpeg')}
          style={Styles.image}
  />*/}
      <Video
        source={{
          uri: "https://filmsupply-files.s3.amazonaws.com/fs/files/production/clip_mov/1126333/mp4.wat.h.484.Kt14nxIDewipUYOr5r9271pxLYQJYeWCteVLFhXJz1qR3.mp4",
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
