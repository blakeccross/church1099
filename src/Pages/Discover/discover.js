import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  SafeAreaView,
  TextInput,
  Image,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { skillsStyle as Styles } from "./discover.style";
import { storageServices } from "../../services/storage.services";
import { API } from "../../services/api.services";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../../Components/Input/Input";
import { GlobalStyles } from "../../global/global.styles";
import PostModal from "../../Components/modals/postModal";

const Discover = (props) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let userId = "";
    let res = await API.portfolio(userId);
    setPosts(res);
  };

  const onSearch = () => {
    props.navigation.navigate("SearchUsers", { search: query });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  const renderPort = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          ...Styles.portItem,
        }}
        onPress={() => {
          setSelectedPost(item);
          setShowModal(true);
        }}
      >
        <Image
          source={{ uri: "https:" + item.Photo }}
          style={{ aspectRatio: 1 / 1 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={Styles.container}>
      <View style={{ ...Styles.searchSection }}>
        <MaterialIcons
          style={{ padding: 10 }}
          name="search"
          size={20}
          color="#666666"
        />
        <TextInput
          style={{ ...Styles.input }}
          placeholderTextColor="#666666"
          returnKeyType={"search"}
          placeholder="Search Church1099"
          onChangeText={setQuery}
          onSubmitEditing={() => onSearch()}
        />
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={posts}
        windowSize={2}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={Styles.grid}
        renderItem={({ item, index }) => renderPort(item, index)}
      />
      {selectedPost ? (
        <PostModal
          show={showModal}
          setShow={setShowModal}
          selectedPost={selectedPost}
          props={props}
        />
      ) : null}
    </SafeAreaView>
  );
};
export default Discover;
