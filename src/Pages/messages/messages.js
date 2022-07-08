import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  FlatList,
} from "react-native";
import { MessageStyle as styles } from "./messages.style";
import FastImage from "react-native-fast-image";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
//import Toast from 'react-native-tiny-toast';
//import firestore from '@react-native-firebase/firestore';
import { API } from "../../services/api.services";
import moment from "moment";
import Entypo from "react-native-vector-icons/Entypo";
import SearchBar from "../../Components/searchBar/searchBar";
import SearchList from "../../Components/modals/searchList/searchList";
import { firebaseServices } from "../../services/firebase.services";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const Messages = (props) => {
  const [messagesList, setmessagesList] = useState([]);
  const [search, setsearch] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [userlist, setUserlist] = useState([]);
  const [filterData, setFilterData] = React.useState([]);

  async function onResult(QuerySnapshot) {
    let changes = QuerySnapshot.docChanges();
    changes.forEach(async (element) => {
      await getConversationList();
    });
  }
  function onError(error) {
    console.error(error);
  }
  useEffect(() => {
    getConversationList();
    getUsersList();
  }, []);
  const getUsersList = async () => {
    let ids = [];
    let name = [];
    let image = [];
    let list = [];
    let url = `https://church1099.com/api/1.1/wf/conversations?UserID=1599771467039x820731645948684800`;
    const data = await API.getUserList(url);
    ids = data?.response?.ID;
    name = data?.response?.Name;
    image = data?.response?.ProfilePhoto;
    for (let index = 0; index < ids.length; index++) {
      let item = {
        name: name[index],
        id: ids[index],
        image: image[index],
      };
      list.push(item);
    }
    setUserlist(list);
  };
  const getConversationList = async () => {
    firebaseServices.getConversationList(res=>{
     
      setmessagesList(res);
      setLoading(false);
    })
  };
  const onSearch = (text) => {
    setsearch(text);
    if (text.length > 0) {
      text = text.toLowerCase();
      const filtered = messagesList.filter((ele) =>
        ele.name?.toLowerCase().includes(text)
      );
      setFilterData(filtered);
    }
  };
  const createConversation = async (item) => {
    // await firebaseServices.sendMessage(item);
    props.navigation.navigate("Convo", { obj: item });
    // await firebaseServices.createConversation(item);
  };
  const renderItem = (item) => {
    // console.log("Item-----<>", item?.lastMessageTime);
    return (
      <TouchableOpacity
        onPress={() => createConversation(item)}
        style={styles.item}
      >
        {/* {item ? (
          <FastImage
            source={{
              uri: 'https:' + item.thumbnail,
              priority: 'low',
            }}
            resizeMode="cover"
            style={styles.image}
          />
        ) : (
          <FastImage
            style={styles.image}
            source={require('../../Assets/Imgs/dp.jpeg')}
          />
        )} */}
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{item.name}</Text>
          <View style={styles.lastMessageTime}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.lastMessage}
            >
              {item?.lastMessage}
            </Text>
            <Text style={styles.time}>
              {item?.lastMessageTime && (moment(item?.lastMessageTime.toDate().toISOString()).fromNow())}

            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={"white"} />
      <SearchBar
        onpress={() => props.navigation.navigate("UserList")}
        val={search}
        search={onSearch}
      />
      <View style={{ flex: 1 }}>
        {Loading ? (
          <>
            {Array.apply(null, { length: 8 }).map((e, i) => (
              <View style={styles.item}>
                <ShimmerPlaceHolder LinearGradient={LinearGradient} />
              </View>
            ))}
          </>
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            data={search.length > 0 ? filterData : messagesList}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
      {/* <SearchList
        props={props}
        show={showModal}
        setshow={setshowModal}
        data={userlist}
        onpress={item => checkConversation(item)}
      /> */}
      {/* <TouchableOpacity
        onPress={() => setshowModal(true)}
        style={styles.addbutton}>
        <Entypo color={'black'} name="plus" size={25} />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};
export default Messages;
