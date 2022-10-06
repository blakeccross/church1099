import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  LayoutAnimation,
} from "react-native";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import {
  default as IconBack,
  default as Ionicons,
} from "react-native-vector-icons/Ionicons";
import { HP, WP } from "../../Assets/config/screen-ratio";
import RenderMessages from "../../Components/renderMethods/renderMessage";
import { GlobalStyles } from "../../global/global.styles";
import { API } from "../../services/api.services";
import { commonServices } from "../../services/commonServices";
import { storageServices } from "../../services/storage.services";
import { FlashList } from "@shopify/flash-list";
import { ConvoStyle as Styles } from "./conservation.style";

const Convo = (props) => {
  let data = props?.route?.params?.data;
  const [obj, setObj] = useState(props.route.params.obj);
  const [myid, setmyid] = useState("");
  const [allMessages, setallMessages] = useState();
  const [message, setmessage] = useState("");
  const [Loading, setLoading] = useState(true);

  const list = useRef();

  useEffect(() => {
    getMessages();
    let interval = setInterval(() => {
      getMessages();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const sendMessage = async () => {
    setmessage("");
    let res = await API.sendMessage(
      `https://church1099.com/api/1.1/wf/sendmessage/?convoID=${
        data.convoId
      }&content=${(obj, message.trim())}`
    );
    await getMessages();
    list.current?.prepareForLayoutAnimationRender();

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const getMessages = async () => {
    await API.addRead(`${data.convoId}`);
    let id = await storageServices.fetchKey("id");
    setmyid(id);
    let res = await API.getMessages(`${data.convoId}`);
    setallMessages(res);
    setLoading(false);
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
      <SafeAreaView style={{ ...Styles.container }}>
        <View
          style={{
            paddingHorizontal: WP(5),
            paddingVertical: HP(1),
            borderBottomColor: "#e0e0e0",
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{ ...GlobalStyles.row, justifyContent: "space-between" }}
          >
            <View style={{ ...GlobalStyles.row }}>
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={{ paddingRight: WP(2) }}
              >
                <IconBack name="chevron-back" size={27} color={"#2b47fc"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...GlobalStyles.row }}
                onPress={() =>
                  props.navigation.navigate("ProfileView", { user: data })
                }
              >
                <Image
                  source={{ uri: "https:" + data?.profilePhoto }}
                  style={{ ...Styles.dp }}
                />
                <View style={{ paddingLeft: WP(3) }}>
                  <Text style={{ ...Styles.nameTxt }}>{data?.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS == "ios" ? 60 : 20}
          style={{ flex: 1 }}
        >
          <View style={Styles.flatlistContainer}>
            {Loading ? (
              <View
                style={{
                  marginTop: HP(35),
                }}
              >
                <ActivityIndicator color={"black"} size="small" />
              </View>
            ) : (
              <FlashList
                ref={list}
                estimatedItemSize={100}
                inverted={true}
                keyExtractor={(item) => {
                  return item._id;
                }}
                data={allMessages || []}
                renderItem={({ item }) => {
                  return (
                    <RenderMessages
                      item={item}
                      myid={myid}
                      profilePhoto={props?.route?.params?.data.profilePhoto}
                    />
                  );
                }}
              />
            )}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                ...GlobalStyles.row,
                justifyContent: "center",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                paddingTop: 10,
                backgroundColor: "white",
              }}
            >
              <View style={{ width: "90%" }}>
                <AutoGrowingTextInput
                  style={Styles.textInput}
                  placeholder={"Message..."}
                  onChangeText={(e) => setmessage(e)}
                  value={message}
                  maxHeight={100}
                  minHeight={45}
                />
              </View>
              <TouchableOpacity
                onPress={() => sendMessage()}
                disabled={commonServices.whiteSpaces(message)}
              >
                <Ionicons name={"send"} color={"#2b47fc"} size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};
export default Convo;
