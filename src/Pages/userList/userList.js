//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {Header} from '../../Components/header/header';
import { MaterialIcons } from "@expo/vector-icons";
import {GlobalStyles} from '../../global/global.styles';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {API} from '../../services/api.services';
//import {firebaseServices} from '../../services/firebase.services';
import styles from './userList.styles';
import Feather from 'react-native-vector-icons/Feather';
const UserList = props => {
  const [search, setsearch] = useState('');
  const [userlist, setUserlist] = useState([]);
  const [filterData, setFilterData] = React.useState([]);
  useEffect(() => {
    getUsersList();
  }, []);
  const getUsersList = async () => {
    let data = await API.userListForChat(
      `https://church1099.com/api/1.1/obj/user`,
    );
    setUserlist(data);
  };
  const onSearch = text => {
    setsearch(text);
    if (text.length > 0) {
      text = text.toLowerCase();
      const filtered = userlist.filter(ele =>
        ele.Name?.toLowerCase().includes(text),
      );
      setFilterData(filtered);
    }
  };
  const checkConversation = async item => {
    let obj = await firebaseServices.checkuserMessagesCollection(item);
    props.navigation.replace('Convo', {obj: obj});
  };
  const renderItem = item => {
    let url = item['Profile Photo'];
    return (
      <TouchableOpacity
        onPress={() => checkConversation(item)}
        style={{
          ...GlobalStyles.row,
          justifyContent: 'space-between',
          paddingVertical: HP(1),
          marginHorizontal: WP(8),
        }}>
        <TouchableOpacity style={{...GlobalStyles.row}}>
          {url?.includes('http') ? (
            <Image source={{uri: url}} style={{...styles.userdp}} />
          ) : (
            <Image source={{uri: `https:${url}`}} style={{...styles.userdp}} />
          )}
          <View style={{paddingLeft: WP(5)}}>
            <Text style={styles.nameTxt}>{item.Name}</Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <>
    <SafeAreaView style={{ flex: 0, backgroundColor: '#2b47fc' }} />
    <SafeAreaView style={{...styles.container}}>
      <Header title= "New Message" onPress={() => props.navigation.goBack()}/>
      <View style={styles.searchBarContainer}>
        <Text style={styles.searchText}>To</Text>
        <View style={{ ...styles.searchSection }}>
          <MaterialIcons
            style={GlobalStyles.searchIcon}
            name="search"
            size={20}
            color="#666666"
          />
          <TextInput
            style={{...GlobalStyles.input, backgroundColor: 'white'}}
            placeholderTextColor="#666666"
            returnKeyType={"search"}
            placeholder="Search"
            onChangeText={(e) => setValue(e)}
            onSubmitEditing={() => onSearch()}
          />
        </View>
      </View>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={search.length > 0 ? filterData : userlist}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
    </>
  );
};

export default UserList;
