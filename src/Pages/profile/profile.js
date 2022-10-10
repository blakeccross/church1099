import React, { useEffect, useState, useCallback } from "react";
import {
  ActionSheetIOS,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { ProfileStyle as Styles } from "./profile.style";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../global/global.styles";
import { API } from "../../services/api.services";
import moment from "moment";
import { MoreOrLess } from "@rntext/more-or-less";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../root/reducer";
import SegmentedControlTab from "react-native-segmented-control-tab";
import Post from "../../Components/renderMethods/post";
import EmptyProfile from "./emptyProfile";

const Profile = (props) => {
  const [experience, setExperience] = useState([]);
  const [ports, setPorts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = React.useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  const getData = async () => {
    let user = await API.getUserData();
    let res = await API.portfolio(user._id);
    setPorts(res);
    dispatch(getUser(user));
    setExperience(user.experience);
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

  const showActionSheet = (item) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Photo", "Video"],
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          props.navigation.navigate("AddPhoto");
        } else if (buttonIndex === 2) {
          props.navigation.navigate("AddVideo");
        }
      }
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} />
      <SafeAreaView>
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
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Settings", { user })}
            style={{
              position: "absolute",
              right: WP(5),
              top: HP(2),
              padding: 10,
              borderRadius: 20,
              backgroundColor: "#f4f4f5",
              zIndex: 1,
            }}
          >
            <Text>Settings</Text>
          </TouchableOpacity>
          {Loading ? (
            <EmptyProfile />
          ) : (
            <>
              <View
                style={{
                  paddingHorizontal: WP(10),
                  backgroundColor: "white",
                }}
              >
                {user.data.profilePhoto ? (
                  <Image
                    source={{ uri: "https:" + user.data.profilePhoto }}
                    style={{ ...Styles.dp }}
                  />
                ) : (
                  <Image
                    style={Styles.dp}
                    source={require("../../Assets/Imgs/dp.jpg")}
                  />
                )}
                <Text
                  style={{
                    ...GlobalStyles.H2,
                    textAlign: "center",
                    marginTop: HP(1),
                  }}
                >
                  {user.data.name}
                </Text>
                <View
                  style={{
                    alignSelf: "center",
                    marginTop: HP(1),
                  }}
                >
                  <Text style={Styles.userInfoTxt}>{user.data.location}</Text>
                </View>
                {user.data.header ? (
                  <Text
                    style={{
                      ...Styles.userInfoTxt,
                      textAlign: "center",
                      marginTop: HP(1),
                    }}
                  >
                    {user.data.header}
                  </Text>
                ) : null}
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
              {/*SKILLS*/}
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
                  <View style={{ ...Styles.panelView }}>
                    <View
                      style={{
                        marginBottom: HP(2),
                        ...GlobalStyles.row,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={Styles.sectionHeader}>Skills</Text>
                      <View style={GlobalStyles.row}>
                        <TouchableOpacity
                          style={{ marginRight: 20 }}
                          onPress={() => props.navigation.navigate("Skills")}
                        >
                          <Ionicons
                            name="ios-add-sharp"
                            size={30}
                            color="black"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate("EditSkills", {
                              data: user,
                            })
                          }
                        >
                          <Ionicons
                            name="ios-pencil-sharp"
                            size={23}
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {user?.data.skills && user?.data.skills?.length ? (
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                        }}
                      >
                        {user?.data.skills?.map((item, i) => {
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
                    ) : (
                      <View style={Styles.empty}>
                        <Text style={Styles.emptyTxt}>
                          Add skills so employers can see what you're good at
                        </Text>
                      </View>
                    )}
                  </View>

                  {/*EXPERIENCE*/}
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
                      <View style={GlobalStyles.row}>
                        <TouchableOpacity
                          style={{ marginRight: 20 }}
                          onPress={() => props.navigation.navigate("AddExp")}
                        >
                          <Ionicons
                            name="ios-add-sharp"
                            size={30}
                            color="black"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate("UserExperience")
                          }
                        >
                          <Ionicons
                            name="ios-pencil-sharp"
                            size={23}
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {experience && experience.length ? (
                      <>
                        {experience.map((item, i) => {
                          return (
                            <View key={i} style={Styles.experienceItem}>
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
                                  {moment(
                                    item.startDate,
                                    "MMM DD, YYYY"
                                  ).format("MMM YYYY")}
                                </Text>
                                {item.current ? null : (
                                  <Text style={Styles.description}>
                                    {moment(
                                      item.endDate,
                                      "MMM DD, YYYY"
                                    ).format(" - MMM YYYY")}
                                  </Text>
                                )}
                              </View>
                              <View style={{ marginTop: HP(1) }}>
                                <MoreOrLess
                                  numberOfLines={2}
                                  textButtonStyle={{ color: "black" }}
                                >
                                  {item?.description}
                                </MoreOrLess>
                              </View>
                            </View>
                          );
                        })}
                      </>
                    ) : (
                      <View style={Styles.empty}>
                        <Text style={Styles.emptyTxt}>
                          Show some relevant work experience
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

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
                    <TouchableOpacity onPress={() => showActionSheet()}>
                      <Ionicons name="ios-add-sharp" size={30} color="black" />
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={ports}
                    scrollEnabled={false}
                    renderItem={({ item }) => renderPort(item)}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </ScrollView>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Profile;
