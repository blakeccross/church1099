import React, { useEffect, useState, useCallback } from "react";
import JobModal from "../../Components/modals/jobModal";
import {
  ActivityIndicator,
  RefreshControl,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../../global/global.styles";
import { JobStyle as Styles } from "./job.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API } from "../../services/api.services";
import AlertService from "../../services/alertService";
import RenderJob from "../../Components/renderMethods/job";
import { StatusBar } from "expo-status-bar";
import NewOrgModal from "../../Components/modals/newOrgModal";
import { useSelector } from "react-redux";

const Job = (props) => {
  const [searchTxt, setSearchTxt] = useState("");
  const [job, setJob] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showNewOrgModal, setShowNewOrgModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState("");
  const user = useSelector((state) => state.user.data);

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

  const onSearch = () => {
    if (searchTxt != "") {
      let filteredData = job.filter(function (item) {
        if (item.title.toLowerCase().includes(searchTxt?.toLowerCase()))
          return item;
      });
      props.navigation.navigate("SearchJobs", {
        obj: filteredData,
        searchTxt: searchTxt,
      });
    } else AlertService.show("Not so fast", "Enter Text to Search Something");
  };

  const handleCreateJob = () => {
    if (user.organizations.length > 0) {
      props.navigation.navigate("CreateJob");
    } else {
      setShowNewOrgModal(true);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <SafeAreaView style={{ ...Styles.container }}>
        <View style={{ backgroundColor: "#F4F4F5" }}>
          <View style={{ backgroundColor: "#2b47fc" }}>
            <View
              style={{
                ...GlobalStyles.row,
                justifyContent: "space-between",
                marginHorizontal: WP(4),
                marginTop: HP(2),
              }}
            >
              <Text style={{ ...GlobalStyles.H1, color: "white" }}>Jobs</Text>
              <TouchableOpacity onPress={handleCreateJob}>
                <MaterialCommunityIcons
                  name={"plus"}
                  color={"white"}
                  size={30}
                />
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
                <MaterialCommunityIcons
                  name="briefcase"
                  size={18}
                  color="white"
                />
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
          </View>
          {loading ? (
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
                  paddingBottom: HP(5),
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
          <NewOrgModal
            show={showNewOrgModal}
            setShow={setShowNewOrgModal}
            props={props}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Job;
