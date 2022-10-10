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
import { MoreOrLess } from "@rntext/more-or-less";
import { Button } from "../../Components/Button/Button";
import { storageServices } from "../../services/storage.services";
import SegmentedControlTab from "react-native-segmented-control-tab";
import EmptyProfile from "../profile/emptyProfile";
import Post from "../../Components/renderMethods/post";

const ProfileView = (props) => {
  const [experience, setExperience] = useState([]);
  const [ports, setPorts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [showResume, setShowResume] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [user, setUserData] = useState("");
  const { profilePhoto, setProfilePhoto } = useState("");
  const scrollViewRef = React.useRef();

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
    let res = await API.portfolio(userId);
    setPorts(res);
    setUserData(user);
    setExperience(user?.experience);
    setLoading(false);
  };

  const handleIndexChange = (index) => {
    setPageIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * WP(100),
      animation: false,
    });
  };

  const handleOnScroll = (event) => {
    let scrollIndex = event.nativeEvent.contentOffset.x / WP(100);
    setScrollIndex(scrollIndex);
    if (scrollIndex === 0) {
      setPageIndex(0);
    }
    if (scrollIndex === 1) {
      setPageIndex(1);
    }
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
      <Post
        selectedPost={item}
        props={props}
        setLoading={setLoading}
        //loading={loading}
        //handleDelete={handleDelete}
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
          contentContainerStyle={{ paddingBottom: HP(12), minHeight: HP(100) }}
        >
          {Loading ? (
            <EmptyProfile />
          ) : (
            <View style={{ minHeight: HP(100) }}>
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
                  btnStyle={{
                    width: 130,
                    height: 40,
                    alignSelf: "center",
                    borderWidth: 1,
                    borderColor: "#666666",
                    padding: 10,
                    marginTop: HP(1),
                  }}
                  btnCol={"transparent"}
                  textCol={"#333333"}
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

                <SegmentedControlTab
                  values={["About", "Portfolio"]}
                  borderRadius={20}
                  tabsContainerStyle={{
                    width: WP(50),
                    alignSelf: "center",
                    height: 40,
                    marginBottom: HP(2),
                  }}
                  tabStyle={{
                    borderWidth: 0,
                    borderColor: "white",
                  }}
                  tabTextStyle={{ color: "#666666" }}
                  activeTabStyle={{
                    borderRadius: 20,
                    backgroundColor: "#2b47fc",
                    color: "black",
                  }}
                  selectedIndex={pageIndex}
                  onTabPress={(index) => handleIndexChange(index)}
                />
              </View>
              <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ flexGrow: 1 }}
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                onScroll={(e) => handleOnScroll(e)}
                showsHorizontalScrollIndicator={false}
              >
                <View style={{ width: WP(100) }}>
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
                              <Text
                                style={{ color: "black", textAlign: "center" }}
                              >
                                {item}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
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
                                <Image
                                  source={{ uri: item["Company Image"] }}
                                />
                                <Text style={Styles.headingText}>
                                  {item?.title}
                                </Text>
                              </View>
                              <View
                                style={{ flexDirection: "row", marginTop: 0 }}
                              >
                                <Text style={Styles.description}>
                                  {item.employer}
                                </Text>
                                <Text style={Styles.description}>
                                  {" "}
                                  · {item?.type}
                                </Text>
                              </View>
                              <View
                                style={{ flexDirection: "row", marginTop: 0 }}
                              >
                                <Text style={Styles.description}>
                                  {moment(item["Start Date"]).format(
                                    "MMM YYYY"
                                  )}
                                </Text>
                                <Text style={Styles.description}>
                                  {moment(item["End Date"]).format(
                                    " - MMM YYYY"
                                  )}
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
                </View>
                {/*PORTFOLIO*/}
                {user?.posts && user.posts?.length ? (
                  <View
                    style={{
                      ...Styles.panelView,
                      paddingHorizontal: 0,
                      width: WP(100),
                      maxHeight: scrollIndex > 0 ? null : 150,
                    }}
                  >
                    <View
                      style={{
                        paddingHorizontal: WP(4),
                        marginBottom: HP(2),
                        ...GlobalStyles.row,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={Styles.sectionHeader}>Portfolio</Text>
                    </View>
                    <FlatList
                      data={ports}
                      scrollEnabled={false}
                      renderItem={({ item }) => renderPort(item)}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                ) : null}
              </ScrollView>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProfileView;
