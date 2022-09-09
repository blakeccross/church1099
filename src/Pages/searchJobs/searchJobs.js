import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { SearchStyle as Styles } from "./search.style";
import { GlobalStyles } from "../../global/global.styles";
import { API } from "../../services/api.services";
import { MaterialIcons } from "@expo/vector-icons";
import AlertService from "../../services/alertService";

const SearchJobs = ({ route, navigation }) => {
  const [mod, setMod] = useState(false);
  const [job, setJob] = useState([]);
  const [query, setQuery] = useState(route?.params?.searchTxt);
  const [searchTxt, setSearchTxt] = useState("");
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    searchJob();
  }, []);

  const searchJob = async () => {
    setQuery(searchTxt);
    let j = await API.searchJob(query);
    setJob(j);
    setLoading(false);
  };
  const onSearch = () => {
    setLoading(true);
    if (searchTxt != "") {
      searchJob();
    } else AlertService.show("", "Enter Text to Search Something");
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
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: WP(6),
              paddingBottom: HP(5),
            }}
          >
            {job.length > 0 ? null : (
              <Text style={{ ...Styles.createTxt }}>No Jobs Available</Text>
            )}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}
            >
              {job.map((item, i) => (
                <TouchableOpacity
                  onPress={() => {
                    toggleBottomNavigationView(item);
                  }}
                  //props.navigation.navigate('JobApply', {data: item})}
                  key={i}
                  style={{
                    marginTop: HP(2),
                    borderBottomColor: "#e0e0e0",
                    borderBottomWidth: 1,
                  }}
                >
                  <View style={Styles.item}>
                    <Text style={{ ...Styles.keyTxt }}>
                      {item["Job Title"]}
                    </Text>
                    <Text
                      style={{
                        ...Styles.conTxt,
                        color: "#666666",
                        fontSize: 16,
                        paddingHorizontal: 0,
                        fontSize: 14,
                        marginTop: 2,
                      }}
                    >
                      {item?.Church}
                    </Text>
                    <Text
                      numberOfLines={3}
                      style={{
                        ...Styles.conTxt,
                        paddingHorizontal: 0,
                        fontSize: 14,
                        color: "#666666",
                        marginTop: 6,
                      }}
                    >
                      {item["Job Description"]}
                    </Text>
                    <View
                      style={{ ...GlobalStyles.row, marginVertical: HP(1) }}
                    >
                      <View
                        style={{
                          ...GlobalStyles.row,
                          backgroundColor: "white",
                          alignSelf: "flex-start",
                          paddingHorizontal: WP(3),
                          paddingVertical: HP(1),
                          borderRadius: 10,
                          justifyContent: "center",
                          backgroundColor: "#F5F5F5",
                        }}
                      >
                        <MaterialIcons
                          name="location-on"
                          size={15}
                          color={"#666666"}
                        />
                        <Text
                          style={{
                            ...Styles.conTxt,
                            paddingHorizontal: 3,
                            fontSize: 14,
                            color: "rgb(102, 102, 102)",
                          }}
                        >
                          {item?.State}
                        </Text>
                      </View>
                      {item["Remote Friendly"] && (
                        <View
                          style={{
                            ...GlobalStyles.row,
                            backgroundColor: "white",
                            alignSelf: "flex-start",
                            paddingHorizontal: WP(3),
                            paddingVertical: HP(1),
                            borderRadius: 10,
                            justifyContent: "center",
                            backgroundColor: "#F5F5F5",
                            marginLeft: 7,
                          }}
                        >
                          <MaterialIcons
                            name="wifi"
                            size={15}
                            color="#666666"
                          />
                          <Text
                            style={{
                              ...Styles.conTxt,
                              paddingHorizontal: 3,
                              fontSize: 14,
                              color: "rgb(102, 102, 102)",
                            }}
                          >
                            Remote Friendly
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};
export default SearchJobs;
