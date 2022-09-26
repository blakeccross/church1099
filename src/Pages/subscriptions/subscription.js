import React from "react";
import { SafeAreaView } from "react-native";
import { Header } from "../../Components/header/header";
import { WebView } from "react-native-webview";

const Subscription = (props) => {
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <Header title={"About"} onPress={() => props.navigation.goBack()} />
      <WebView source={{ uri: "https://church1099.com/terms" }} />
    </>
  );
};
export default Subscription;
