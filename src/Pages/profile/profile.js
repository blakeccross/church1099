import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { ProfileStyle as Styles } from "./profile.style";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../global/global.styles";
import { API } from "../../services/api.services";
import moment from "moment";
import SkeletonLoader from "expo-skeleton-loader";
import { storageServices } from "../../services/storage.services";
import { MoreOrLess } from "@rntext/more-or-less";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../root/reducer";

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
    const userID = await storageServices.fetchKey("id");
    let user = await API.getUserData(userID);
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
          style={{ width: WP(25), height: HP(17), borderRadius: 10 }}
        />
      </View>
    );
  };
  let actionSheet = useRef();
  var optionArray = ["Photo", "Video", "Cancel"];
  const showActionSheet = (item) => {
    actionSheet.current.show();
  };
  const onActionSelect = (index) => {
    if (index === 0) {
      props.navigation.navigate("AddPhoto");
    } else if (index === 1) {
      Alert.alert("Delete", "Are you sure you want to delete?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteExperience(index),
        },
      ]);
    }
  };

  return (
    <>
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
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Settings", { user })}
          style={{
            position: "absolute",
            right: WP(5),
            top: HP(7),
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
                paddingTop: HP(7),
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
              <Text
                style={{
                  ...Styles.userInfoTxt,
                  textAlign: "center",
                  marginTop: HP(1),
                }}
              >
                {user.data.header}
              </Text>
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
                <Text style={{ ...GlobalStyles.H3 }}>Skills</Text>
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
                    <Ionicons name="ios-pencil-sharp" size={23} color="black" />
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
                <Text style={{ ...GlobalStyles.H3 }}>Portfolio</Text>
                <TouchableOpacity onPress={() => showActionSheet()}>
                  <Ionicons name="ios-add-sharp" size={30} color="black" />
                </TouchableOpacity>
              </View>
              {user?.data.posts && user.data.posts?.length ? (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Portfolio", { Portfolio: ports })
                  }
                >
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    //columnWrapperStyle={{ flexWrap: 'wrap'}}
                    data={ports}
                    //numColumns={3}
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
                <Text style={{ ...GlobalStyles.H3 }}>Experience</Text>
                <View style={GlobalStyles.row}>
                  <TouchableOpacity
                    style={{ marginRight: 20 }}
                    onPress={() => props.navigation.navigate("AddExp")}
                  >
                    <Ionicons name="ios-add-sharp" size={30} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("UserExperience")}
                  >
                    <Ionicons name="ios-pencil-sharp" size={23} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              {experience && experience.length ? (
                <View style={Styles.experienceList}>
                  {experience.map((item, i) => {
                    return (
                      <View key={i} style={Styles.item}>
                        <View style={{ flexDirection: "row" }}>
                          <Image source={{ uri: item["Company Image"] }} />
                          <Text style={Styles.headingText}>{item?.title}</Text>
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
      <ActionSheet
        ref={actionSheet}
        title={"Upload a Photo"}
        options={optionArray}
        cancelButtonIndex={2}
        onPress={onActionSelect}
      />
    </>
  );
};

export default Profile;
