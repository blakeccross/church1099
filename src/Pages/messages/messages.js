import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  Image,
  View,
  Pressable,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { MessageStyle as styles } from "./messages.style";
import FastImage from "react-native-fast-image";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
//import Toast from 'react-native-tiny-toast';
//import firestore from '@react-native-firebase/firestore';
import { API } from "../../services/api.services";
import Icon from "react-native-vector-icons/Ionicons";
import { GlobalStyles } from "../../global/global.styles";
import moment from "moment";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { firebaseServices } from "../../services/firebase.services";
import { WP, HP } from "../../Assets/config/screen-ratio";
import SwipeableFlatList from "react-native-swipeable-list";
import { storageServices } from "../../services/storage.services";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const Messages = (props) => {
  const [messagesListDetails, setmessagesListDetails] = useState([]);
  const [myid, setmyid] = useState("");
  const [Loading, setLoading] = useState(true);

  function onError(error) {
    console.error(error);
  }
  useEffect(() => {
    getConvoList();
  }, []);

  const getConvoList = async () => {
    let data = await API.getConversationList(
      `https://church1099.com/api/1.1/wf/conversations?UserID=1599771467039x820731645948684800`
    );
    let dataDetail = await API.getConversationListDetails(
      `https://church1099.com/api/1.1/wf/convo_details?UserID=1599771467039x820731645948684800`
    );
    const showMessages = dataDetail
      .map((x) => x)
      .map((x, i) => {
        let { _id, ...rest } = x;
        return { ...rest, user_id: _id, ...data[i] };
      });
    setmessagesListDetails(showMessages);
    setLoading(false);
  };

  const deleteItem = async (data) => {
    let id = await storageServices.fetchKey("id");
    setmyid(id);
    let res = await API.deleteConversation(
      `https://church1099.com/api/1.1/wf/archiveconvo/?convo=${data._id}&user=${id}`
    );
    await getConvoList();
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getConvoList().then(() => setRefreshing(false));
  }, []);

  const QuickActions = (item) => {
    return (
      <View>
        <View style={styles.swipeAbleButtonContainer}>
          <TouchableOpacity
            style={styles.swipeAbleButton}
            onPress={() => deleteItem(item)}
          >
            <Material name={"trash-can-outline"} color="white" size={26} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Conversation = async (item) => {
    props.navigation.navigate("Convo", { data: item });
  };
  const renderItem = (item) => {
    return (
      <Pressable
        onPress={() => Conversation(item)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
          },
          styles.item,
        ]}
      >
        {item["Profile Photo"] ? (
          <Image
            source={{
              uri: "https:" + item["Profile Photo"],
              //priority: 'low',
            }}
            resizeMode="cover"
            style={styles.image}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("../../Assets/Imgs/dp.jpg")}
          />
        )}
        <View key={item.key} style={styles.infoContainer}>
          <Text style={styles.userName}>{item.Name}</Text>
          <View style={styles.lastMessageTime}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.lastMessage}
            >
              {item?.lastMessage}
            </Text>
            <Text style={styles.time}>
              {item?.lastMessageTime &&
                moment(item?.lastMessageTime.toDate().toISOString()).fromNow()}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <View
        style={{
          ...GlobalStyles.row,
          paddingHorizontal: WP(4),
          paddingTop: HP(2),
          paddingBottom: HP(1),
          backgroundColor: "#2b47fc",
        }}
      >
        <Text style={{ ...GlobalStyles.H1, color: "white" }}>Messages</Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 20 }}
          onPress={() => props.navigation.navigate("UserList")}
        >
          <Entypo name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {Loading ? (
          <>
            {Array.apply(null, { length: 4 }).map((e, i) => (
              <View style={styles.item} key={i}>
                <ShimmerPlaceHolder
                  LinearGradient={LinearGradient}
                  style={{ ...styles.image }}
                />
                <ShimmerPlaceHolder
                  LinearGradient={LinearGradient}
                  style={{ marginHorizontal: WP(4) }}
                />
              </View>
            ))}
          </>
        ) : (
          <SwipeableFlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            shouldBounceOnMount={false}
            showsVerticalScrollIndicator={false}
            maxSwipeDistance={78}
            data={messagesListDetails}
            renderQuickActions={({ item }) => QuickActions(item)}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </>
  );
};
export default Messages;
