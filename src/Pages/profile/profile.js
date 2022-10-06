import React, { useEffect, useState, useCallback } from "react";
import {
  ActionSheetIOS,
  Text,
  View,
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
import SkeletonLoader from "expo-skeleton-loader";
import { MoreOrLess } from "@rntext/more-or-less";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../root/reducer";
import { FlashList } from "@shopify/flash-list";

const Profile = (props) => {
  const [experience, setExperience] = useState([]);
  const [ports, setPorts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [showResume, setShowResume] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getData();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  const getData = async () => {
    let user = await API.getUserData();
    dispatch(getUser(user));
    setExperience(user.experience);
    setPorts(user.posts);
    setLoading(false);
  };

  const openLink = (url) => {
    setShowResume(true);
  };

  const renderPort = (item) => {
    return (
      <View style={Styles.portItem}>
        <Image
          source={{ uri: "https:" + item.image, cache: "force-cache" }}
          style={{ width: WP(29), height: HP(20), borderRadius: 10 }}
        />
      </View>
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
          contentContainerStyle={{ paddingBottom: HP(12) }}
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
            <SkeletonLoader boneColor="#fbfbfb" highlightColor="#f2f2f2">
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
                    paddingTop: 10,
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
              </View>

              {/*SKILLS*/}

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
                      <Ionicons name="ios-add-sharp" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("EditSkills", { data: user })
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
                          <Text style={{ color: "black", textAlign: "center" }}>
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

              {/*PORTFOLIO*/}
              <View style={{ ...Styles.panelView }}>
                <View
                  style={{
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
                {user?.data.posts && user.data.posts?.length ? (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("Portfolio", user.data)
                    }
                  >
                    <FlashList
                      estimatedItemSize={3}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={ports}
                      renderItem={({ item }) => renderPort(item)}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={Styles.empty}>
                    <Text style={Styles.emptyTxt}>
                      Show off something you've done or created
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
                      <Ionicons name="ios-add-sharp" size={30} color="black" />
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
                              {moment(item.startDate, "MMM DD, YYYY").format(
                                "MMM YYYY"
                              )}
                            </Text>
                            {item.current ? null : (
                              <Text style={Styles.description}>
                                {moment(item.endDate, "MMM DD, YYYY").format(
                                  " - MMM YYYY"
                                )}
                              </Text>
                            )}
                          </View>
                          <View style={{ marginTop: HP(1) }}>
                            <MoreOrLess numberOfLines={2}>
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
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Profile;
