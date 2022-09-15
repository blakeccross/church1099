import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  Image,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ConvoStyle as Styles } from "./conservation.style";
import { API } from "../../services/api.services";
import { GlobalStyles } from "../../global/global.styles";
import { HP, WP } from "../../Assets/config/screen-ratio";
import IconBack from "react-native-vector-icons/Ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { storageServices } from "../../services/storage.services";
import { commonServices } from "../../services/commonServices";
import RenderMessages from "../../Components/renderMethods/renderMessage";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

const Convo = (props) => {
  let data = props?.route?.params?.data;
  let scrollRef = React.useRef(null);
  const [obj, setObj] = useState(props.route.params.obj);
  const [myid, setmyid] = useState("");
  const [allMessages, setallMessages] = useState();
  const [message, setmessage] = useState("");
  const [Loading, setLoading] = useState(true);

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    getMessages();
  }, []);

  const sendMessage = async () => {
    let res = await API.sendMessage(
      `https://church1099.com/api/1.1/wf/sendmessage/?convoID=${
        data.convoId
      }&content=${(obj, message.trim())}`
    );
    setmessage("");
    await getMessages();
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
              <ActivityIndicator color={"black"} size="small" />
            ) : (
              <FlatList
                ref={scrollRef}
                onContentSizeChange={() => scrollRef.current.scrollToEnd()}
                onLayout={() => scrollRef.current.scrollToEnd()}
                keyExtractor={(item, index) => index.toString()}
                data={allMessages || []}
                contentContainerStyle={{
                  flex: 1,
                  flexDirection: "column-reverse",
                }}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <RenderMessages
                        item={item}
                        myid={myid}
                        profilePhoto={props?.route?.params?.data.profilePhoto}
                      />
                    </View>
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
