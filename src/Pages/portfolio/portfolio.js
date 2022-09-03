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
import { Header } from "../../Components/header/header";
const Portfolio = (props) => {
  const [ports, setPorts] = useState(props?.route?.params?.Portfolio);
  const renderPort = (item) => {
    return (
      <View style={Styles.portItem}>
        <View
          style={{
            ...GlobalStyles.row,
            paddingLeft: WP(2),
            paddingVertical: HP(1),
            borderBottomWidth: 1,
            borderBottomColor: "grey",
          }}
        >
          <Image
            style={{
              width: 30,
              height: undefined,
              aspectRatio: 1 / 1,
              borderRadius: 20,
            }}
            source={{ uri: item.profilePhoto }}
          ></Image>
          <Text style={Styles.nameTxt}>{item.User}</Text>
        </View>
        <Image
          source={{ uri: "https:" + item.Photo }}
          style={{ width: WP(100), height: undefined, aspectRatio: 1 / 1 }}
          //resizeMode="contain"
        />
        <Text style={Styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <>
      <Header title="Portfolio" onPress={() => props.navigation.goBack()} />
      <FlatList
        data={ports}
        windowSize={1}
        renderItem={({ item }) => renderPort(item)}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};
export default Portfolio;
