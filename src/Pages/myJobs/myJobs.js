import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import fontFamily from "../../Assets/config/fontFamily";
import JobModal from "../../Components/modals/jobModal";
import { Header } from "../../Components/header/header";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { MyJobsStyle as Styles } from "./myJobs.style";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../../global/global.styles";
import { API } from "../../services/api.services";
const MyJobs = (props) => {
  const [mod, setMod] = useState(false);
  const [job, setJob] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [dropdownModal, setdropdownModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setuserData] = useState([]);
  useEffect(() => {
    getJobList();
  }, []);
  const getJobList = async () => {
    let j = await API.MyJobs();
    setJob(j);
    setLoading(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getJobList().then(() => setRefreshing(false));
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <SafeAreaView style={{ ...Styles.container }}>
        <Header title="My Jobs" onPress={() => props.navigation.goBack()} />
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
      </SafeAreaView>
    </>
  );
};
export default MyJobs;
