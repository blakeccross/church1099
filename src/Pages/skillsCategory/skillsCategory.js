import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Header } from "../../Components/header/header";
import { skillsCategoryStyles as Styles } from "./skillsCategory.style";
import { API } from "../../services/api.services";

const SkillsCategory = (props) => {
  const [skills, setSkills] = useState([]);
  const [category, setCategory] = useState(props.route.params.data);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills();
  }, [category]);

  const getSkills = async () => {
    let data = await API.getSkills(category);
    setSkills(data);
    setLoading(false);
  };

  const handlePress = async (item) => {
    const skill = item.Type;
    const operation = "add";
    await API.addSkill(skill, operation);
    props.navigation.replace("TabNavigator");
  };

  return (
    <>
      <Header title={category} onPress={() => props.navigation.goBack()} />
      <View style={Styles.container}>
        {Loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <ActivityIndicator color={"black"} size="small" />
          </View>
        ) : (
          <ScrollView>
            {skills.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={Styles.item}
                  onPress={() => handlePress(item)}
                >
                  <Text>{item.Type}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    </>
  );
};
export default SkillsCategory;
