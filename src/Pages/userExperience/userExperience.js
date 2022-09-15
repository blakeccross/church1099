import React, { useEffect, useState, useRef } from "react";
import {
  ActionSheetIOS,
  Alert,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
//import ActionSheet from "react-native-actionsheet";
import { Header } from "../../Components/header/header";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { userExperience as Styles } from "./userExperience.style";
import RenderExperience from "../../Components/flatlistRenders/renderExperience";
import { API } from "../../services/api.services";

const UserExperience = (props) => {
  const [loading, setLoading] = useState(false);
  const [experience, setExperience] = useState([]);
  const [selectedExp, setSelectedExp] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let ex = await API.getExperienceList();
    setExperience(ex);
    setLoading(false);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  const showActionSheet = (item) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Edit", "Delete"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          props.navigation.navigate("EditExp", { exp: item });
        } else if (buttonIndex === 2) {
          Alert.alert("Delete", "Are you sure you want to delete?", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => deleteExperience(item),
            },
          ]);
        }
      }
    );
  };

  const deleteExperience = async (item) => {
    let id = item._id;
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
              //setSelectedExp(item);
              showActionSheet(item);
            }}
          >
            <RenderExperience item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};
export default UserExperience;
