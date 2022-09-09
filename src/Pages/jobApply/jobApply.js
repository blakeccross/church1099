import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Button } from "../../Components/Button/Button";
import styles from "./jobApply.styles";
import { API } from "../../services/api.services";
import AlertService from "../../services/alertService";
const JobApply = ({ navigation, route }) => {
  console.log(route);
  let data = route?.params;
  const [loading, setloading] = useState(false);
  const applyForJob = async () => {
    setloading(true);
    let res = await API.jobApply(data._id);
    AlertService.show("Your application has been send");
    props.navigation.goBack();
    setloading(false);
  };

  return (
    <SafeAreaView style={{ ...styles.container }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: HP(7),
          paddingHorizontal: WP(4),
        }}
      >
        <View style={{ paddingVertical: HP(2) }}>
          <Text style={{ ...styles.jobTxt, textAlign: "left" }}>
            {data["Job Title"]}
          </Text>
          <Text
            style={{
              textAlign: "left",
              marginTop: HP(0),
              color: "#333333",
              fontSize: 15,
            }}
          >
            Category : {data?.Category}
          </Text>
          <Text style={styles.descriptionTex}>{data["Job Description"]}</Text>
        </View>
        <View style={{ marginTop: HP(0) }}>
          <Button
            btnStyle={{ alignSelf: "center" }}
            onPress={() => applyForJob()}
            btnTxt={"Apply"}
            disable={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default JobApply;
