import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { skillsStyle as Styles } from "./discover.style";
import { API } from "../../services/api.services";
import { MaterialIcons } from "@expo/vector-icons";
import PostModal from "../../Components/modals/postModal";

const Discover = (props) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let userId = "";
    let res = await API.portfolio(userId);
    setPosts(res);
    setLoading(false);
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
      {loading ? (
        <View
          style={{
            marginTop: HP(10),
          }}
        >
          <ActivityIndicator color={"black"} size="small" />
        </View>
      ) : (
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
      )}
      <PostModal
        show={showModal}
        setShow={setShowModal}
        selectedPost={selectedPost}
        props={props}
        onPress={() => setShow(false)}
      />
    </SafeAreaView>
  );
};
export default Discover;
