import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  KeyboardAvoidingView,
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
import {
  getFirestore,
  getDocs,
  collection,
  onSnapshot,
  doc,
  setDoc,
  serverTimestamp,
  query
} from "firebase/firestore";
import { getApp } from "firebase/app";
import RenderMessages from '../../Components/renderMethods/renderMessage';
const Convo = props => {
    let scrollRef = React.useRef(null)
  const [mod, setMod] = useState(false);
  const [obj, setObj] = useState(props.route.params.obj);
  const [myid, setmyid] = useState('');
  const [allMessages, setallMessages] = useState();
  const [message, setmessage] = useState('');
  const app = getApp();
    const fireStore = getFirestore(app);
  async function onResult(QuerySnapshot) {
    let changes = QuerySnapshot.docChanges();
    changes.forEach(async element => {
     
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
    // getMessages();
  };
  const getMessages = async () => {
    let id = await storageServices.fetchKey('id');
   
    setmyid(id);
   await firebaseServices.GetMessages(obj.convoId,(Res=>{
    //console.log("Res=====>",Res)
    setallMessages([...Res]);
   }))
    
  };
  return (
    <>
    <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
    <SafeAreaView style={{...Styles.container}}>
      <View style={{paddingHorizontal: WP(5), paddingVertical: HP(1),}}>
        <View style={{...GlobalStyles.row, justifyContent: 'space-between'}}>
          <View style={{...GlobalStyles.row}}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{paddingRight: WP(2)}}>
              <IconBack
                name="chevron-back"
                size={27}
                color={'#2b47fc'}
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
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 60 : 20}
      style={{flex: 1}}
    >
      <View style={[Styles.flatlistContainer]}>
        <FlatList
       ref={scrollRef}
  onContentSizeChange={() => scrollRef.current.scrollToEnd() }
  onLayout={() => scrollRef.current.scrollToEnd() }
          keyExtractor={(item, index) => index.toString()}
          data={allMessages || []}
        
         style={{height:HP(73)}}
          renderItem={({item}) => {
            return (
              <>
                <RenderMessages item={item} myid={myid} />
              </>
            );
          }}
        />
        <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          ...GlobalStyles.row,
          justifyContent: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingTop: 10,
          backgroundColor: 'white'
        }}>
        <View style={{width: '90%'}}>
          <Input
            value={message}
            setValue={setmessage}
            placeTxt={'Message...'}
          />
        </View>
        <TouchableOpacity
          onPress={() => sendMessage()}
          disabled={commonServices.whiteSpcaes(message)}
          // style={{paddingHorizontal: WP(5)}}
        >
          <Ionicons name={'send'} color={'#2b47fc'} size={25} />
        </TouchableOpacity>
      </View>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  );
};
export default Convo;
