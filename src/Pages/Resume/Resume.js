import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { ResumeStyle as Styles } from "./resume.style";
import { Header } from "../../Components/header/header";
import { WebView } from "react-native-webview";

const Resume = (props) => {
  const [resume, setResume] = useState(props.route.params.user.resume);
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <Header title={"Resume"} onPress={() => props.navigation.goBack()} />
      <WebView source={{ uri: "https:" + resume }} />
    </>
  );
};

export default Resume;
