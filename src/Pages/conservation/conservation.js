import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ConvoStyle as Styles} from './conservation.style';
//import firestore from '@react-native-firebase/firestore';
import {GlobalStyles} from '../../global/global.styles';
import {HP, WP} from '../../Assets/config/screen-ratio';
import IconBack from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Input} from '../../Components/Input/Input';
import {firebaseServices} from '../../services/firebase.services';
import {storageServices} from '../../services/storage.services';
import {commonServices} from '../../services/commonServices';
import RenderMessages from '../../Components/renderMethods/renderMessage';
const Convo = props => {
  const [mod, setMod] = useState(false);
  const [obj, setObj] = useState(props.route.params.obj);
  const [myid, setmyid] = useState('');
  const [allMessages, setallMessages] = useState();
  const [message, setmessage] = useState('');
  useEffect(() => {
    firestore()
      .collection('chatRoom')
      .doc(obj.convoId)
      .collection('messages')
      .onSnapshot(onResult, onError);
  }, []);
  async function onResult(QuerySnapshot) {
    let changes = QuerySnapshot.docChanges();
    changes.forEach(async element => {
      await getMessages();
    });
  }
  function onError(error) {
    console.error(error);
  }
  useEffect(() => {
    getMessages();
  }, []);
  const sendMessage = async () => {
    // console.warn('send');
    await firebaseServices.sendMessage(obj, message.trim());
    setmessage('');
  };
  const getMessages = async () => {
    let id = await storageServices.fetchKey('id');
    setmyid(id);
    let list = await firebaseServices.GetMessages(obj.convoId);
    setallMessages([...list]);
  };
  return (
    <SafeAreaView style={{...Styles.container}}>
      <View style={{paddingHorizontal: WP(5), paddingTop: HP(1)}}>
        <View style={{...GlobalStyles.row, justifyContent: 'space-between'}}>
          <View style={{...GlobalStyles.row}}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{paddingRight: WP(2)}}>
              <IconBack
                name="chevron-back"
                size={27}
                color={'rgb(37, 150, 190)'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{...GlobalStyles.row}}>
              <Image
                source={{uri: 'https:' + obj?.thumbnail}}
                style={{...Styles.dp}}
              />
              <View style={{paddingLeft: WP(3)}}>
                <Text style={{...Styles.nameTxt}}>{obj?.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={Styles.flatlistContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={allMessages}
          renderItem={({item}) => {
            return (
              <>
                <RenderMessages item={item} myid={myid} />
              </>
            );
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 15,
          width: '100%',
          ...GlobalStyles.row,
          justifyContent: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <View style={{width: '90%'}}>
          <Input
            value={message}
            setValue={setmessage}
            placeTxt={'Type Messgae ....'}
          />
        </View>
        <TouchableOpacity
          onPress={() => sendMessage()}
          disabled={commonServices.whiteSpcaes(message)}
          // style={{paddingHorizontal: WP(5)}}
        >
          <Ionicons name={'send'} color={'rgb(37, 150, 190)'} size={25} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Convo;
