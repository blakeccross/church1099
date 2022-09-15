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
import fontFamily from "../../Assets/config/fontFamily";
import JobModal from "../../Components/modals/jobModal";
import { Header } from "../../Components/header/header";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { MyJobsStyle as Styles } from "./myJobs.style";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../../global/global.styles";
import { API } from "../../services/api.services";
import RenderJob from "../../Components/renderMethods/job";
const MyJobs = (props) => {
  const [mod, setMod] = useState(false);
  const [job, setJob] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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
          contentContainerStyle={{
            paddingBottom: HP(7),
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              paddingHorizontal: WP(5),
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
      {selectedJob ? (
        <JobModal
          show={showModal}
          setShow={setShowModal}
          selectedJob={selectedJob}
        />
      ) : null}
    </>
  );
};
export default MyJobs;
