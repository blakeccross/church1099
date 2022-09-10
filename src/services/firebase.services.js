import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCcmvrUzLz3ni5q3re0ynINyGif4dEJkJw",
  authDomain: "church1099-4e3cc.firebaseapp.com",
  projectId: "church1099-4e3cc",
  storageBucket: "church1099-4e3cc.appspot.com",
  messagingSenderId: "622358755806",
  appId: "1:622358755806:web:78fbfd9b26f108982d854f",
  measurementId: "G-2BMWFEVSMD",
};

initializeApp(firebaseConfig);

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

export const firebaseServices = {
  updateProfileImage,
};
