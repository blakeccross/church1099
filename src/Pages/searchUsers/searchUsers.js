import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { SearchStyle as Styles } from "./searchUsers.style";
import { GlobalStyles } from "../../global/global.styles";
import { API } from "../../services/api.services";
import { MaterialIcons } from "@expo/vector-icons";
import AlertService from "../../services/alertService";

const SearchUsers = ({ search, route, navigation }) => {
  const [query, setQuery] = useState(route?.params?.search);
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
  const handlePress = async (item) => {
    let user = await item._id;
    navigation.navigate("ProfileView", { user: { userId: user } });
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)} style={Styles.item}>
        {item["Profile Photo"] ? (
          <Image
            source={{
              uri: "https:" + item["Profile Photo"],
              //priority: 'low',
            }}
            resizeMode="cover"
            style={Styles.image}
          />
        ) : (
          <Image
            style={Styles.image}
            source={require("../../Assets/Imgs/dp.jpg")}
          />
        )}
        <View key={item.key} style={Styles.infoContainer}>
          <Text style={Styles.userName}>{item.Name}</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              paddingTop: 7,
            }}
          >
            {item?.Skills?.map((item, i) => {
              return (
                <View key={i} style={Styles.skillItem}>
                  <Text
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontSize: 13,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <SafeAreaView style={{ ...Styles.container }}>
        <View
          style={{
            ...GlobalStyles.row,
            justifyContent: "center",
            paddingTop: HP(1),
            paddingBottom: HP(2),
            backgroundColor: "#2b47fc",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: WP(3) }}
          >
            <Icon name={"chevron-back"} color={"white"} size={24} />
          </TouchableOpacity>
          <View style={{ ...Styles.searchSection }}>
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
              defaultValue={route?.params?.search}
              onChangeText={setQuery}
              onSubmitEditing={() => onSearch()}
            />
          </View>
        </View>
        {Loading ? (
          <View
            style={{
              marginTop: HP(10),
            }}
          >
            <ActivityIndicator color={"black"} size="small" />
          </View>
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
export default SearchUsers;
