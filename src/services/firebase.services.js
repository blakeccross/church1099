//import database from '@react-native-firebase/database';
import moment from "moment";
//import firestore from '@react-native-firebase/firestore';
//import '@firebase/firestore';
import { storageServices } from "./storage.services";
import { getApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  onSnapshot,
  doc,
} from "firebase/firestore";
const getUserInfo = async () => {
  let id = await storageServices.getKey("@user_id");
  const user = await firestore().collection("Users").doc(id).get();
  return user.data();
};
const createChatID = (userId, otherUserId) => {
  let id = [userId, otherUserId].sort().join("_");
  return "chat_room_" + id;
};
const createConversation = async (item) => {
  // let token = await storageServices.fetchKey('id');
  // let obj = {};
  // // let chatId = `chat_room_${token}_${item.id}`;
  // let chatId = createChatID(token, item._id);
  // obj = {
  //   convoId: chatId,
  // };
  // await firestore()
  //   .collection('chatRoom')
  //   .doc(chatId)
  //   .set({
  //     chatContainIDs: [token, item._id],
  //     lastMessage: '',
  //     users: [
  //       {
  //         isCreator: true,
  //         thumb: '',
  //         userId: token,
  //       },
  //       {
  //         isCreator: false,
  //         thumb: item['Profile Photo'],
  //         userId: item._id,
  //         username: item.Name,
  //       },
  //     ],
  //   });
  // return obj;
};
const getConversationList = async () => {
  const app = getApp();
  const fireStore = getFirestore(app);
  return new Promise(async (resolve) => {
    let id = await storageServices.fetchKey("id");
    let list = [];
    const querySnapshot = await getDocs(collection(fireStore, "chatRoom"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      let data = doc.data();
      let ids = [];
      let curUserinfo;
      ids = doc.data().chatContainIDs;
      let user = doc.data().users;
      if (user[0].userId !== id) {
        curUserinfo = user[0];
      } else {
        curUserinfo = user[1];
      }
      let obj = {
        convoId: doc.id,
        id: curUserinfo?.userId,
        thumbnail: curUserinfo?.thumb,
        lastMessage: doc.data().lastMessage,
        name: curUserinfo?.username,
      };
      // if (ids.includes(id)) {
      list.push(obj);
      // }
    });

    resolve(list);
  });
};
const storeUserInfo = async (id, data) => {
  // firestore()
  //   .collection('Users')
  //   .doc(id)
  //   .set(data)
  //   .then(() => {
  //     // console.log('Data Uploaded Successfully !');
  //     // Alert.alert('Data Uploaded!', 'Your data submitted  Successfully!');
  //   })
  //   .catch(error => {
  //     // console.log('Something went wrong with upload data .', error);
  //   });
};
const updateLastMesaage = async (id, msg, timestamp) => {
  // firestore().collection('chatRoom').doc(id).update({
  //   lastMessage: msg,
  //   lastMessageTime: timestamp,
  // });
};
const sendMessage = async (item, mymsg) => {
  // let token = await storageServices.fetchKey('id');
  // let timestamp = firestore.FieldValue.serverTimestamp();
  // firestore()
  //   .collection('chatRoom')
  //   .doc(item.convoId)
  //   .collection('messages')
  //   .add({
  //     mymsg: mymsg,
  //     createdBy: token,
  //     createdAt: timestamp,
  //   });
  // await updateLastMesaage(item.convoId, mymsg, timestamp);
};
const GetMessages = async (id) => {
  // let list = [];
  // let querySnapshot = await firestore()
  //   .collection('chatRoom')
  //   .doc(id)
  //   .collection('messages')
  //   .orderBy('createdAt', 'desc')
  //   .get();
  // querySnapshot.docs.map(doc => {
  //   list.push(doc.data());
  // });
  // list = list.sort((a, b) => {
  //   return (
  //     moment(b.createdAt).format('YYYYMMDDHHmmss') -
  //     moment(a.createdAt).format('YYYYMMDDHHmmss')
  //   );
  // });
  // return list.reverse();
};
const checkuserMessagesCollection = async (item) => {
  // let myId = await storageServices.fetchKey('id');
  // let id = createChatID(myId, item._id);
  // let obj = {};
  // let data = await firestore().collection('chatRoom').doc(id).get();
  // if (data.exists) {
  //   obj = {
  //     convoId: data.id,
  //   };
  // } else {
  //   console.log('will create coversation');
  //   obj = await createConversation(item);
  // }
  // return obj;
  // .then(async document => {
  //   if (document.exists) {
  //     obj = {
  //       convoId: document.id,
  //     };
  //     console.log('obj', obj);
  //   } else {
  //     console.log('will create coversation');
  //     await createConversation(item);
  //   }
  //   return obj;
  // });
};
export const firebaseServices = {
  getUserInfo,
  storeUserInfo,
  sendMessage,
  createConversation,
  getConversationList,
  GetMessages,
  checkuserMessagesCollection,
};
