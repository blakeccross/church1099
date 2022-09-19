import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  Pressable,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { MessageStyle as styles } from "./messages.style";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { API } from "../../services/api.services";
import { GlobalStyles } from "../../global/global.styles";
import moment from "moment";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { WP, HP } from "../../Assets/config/screen-ratio";
import SwipeableFlatList from "react-native-swipeable-list";
import { storageServices } from "../../services/storage.services";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const Messages = (props) => {
  const [messagesListDetails, setmessagesListDetails] = useState([]);
  const [myid, setmyid] = useState("");
  const [Loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getConvoList();
  }, []);

  const getConvoList = async () => {
    let data = await API.getConversationList();
    setmessagesListDetails(data);
    setLoading(false);
  };

  const deleteItem = async (data) => {
    let id = await storageServices.fetchKey("id");
    setmyid(id);
    await API.deleteConversation(
      `https://church1099.com/api/1.1/wf/archiveconvo?convo=${data.convoId}`
    );
    await getConvoList();
  };

  const onRefresh = useCallback(() => {
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
        {item.read == "false" && (
          <View
            style={{
              position: "absolute",
              backgroundColor: "blue",
              height: 10,
              width: 10,
              borderRadius: 10,
              left: 5,
            }}
          />
        )}
        {item.profilePhoto ? (
          <Image
            source={{
              uri: "https:" + item.profilePhoto,
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
          <View style={styles.lastMessageTime}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.time}>
              {item?.lastMessageTime &&
                moment(item?.lastMessageTime, "MMM DD YYYY hh:mm").fromNow()}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.lastMessage}
          >
            {item?.lastMessage}
          </Text>
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
          onPress={() => props.navigation.navigate("newConvo")}
        >
          <Entypo name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {Loading ? (
          <>
            {Array.apply(null, { length: 4 }).map((e, i) => (
              <View style={{ ...styles.item, height: HP(10) }} key={i}>
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
            maxSwipeDistance={WP(20)}
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
