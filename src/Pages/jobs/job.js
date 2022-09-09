import React, { useEffect, useState, useCallback } from "react";
import JobModal from "../../Components/modals/jobModal";
import { BlurView } from "expo-blur";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
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
import AlertService from "../../services/alertService";
import * as Haptics from "expo-haptics";
import { useSelector } from "react-redux";
import RenderJob from "../../Components/renderMethods/job";

const Job = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [job, setJob] = useState([]);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
  const [refreshing, setRefreshing] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getJobList();
  }, [showModal]);

  const getJobList = async () => {
    let data = await API.getJobs();
    setJob(data);
    setLoading(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getJobList().then(() => setRefreshing(false));
  }, []);

  const bookmark = async (item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    let job = item.id;
    await API.saveJob(job);
    getJobList();
  };
  const removeJob = async (item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    let job = item.id;
    await API.removeJob(job);
    getJobList();
  };
  const onSearch = () => {
    if (searchTxt != "" || value != "") {
      let filteredData = job.filter(function (item) {
        if (
          item.title.toLowerCase().includes(searchTxt?.toLowerCase()) // &&
          //item["Category"].toLowerCase().includes(value?.toLowerCase())
        )
          return item;
      });
      props.navigation.navigate("SearchJobs", {
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
        <View
          style={{
            ...GlobalStyles.row,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              ...GlobalStyles.row,
              paddingVertical: 12,
              justifyContent: "center",
              width: WP(40),
            }}
            onPress={() => props.navigation.navigate("JobListing")}
          >
            <MaterialCommunityIcons name="briefcase" size={18} color="white" />
            <Text style={Styles.myJobsTxt}>My Listings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...GlobalStyles.row,
              paddingVertical: 12,
              justifyContent: "center",
              width: WP(40),
            }}
            onPress={() => {
              props.navigation.navigate("MyJobs");
            }}
          >
            <MaterialIcons name="bookmark" size={18} color="white" />
            <Text style={Styles.myJobsTxt}>Saved</Text>
          </TouchableOpacity>
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
                  setShowModal(true);
                }}
                key={i}
              >
                <RenderJob item={item} refresh={() => getJobList()} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      <JobModal
        show={showModal}
        setShow={setShowModal}
        selectedJob={selectedJob}
      />
    </View>
  );
};

export default Job;
