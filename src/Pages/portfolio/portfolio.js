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
import { HP, WP } from "../../Assets/config/screen-ratio";
import { API } from "../../services/api.services";
import { Header } from "../../Components/header/header";
import Post from "../../Components/renderMethods/post";
import { storageServices } from "../../services/storage.services";

const Portfolio = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = props.route.params._id;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await API.portfolio(userId);
    setPosts(res);
    setLoading(false);
  };

  const handleDelete = () => {
    getData();
  };

  const renderPort = (item) => {
    return (
      <Post
        selectedPost={item}
        props={props}
        setLoading={setLoading}
        loading={loading}
        handleDelete={handleDelete}
        onPress={() =>
          props.navigation.navigate("ProfileView", {
            user: item,
          })
        }
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
