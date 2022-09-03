//import database from '@react-native-firebase/database';
import moment from "moment";
//import firestore from '@react-native-firebase/firestore';
//import '@firebase/firestore';
import { storageServices } from "./storage.services";
import { getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
const getUserInfo = async () => {
  // let id = await storageServices.getKey("@user_id");
  // const user = await firestore().collection("Users").doc(id).get();
  // return user.data();
};
const createChatID = (userId, otherUserId) => {
  let id = [userId, otherUserId].sort().join("_");
  return "chat_room_" + id;
};
const createConversation = async (item) => {
  const app = getApp();
  const fireStore = getFirestore(app);
  let token = await storageServices.fetchKey("id");
  let obj = {};
  // let chatId = `chat_room_${token}_${item.id}`;
  let chatId = createChatID(token, item._id);
  obj = {
    convoId: chatId,
  };
  const profileRef = await doc(fireStore, "chatRoom", chatId);
  await setDoc(profileRef, {
    chatContainIDs: [token, item._id],
    lastMessage: "",
    users: [
      {
        isCreator: true,
        thumb: "",
        userId: token,
      },
      {
        isCreator: false,
        thumb: item["Profile Photo"],
        userId: item._id,
        username: item.Name,
      },
    ],
  }),
    { merge: true };
  return obj;
};
const getConversationList = async (callback) => {
  const app = getApp();
  const fireStore = getFirestore(app);
  // return new Promise(async (resolve) => {
  let id = await storageServices.fetchKey("id");
  let list = [];
  // const querySnapshot = await getDocs(collection(fireStore, "chatRoom"));
  const profileRef = await query(
    collection(fireStore, "chatRoom"),
    orderBy("lastMessageTime", "desc")
  );
  const unsubscribe = onSnapshot(profileRef, (snapshot) => {
    let list = [];
    snapshot.forEach((doc) => {
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
        lastMessageTime: doc.data().lastMessageTime,
        name: curUserinfo?.username,
      };
      if (ids.includes(id)) {
        list.push(obj);
      }
    });
    callback(list);
  });
  return unsubscribe;
  // resolve(list);
  // });
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
  const app = getApp();
  const fireStore = getFirestore(app);
  const profileRef = doc(fireStore, "chatRoom", id);
  await updateDoc(profileRef, {
    lastMessage: msg,
    lastMessageTime: serverTimestamp(),
  });
};
const sendMessage = async (item, mymsg) => {
  const app = getApp();
  const fireStore = getFirestore(app);
  let token = await storageServices.fetchKey("id");
  let timestamp = serverTimestamp();
  var chatData = {
    mymsg: mymsg,
    createdBy: token,
    createdAt: timestamp,
  };
  const profileRef = doc(
    collection(fireStore, "chatRoom", item.convoId, "messages")
  );
  await setDoc(profileRef, chatData), { merge: true };
  updateLastMesaage(item.convoId, mymsg, timestamp);
};
const GetMessages = async (id, callback) => {
  const app = getApp();
  const fireStore = getFirestore(app);
  const profileRef = await query(
    collection(fireStore, "chatRoom", id, "messages"),
    orderBy("createdAt", "desc")
  );
  const unsubscribe = onSnapshot(profileRef, (snapshot) => {
    let list = [];
    snapshot.forEach((userSnapshot) => {
      list.push(userSnapshot.data());
      list.sort((a, b) => {
        return (
          moment(b.createdAt).format("YYYYMMDDHHmmss") -
          moment(a.createdAt).format("YYYYMMDDHHmmss")
        );
      });
    });

    callback(list.reverse());
  });
  return unsubscribe;
};
const updateProfileImage = async (imageName, uri, callback) => {
  const storageRef = ref(getStorage(), imageName);

  const img = await fetch(uri);
  const blob = await img.blob();

  console.log("uploading image");
  const uploadTask = uploadBytesResumable(storageRef, blob);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          console.log("User doesn't have permission to access the object");
          break;
        case "storage/canceled":
          console.log("User canceled the upload");
          break;
        case "storage/unknown":
          console.log("Unknown error occurred, inspect error.serverResponse");
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        callback(downloadURL);
      });
    }
  );
};
const checkuserMessagesCollection = async (item) => {
  const app = getApp();
  const fireStore = getFirestore(app);
  let myId = await storageServices.fetchKey("id");
  let id = createChatID(myId, item._id);
  let obj = {};
  const snap = await getDoc(doc(fireStore, "chatRoom", id));
  if (snap.exists()) {
    obj = {
      convoId: snap.id,
    };
  } else {
    obj = await createConversation(item);
  }
  return obj;
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
  updateProfileImage,
  storeUserInfo,
  sendMessage,
  createConversation,
  getConversationList,
  GetMessages,
  checkuserMessagesCollection,
};
