import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import JobModal from "../../Components/modals/jobModal";
import { Header } from "../../Components/header/header";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { API } from "../../services/api.services";
import RenderJob from "../../Components/renderMethods/job";
import { MyJobsStyle as styles } from "./myJobs.style";
import { GlobalStyles } from "../../global/global.styles";
const MyJobs = (props) => {
  const [mod, setMod] = useState(false);
  const [job, setJob] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [option, setOption] = useState("Applied");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getJobList();
  }, [option]);

  const getJobList = async () => {
    let j = await API.MyJobs(option);
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
        <>
          <View
            style={{
              ...GlobalStyles.row,
              backgroundColor: "white",
              padding: 5,
              marginBottom: HP(1),
              borderColor: "grey",
              borderTopWidth: 1,
              //borderBottomWidth: 1,
            }}
          >
            <TouchableOpacity
              style={{
                ...styles.optionTag,
                backgroundColor: option == "Applied" ? "#2b47fc" : null,
              }}
              onPress={() => setOption("Applied")}
            >
              <Text
                style={{
                  color: option == "Applied" ? "white" : "black",
                  textAlign: "center",
                }}
              >
                Applied
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.optionTag,
                backgroundColor: option == "Saved" ? "#2b47fc" : null,
              }}
              onPress={() => setOption("Saved")}
            >
              <Text
                style={{
                  color: option == "Saved" ? "white" : "black",
                  textAlign: "center",
                }}
              >
                Saved
              </Text>
            </TouchableOpacity>
          </View>
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
              {job.length > 0 ? (
                job.map((item, i) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedJob(item);
                      setShowModal(true);
                    }}
                    key={i}
                  >
                    <RenderJob item={item} refresh={() => getJobList()} />
                  </TouchableOpacity>
                ))
              ) : (
                <View
                  style={{
                    marginTop: HP(35),
                    width: WP(60),
                    alignSelf: "center",
                  }}
                >
                  <Text style={styles.H1}>No Saved Jobs</Text>
                  <Text style={styles.H2}>
                    Saved listings will show up here
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}
      <JobModal
        show={showModal}
        setShow={setShowModal}
        selectedJob={selectedJob}
      />
    </>
  );
};
export default MyJobs;
