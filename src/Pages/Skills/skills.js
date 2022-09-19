import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Header } from "../../Components/header/header";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { skillsStyle as Styles } from "./skills.style";
import { API } from "../../services/api.services";
import { Input } from "../../Components/Input/Input";

const Skills = (props) => {
  const [skills, setSkills] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryList, setCategoryList] = useState([
    { label: "Design", value: "design" },
    { label: "Worship", value: "worship" },
    { label: "Video", value: "video" },
    { label: "Leadership", value: "leadership" },
    { label: "Production", value: "production" },
  ]);

  const getSkills = async () => {
    let data = await API.getSkills(category);
    setSkills(data);
    setLoading(false);
  };
  const searchSkills = async () => {
    let data = await API.searchSkills(query);
    setSkills(data);
    //setLoading(false);
  };
  useEffect(() => {
    searchSkills();
  }, [query]);

  const handlePress = (item) => {
    props.navigation.navigate("SkillsCategory", { data: item.value });
  };

  return (
    <>
      <Header title="Skills" onPress={() => props.navigation.goBack()} />
      <View style={Styles.container}>
        <View style={{ marginTop: HP(2), marginHorizontal: WP(4) }}>
          <Input
            placeTxt={"Search skills"}
            col={"white"}
            setValue={setQuery}
            value={query}
          />
        </View>
        {query.length == 0 ? (
          <Text style={Styles.subText}>Categories</Text>
        ) : (
          <Text style={Styles.subText}>Search Skills</Text>
        )}
        {query.length == 0 ? (
          <>
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
          </>
        ) : (
          <>
            {skills.length == 0 ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text>No skills found</Text>
              </View>
            ) : (
              <>
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
              </>
            )}
          </>
        )}
      </View>
    </>
  );
};
export default Skills;
