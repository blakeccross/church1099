import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import { EditExpModal } from "../../Components/expModal/editExpMod";
import { Header } from "../../Components/header/header";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { userExperience as Styles } from "./userExperience.style";
import RenderExperience from "../../Components/flatlistRenders/renderExperience";
import { storageServices } from "../../services/storage.services";
import { API } from "../../services/api.services";

const UserExperience = (props) => {
  const [loading, setLoading] = useState(false);
  const [editMod, setEditMod] = useState(false);
  const [title, settitle] = useState("");
  const [empType, setempType] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [isEmployee, setisEmployee] = useState(true);
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");
  const [experience, setExperience] = useState([]);
  const [selectedExp, setSelectedExp] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const userID = await storageServices.fetchKey("id");
    let ex = await API.getExperienceList(userID);
    setExperience(ex);
    setLoading(false);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);
  const postExperience = async () => {
    let obj = {
      title: title,
      type: empType,
      company: companyName,
      description: description,
      start: startDate,
      photo: companyPhoto,
      ["Current Position"]: isEmployee,
      end: endDate,
    };
    let res = await API.addExperience(obj);
    setMod(true);
    await getData();
  };
  let actionSheet = useRef();
  var optionArray = ["Edit", "Delete", "Cancel"];
  const showActionSheet = (item) => {
    actionSheet.current.show();
  };

  const onActionSelect = (index) => {
    if (index === 0) {
      setEditMod(true);
    } else if (index === 1) {
      Alert.alert("Delete", "Are you sure you want to delete?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteExperience(index),
        },
      ]);
    }
  };
  const deleteExperience = async () => {
    let id = selectedExp._id;
    await API.deleteExperience(id);
    getData();
  };
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <Header
        title="Edit Experience"
        onPress={() => props.navigation.goBack()}
      />
      <FlatList
        data={experience}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedExp(item);
              showActionSheet();
            }}
          >
            <RenderExperience item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <ActionSheet
        ref={actionSheet}
        title={"What would you like to do?"}
        options={optionArray}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={onActionSelect}
      />
      <EditExpModal
        exp={selectedExp}
        show={editMod}
        setShow={setEditMod}
        onPress={() => {
          setEditMod(false);
        }}
      />
    </>
  );
};
export default UserExperience;
