import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { CONST } from "../../Assets/config/constants";
import fontFamily from "../../Assets/config/fontFamily";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../global/global.styles";
import { NotiStyle as Styles } from "./port.style";
import { API } from "../../services/api.services";
const Portfolio = (props) => {
  const [ports, setallNotification] = useState([]);
  useEffect(() => {
    getAllNotification();
  }, []);
  const getAllNotification = async () => {
    let notification = await API.portfolio();

    setallNotification(notification);
  };
  const renderPort = (item) => {
    return (
      <View style={Styles.portItem}>
        <Image
          source={{ uri: "https:" + item.Photo }}
          style={{ width: "100%", height: HP(40) }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ ...Styles.container }}>
      <View
        style={{
          paddingBottom: HP(5),
          paddingTop: HP(3),
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <View
            style={{
              ...GlobalStyles.row,
              marginLeft: 7,
              marginBottom: 10,
            }}
          >
            <Ionicons name="chevron-back" size={30} color="black" />
            <Text style={{ ...GlobalStyles.H2, paddingLeft: 6 }}>
              Portfolio
            </Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={ports}
          renderItem={({ item }) => renderPort(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
export default Portfolio;
