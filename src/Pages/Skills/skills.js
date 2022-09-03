import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Header } from "../../Components/header/header";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { skillsStyle as Styles } from "./skills.style";
import { storageServices } from "../../services/storage.services";
import { API } from "../../services/api.services";
import { Input } from "../../Components/Input/Input";

const Skills = (props) => {
  const [skills, setSkills] = useState([]);
  const [categoryList, setCategoryList] = useState([
    { label: "Design", value: "design" },
    { label: "Worship", value: "worship" },
    { label: "Video", value: "video" },
    { label: "Leadership", value: "leadership" },
    { label: "Production", value: "production" },
  ]);

  const handlePress = (item) => {
    props.navigation.navigate("SkillsCategory", { data: item.value });
  };

  return (
    <>
      <Header title="Skills" onPress={() => props.navigation.goBack()} />
      <View style={Styles.container}>
        <View style={{ marginTop: HP(2), marginHorizontal: WP(4) }}>
          <Input placeTxt={"Search skills"} col={"white"} />
        </View>
        <Text style={Styles.subText}>Categories</Text>
        {categoryList.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={Styles.item}
              onPress={() => handlePress(item)}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};
export default Skills;
