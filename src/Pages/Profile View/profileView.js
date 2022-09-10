import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  SafeAreaView,
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
import { ProfileViewStyle as Styles } from "./profileView.style";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../global/global.styles";
import { API } from "../../services/api.services";
import Dropdown from "../../Components/dropdown/dropdown";
import { Button } from "../../Components/Button/Button";
import moment from "moment";
import SkeletonLoader from "expo-skeleton-loader";
import { storageServices } from "../../services/storage.services";
import { MoreOrLess } from "@rntext/more-or-less";

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

  const renderPort = (item) => {
    return (
      <View style={Styles.portItem}>
        <Image
          source={{ uri: "https:" + item.image }}
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
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{
          position: "absolute",
          left: WP(5),
          top: HP(7),
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
                paddingTop: HP(7),
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
                  marginTop: HP(1),
                }}
              >
                {user?.header}
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
            {user?.skills && user?.skills?.length ? (
              <View style={{ ...Styles.panelView }}>
                <View
                  style={{
                    marginBottom: HP(2),
                    ...GlobalStyles.row,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ ...GlobalStyles.H3 }}>Skills</Text>
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
                  <Text style={{ ...GlobalStyles.H3 }}>Portfolio</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Portfolio", { Portfolio: ports })
                  }
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
                  <Text style={{ ...GlobalStyles.H3 }}>Experience</Text>
                </View>
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
              </View>
            ) : null}
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

export default ProfileView;
