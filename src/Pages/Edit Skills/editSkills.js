import React, { useEffect, useState} from "react";
import {
  Alert,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Header } from "../../Components/header/header";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { editSkillsStyle as Styles } from "./editSkills.style";
import { storageServices } from "../../services/storage.services";
import { API } from "../../services/api.services";
import { Input } from "../../Components/Input/Input";
import { Ionicons } from "@expo/vector-icons";

const EditSkills = (props) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    updateSkills();
  }, []);

  const updateSkills = async () => {
    const userID = await storageServices.fetchKey("id");
    let user = await API.getUserData(userID);
    setSkills(user.skills);
  };

  const handlePress = (item) => {
    Alert.alert("Delete Skill", "Would you like to remove this skill?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deleteSkill(item),
      },
    ]);
  };

  const deleteSkill = async (item) => {
    const skill = item;
    const operation = "remove";
    await API.addSkill(skill, operation);
    updateSkills();
  };

  return (
    <>
      <Header
        title="Skills"
        onPress={() => props.navigation.replace("TabNavigator")}
      />
      <View style={Styles.container}>
        {skills.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={Styles.item}
              onPress={() => handlePress(item)}
            >
              <Text>{item}</Text>
              <Ionicons name="ios-pencil-sharp" size={23} color="black" />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};
export default EditSkills;
