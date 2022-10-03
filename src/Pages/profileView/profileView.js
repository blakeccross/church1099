import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { ProfileViewStyle as Styles } from "./profileView.style";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../global/global.styles";
import { API } from "../../services/api.services";
import moment from "moment";
import SkeletonLoader from "expo-skeleton-loader";
import { MoreOrLess } from "@rntext/more-or-less";
import { Button } from "../../Components/Button/Button";
import { storageServices } from "../../services/storage.services";

const ProfileView = (props) => {
  const [experience, setExperience] = useState([]);
  const [ports, setPorts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [showResume, setShowResume] = useState(false);
  const [user, setUserData] = useState("");
  const { profilePhoto, setProfilePhoto } = useState("");

  useEffect(() => {
    getData();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  const getData = async () => {
    const userId = await props.route.params.user.userId;
    let user = await API.getUserData(userId);
    setUserData(user);
    setExperience(user?.experience);
    setPorts(user?.posts);
    setLoading(false);
  };

  const openLink = (url) => {
    setShowResume(true);
  };

  const contactUser = async () => {
    let id = await storageServices.fetchKey("id");
    let convoUsers = [user._id, id];
    console.log(convoUsers);
    let res = await API.createConvo(convoUsers);
    props.navigation.replace("Convo", { data: res });
  };

  const renderPort = (item) => {
    return (
      <View style={Styles.portItem}>
        <Image
          source={{ uri: "https:" + item.image }}
          style={{ width: WP(29), height: HP(20), borderRadius: 10 }}
        />
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} />
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            position: "absolute",
            left: WP(5),
            top: HP(3),
            padding: 10,
            borderRadius: 20,
            backgroundColor: "#f4f4f5",
            zIndex: 1,
          }}
        >
          <Ionicons name="ios-chevron-back" size={20} color="black" />
        </TouchableOpacity>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              style={{ backgroundColor: "#2b47fc" }}
              tintColor="white"
            />
          }
          contentContainerStyle={{ paddingBottom: HP(8) }}
        >
          {Loading ? (
            <SkeletonLoader boneColor="#f4f4f5" highlightColor="#e3e3e3">
              <SkeletonLoader.Container
                style={[
                  {
                    flex: 1,
                    paddingTop: HP(7),
                    flexDirection: "column",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                  },
                ]}
              >
                <SkeletonLoader.Item
                  style={{
                    width: WP(30),
                    height: WP(30),
                    alignSelf: "center",
                    marginTop: HP(4),
                    borderRadius: WP(15),
                    alignSelf: "center",
                  }}
                />
                <SkeletonLoader.Container
                  style={{
                    paddingVertical: 10,
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <SkeletonLoader.Item
                    style={{ width: 220, height: 20, marginBottom: 5 }}
                  />
                  <SkeletonLoader.Item
                    style={{ width: 220, height: 20, marginBottom: 50 }}
                  />
                  <SkeletonLoader.Item
                    style={{ width: WP(100), height: HP(20), marginBottom: 10 }}
                  />
                  <SkeletonLoader.Item
                    style={{ width: WP(100), height: HP(20), marginBottom: 10 }}
                  />
                </SkeletonLoader.Container>
              </SkeletonLoader.Container>
            </SkeletonLoader>
          ) : (
            <>
              <View
                style={{
                  paddingHorizontal: WP(10),
                  backgroundColor: "white",
                }}
              >
                <Image
                  source={{ uri: "https:" + user?.profilePhoto }}
                  style={{ ...Styles.dp }}
                />
                <Text
                  style={{
                    ...GlobalStyles.H2,
                    textAlign: "center",
                    marginTop: HP(1),
                  }}
                >
                  {user?.name}
                </Text>
                <View
                  style={{
                    alignSelf: "center",
                    marginTop: HP(1),
                  }}
                >
                  <Text style={Styles.userInfoTxt}>{user?.location}</Text>
                </View>
                <Text
                  style={{
                    ...Styles.userInfoTxt,
                    textAlign: "center",
                    marginVertical: HP(1),
                  }}
                >
                  {user?.header}
                </Text>
                <Button
                  btnStyle={{ width: WP(50), alignSelf: "center" }}
                  btnTxt={"Message"}
                  onPress={() => contactUser()}
                />
                <View
                  style={{
                    width: WP(30),
                    borderRadius: 20,
                    height: 2,
                    marginVertical: HP(2),
                    backgroundColor: "#f4f4f5",
                    alignSelf: "center",
                  }}
                />
              </View>

              {/*SKILLS*/}
              {user?.skills && user?.skills?.length ? (
                <View style={{ ...Styles.panelView }}>
                  <View
                    style={{
                      marginBottom: HP(2),
                      ...GlobalStyles.row,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={Styles.sectionHeader}>Skills</Text>
                    <View style={GlobalStyles.row}></View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                    }}
                  >
                    {user?.skills?.map((item, i) => {
                      return (
                        <View key={i} style={Styles.skillItem}>
                          <Text style={{ color: "black", textAlign: "center" }}>
                            {item}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ) : null}

              {/*PORTFOLIO*/}
              {user?.posts && user.posts?.length ? (
                <View style={{ ...Styles.panelView }}>
                  <View
                    style={{
                      marginBottom: HP(2),
                      ...GlobalStyles.row,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={Styles.sectionHeader}>Portfolio</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("Portfolio", user)}
                  >
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={ports}
                      renderItem={({ item }) => renderPort(item)}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
              {/*EXPERIENCE*/}
              {experience && experience.length ? (
                <View
                  style={{
                    ...Styles.panelView,
                  }}
                >
                  <View
                    style={{
                      marginBottom: HP(0),
                      ...GlobalStyles.row,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={Styles.sectionHeader}>Experience</Text>
                  </View>
                  <View style={Styles.experienceList}>
                    {experience.map((item, i) => {
                      return (
                        <View key={i} style={Styles.item}>
                          <View style={{ flexDirection: "row" }}>
                            <Image source={{ uri: item["Company Image"] }} />
                            <Text style={Styles.headingText}>
                              {item?.title}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row", marginTop: 0 }}>
                            <Text style={Styles.description}>
                              {item.employer}
                            </Text>
                            <Text style={Styles.description}>
                              {" "}
                              · {item?.type}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row", marginTop: 0 }}>
                            <Text style={Styles.description}>
                              {moment(item["Start Date"]).format("MMM YYYY")}
                            </Text>
                            <Text style={Styles.description}>
                              {moment(item["End Date"]).format(" - MMM YYYY")}
                            </Text>
                          </View>
                          <View style={{ marginTop: HP(1) }}>
                            <MoreOrLess numberOfLines={2}>
                              {item?.description}
                            </MoreOrLess>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ) : null}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProfileView;
