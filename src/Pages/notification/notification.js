import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  RefreshControl,
  TouchableOpacity,
  FlatList,
} from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { GlobalStyles } from "../../global/global.styles";
import { NotiStyle as Styles } from "./noti.style";
import { API } from "../../services/api.services";
import Swipeable from "react-native-gesture-handler/Swipeable";
import moment from "moment";
import { FlashList } from "@shopify/flash-list";

const Notification = (props) => {
  const [allNotification, setallNotification] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllNotifications();
  }, []);

  const getAllNotifications = async () => {
    let notification = await API.getNotifications();
    setallNotification(notification);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllNotifications().then(() => setRefreshing(false));
  }, []);

  let rowRefs = new Map();

  const renderItem = (item, index) => {
    return (
      <Swipeable
        key={item._id}
        ref={(ref) => {
          if (ref && !rowRefs.get(item._id)) {
            rowRefs.set(item._id, ref);
          }
        }}
        renderRightActions={() => renderRightActions(item)}
        rightThreshold={10}
        onSwipeableWillOpen={() => {
          [...rowRefs.entries()].forEach(([key, ref]) => {
            if (key !== item._id && ref) ref.close();
          });
        }}
      >
        <View style={Styles.item}>
          <Image source={{ uri: item?.Thumbnail }} style={{ ...Styles.dp }} />
          <View style={{ marginHorizontal: WP(4) }}>
            <Text style={{ ...Styles.nameTxt }}>
              {item.Sender}{" "}
              <Text
                style={{
                  fontFamily: fontFamily.regular,
                  fontSize: 15,
                  paddingLeft: WP(5),
                }}
              >
                {item.Message}
              </Text>
            </Text>
            <Text style={{ ...Styles.lastTxt, paddingTop: HP(0.5) }}>
              {moment(item["Created Date"], moment.ISO_8601).fromNow()}
            </Text>
          </View>
        </View>
      </Swipeable>
    );
  };
  const EmptyListMessage = () => {
    return (
      <View
        style={{
          marginTop: HP(35),
          width: WP(60),
          alignSelf: "center",
        }}
      >
        <Text style={Styles.H1}>No Notifications</Text>
        <Text style={Styles.H2}>
          All of your notifications will show up here
        </Text>
      </View>
    );
  };

  const deleteItem = async (item) => {
    await API.deleteNotification(
      `https://church1099.com/api/1.1/obj/notification/${item._id}`
    );
    await getAllNotifications();
  };

  const renderRightActions = (item) => {
    return (
      <View>
        <View style={Styles.swipeAbleButtonContainer}>
          <TouchableOpacity
            style={Styles.swipeAbleButton}
            onPress={() => deleteItem(item)}
          >
            <Material name={"trash-can-outline"} color="white" size={26} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <SafeAreaView style={{ ...Styles.container }}>
        <View
          style={{
            paddingHorizontal: WP(4),
            paddingTop: HP(2),
            paddingBottom: HP(1),
            backgroundColor: "#2b47fc",
          }}
        >
          <Text style={{ ...GlobalStyles.H1, color: "white" }}>
            Notifications
          </Text>
        </View>
        <FlashList
          estimatedItemSize={90}
          data={allNotification}
          renderItem={({ item, index }) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={EmptyListMessage}
        />
      </SafeAreaView>
    </>
  );
};
export default Notification;
