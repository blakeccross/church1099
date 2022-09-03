import React, { useEffect, useState, useCallback } from "react";
import { BottomSheet } from "react-native-btr";
import JobModal from "../../Components/modals/jobModal";
import SubscribeModal from "../../Components/modals/subscribeModal";
import { BlurView } from "expo-blur";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Button } from "../../Components/Button/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../../global/global.styles";
import { JobStyle as Styles } from "./job.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API } from "../../services/api.services";
import { ChangeBackgroundColor, GetUser } from "../../root/action";
import { connect } from "react-redux";
import AlertService from "../../services/alertService";
import * as Haptics from "expo-haptics";
import { Input } from "../../Components/Input/Input";

const Job = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEmp, setEmp] = useState("");
  const [searchTxt, setSearchTxt] = useState("");
  const [job, setJob] = useState([]);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [open, setOpen] = useState(false);
  const [dropdownModal, setdropdownModal] = useState(false);
  const [subscribeModal, setSubscribeModal] = useState(true);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "None", value: "" },
    { label: "Communication", value: "Communication" },
    { label: "Video", value: "Video" },
    { label: "Design", value: "Design" },
    { label: "Production", value: "Production" },
  ]);
  const [userData, setuserData] = useState([]);
  const [myJob, setMyJob] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    getJobList();
    getUser();
  }, []);
  const getJobList = async () => {
    let j = await API.JobList();
    setJob(j);
    setLoading(false);
  };
  const getUser = async () => {
    let data = await API.getUser();
    props.getUser(data);
    setMyJob(data.myJobs);
    setEmp(data["Employer?"]);
    setuserData(data);
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getJobList().then(() => setRefreshing(false));
  }, []);
  const bookmark = async (item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    let job = item._id;
    await API.saveJob(job);
    getJobList();
  };
  const removeJob = async (item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    let job = item._id;
    await API.removeJob(job);
    getJobList();
  };
  const onSearch = () => {
    if (searchTxt != "" || value != "") {
      let filteredData = job.filter(function (item) {
        if (
          item["Job Title"].toLowerCase().includes(searchTxt?.toLowerCase()) // &&
          //item["Category"].toLowerCase().includes(value?.toLowerCase())
        )
          return item;
      });
      props.navigation.navigate("Search", {
        obj: filteredData,
        searchTxt: searchTxt,
      });
    } else AlertService.show("", "Enter Text to Search Something");
  };
  return (
    <View style={{ ...Styles.container }}>
      <BlurView intensity={0} style={{ backgroundColor: "#2b47fc" }}>
        <View
          style={{
            ...GlobalStyles.row,
            justifyContent: "space-between",
            marginHorizontal: WP(4),
            marginTop: HP(7),
          }}
        >
          <Text style={{ ...GlobalStyles.H1, color: "white" }}>Jobs</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("CreateJob")}
          >
            <MaterialCommunityIcons name={"plus"} color={"white"} size={30} />
          </TouchableOpacity>
        </View>
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
            onChangeText={setSearchTxt}
            onSubmitEditing={() => onSearch()}
          />
        </View>
        <View style={{ width: WP(70), alignSelf: "center" }}>
          {isEmp ? (
            <View>
              <Button
                onPress={() => props.navigation.navigate("JobListing")}
                btnTxt={"My Job Listings"}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={{
                ...GlobalStyles.row,
                paddingVertical: 12,
                justifyContent: "center",
              }}
              onPress={() => {
                props.navigation.navigate("MyJobs");
              }}
            >
              <MaterialIcons name="bookmark" size={18} color="white" />
              <Text style={Styles.myJobsTxt}>My Jobs</Text>
            </TouchableOpacity>
          )}
        </View>
      </BlurView>
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: HP(7) }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              paddingHorizontal: WP(5),
              paddingBottom: HP(5),
              backgroundColor: "white",
            }}
          >
            {job.map((item, i) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedJob(item);
                  setdropdownModal(true);
                }}
                key={i}
                style={{
                  paddingVertical: HP(2),
                  borderBottomColor: "#e0e0e0",
                  borderBottomWidth: 1,
                }}
              >
                <View style={Styles.item}>
                  <View style={GlobalStyles.row}>
                    {item?.Photo && (
                      <Image
                        source={{ uri: "https:" + item?.Photo }}
                        style={{ ...Styles.dp }}
                      />
                    )}
                    <View style={{ marginRight: WP(4), flex: 1 }}>
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
                    </View>
                    <View style={{ position: "absolute", right: 0 }}>
                      {item.Saved?.includes(userData._id) ? (
                        <TouchableOpacity onPress={() => removeJob(item)}>
                          <MaterialIcons
                            name="bookmark"
                            size={28}
                            color="blue"
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={() => bookmark(item)}>
                          <MaterialIcons
                            name="bookmark-outline"
                            size={28}
                            color="grey"
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <View style={{ marginRight: WP(4) }}>
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
                    {item["Applicants"]?.length && (
                      <Text
                        style={{
                          ...Styles.applicants,
                          paddingHorizontal: 3,
                          marginBottom: HP(1),
                          fontSize: 14,
                        }}
                      >
                        {item["Applicants"]?.length} applicants
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      {selectedJob ? (
        <JobModal
          show={dropdownModal}
          setShow={setdropdownModal}
          selectedJob={selectedJob}
          user={userData}
        />
      ) : null}
      <SubscribeModal show={false} setShow={false} />
    </View>
  );
};
const mapStateToProps = (state) => {
  const { backgroundColor } = state;
  const { user } = state;
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeBackgroundColor: (bg) => dispatch(ChangeBackgroundColor(bg)),
    getUser: (userInfo) => dispatch(GetUser(userInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Job);
