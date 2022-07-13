import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  Pressable,
  TouchableOpacity
} from "react-native";
import { MessageStyle as styles } from "./messages.style";
import FastImage from "react-native-fast-image";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
//import Toast from 'react-native-tiny-toast';
//import firestore from '@react-native-firebase/firestore';
import { API } from "../../services/api.services";
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from '../../global/global.styles';
import moment from "moment";
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from "react-native-vector-icons/Entypo";
import SearchBar from "../../Components/searchBar/searchBar";
import SearchList from "../../Components/modals/searchList/searchList";
import { firebaseServices } from "../../services/firebase.services";
import { WP, HP } from "../../Assets/config/screen-ratio";
import SwipeableFlatList from 'react-native-swipeable-list';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const Messages = (props) => {
  const [messagesList, setmessagesList] = useState([]);
  const [search, setsearch] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [userData, setuserData] = useState('');
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
    getData();
  }, []);
  const getData = async () => {
    let res = await API.getUser();
    setuserData(res);
    console.log(userData)
  };
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
  const QuickActions = item => {
    return (
      <View>
        <View style={styles.swipeAbleButtonContainer}>
          <TouchableOpacity
            style={styles.swipeAbleButton}
            onPress={() => deleteItem(item)}>
            <Material name={'trash-can-outline'} color="white" size={26} />
          </TouchableOpacity>
        </View>
      </View>
    );
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
    //console.log("Item-----<>", item.lastMessageTime);
    return (
      <Pressable
        onPress={() => createConversation(item)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.item
        ]}>
        {item ? (
          <Image
            source={{
              uri: 'https:' + item.thumbnail,
              //priority: 'low',
            }}
            resizeMode="cover"
            style={styles.image}
          />
        ) : (
          <Image
            style={styles.image}
            source={require('../../Assets/Imgs/defaultProfile.jpg')}
          />
        )}
        <View key={item.key} style={styles.infoContainer}>
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
      </Pressable>
    );
  };

  return (
<>
    <SafeAreaView style={{ flex: 0, backgroundColor: '#2b47fc'}} />
            <View
            style={{
              ...GlobalStyles.row,
              paddingHorizontal: WP(4),
              paddingTop: HP(2),
              paddingBottom: HP(1),
              backgroundColor: '#2b47fc'
            }}>
      <Text style={{...GlobalStyles.H1, color: 'white'}}>Messages</Text>
      <TouchableOpacity 
      style={{position: 'absolute', right: 20}}
      onPress={() => props.navigation.navigate('UserList')}
      >
      <Entypo name="plus" size={30} color="white"/>
      </TouchableOpacity>
      </View>
      <View style={{ flex: 1 ,backgroundColor: "white"}}>
        {Loading ? (
          <>
            {Array.apply(null, { length: 8 }).map((e, i) => (
              <View style={styles.item}>
                <ShimmerPlaceHolder LinearGradient={LinearGradient} />
              </View>
            ))}
          </>
        ) : (
          <SwipeableFlatList
          maxSwipeDistance={90}
          renderQuickActions={({item}) => QuickActions(item)}
          style={styles.msgList}
            data={search.length > 0 ? filterData : messagesList}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </>
  );
};
export default Messages;
