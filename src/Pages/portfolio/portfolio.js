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
import Post from "../../Components/renderMethods/post";
import { storageServices } from "../../services/storage.services";

const Portfolio = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const userId = await storageServices.fetchKey("id");
    let res = await API.portfolio(userId);
    setPosts(res);
    setLoading(false);
  };

  const renderPort = (item) => {
    return (
      <Post
        selectedPost={item}
        props={props}
        setLoading={setLoading}
        loading={loading}
      />
    );
  };

  return (
    <>
      <Header title="Portfolio" onPress={() => props.navigation.goBack()} />
      <View style={{ backgroundColor: "white" }}>
        <FlatList
          data={posts}
          windowSize={1}
          contentContainerStyle={{ paddingBottom: HP(20) }}
          renderItem={({ item }) => renderPort(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};
export default Portfolio;
