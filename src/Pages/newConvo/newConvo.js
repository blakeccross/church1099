import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Header } from "../../Components/header/header";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../../global/global.styles";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { API } from "../../services/api.services";
import styles from "./newConvo.styles";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { storageServices } from "../../services/storage.services";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const NewConvo = (props) => {
  const [query, setQuery] = useState("");
  const [userlist, setUserlist] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    getUsersList();
  }, []);
  const getUsersList = async () => {
    let data = await API.searchUsers(query);
    setUserlist(data);
    setLoading(false);
  };
  const onSearch = () => {
    setLoading(true);
    getUsersList();
  };

  const checkConversation = async (item) => {
    let id = await storageServices.fetchKey("id");
    let convoUsers = [item.id, id];
    let res = await API.createConvo(convoUsers);
    //let data = { ...item, ...res };
    props.navigation.replace("Convo", { data: res });
  };

  const renderItem = (item) => {
    return (
      <Pressable
        onPress={() => checkConversation(item)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
          },
          styles.item,
        ]}
      >
        {item.profilePhoto ? (
          <Image
            source={{
              uri: "https:" + item.profilePhoto,
            }}
            resizeMode="cover"
            style={styles.image}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("../../Assets/Imgs/dp.jpg")}
          />
        )}
        <View key={item.key} style={styles.infoContainer}>
          <Text style={styles.userName}>{item.name}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <SafeAreaView style={{ ...styles.container }}>
        <Header title="New Message" onPress={() => props.navigation.goBack()} />
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchText}>To</Text>
          <View style={{ ...styles.searchSection }}>
            <MaterialIcons
              style={GlobalStyles.searchIcon}
              name="search"
              size={20}
              color="#666666"
            />
            <TextInput
              style={{ ...GlobalStyles.input, backgroundColor: "white" }}
              placeholderTextColor="#666666"
              returnKeyType={"search"}
              placeholder="Search"
              onChangeText={(e) => setQuery(e)}
              onSubmitEditing={() => onSearch()}
            />
          </View>
        </View>
        {Loading ? (
          <>
            {Array.apply(null, { length: 8 }).map((e, i) => (
              <View style={styles.item} key={i}>
                <ShimmerPlaceHolder
                  LinearGradient={LinearGradient}
                  style={{ ...styles.image }}
                />
                <ShimmerPlaceHolder
                  LinearGradient={LinearGradient}
                  style={{ marginHorizontal: WP(4) }}
                />
              </View>
            ))}
          </>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={userlist}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default NewConvo;
