import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  ActionSheetIOS,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  View,
  Text,
} from "react-native";
import { Header } from "../../Components/header/header";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { API } from "../../services/api.services";
import RenderJob from "../../Components/renderMethods/job";
import JobModal from "../../Components/modals/jobModal";
import { JobListingStyle as styles } from "./jobListing.style";

const JobListing = (props) => {
  const [job, setJob] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getJobList();
  }, []);

  const getJobList = async () => {
    let j = await API.myJobListings();
    setJob(j);
  };

  const deleteJobListing = async (item) => {
    let jobId = item.id;
    await API.deleteJobListing(jobId);
    getJobList();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getJobList().then(() => setRefreshing(false));
  }, []);

  const showActionSheet = (item) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "View", "Applicants", "Edit", "End Listing"],
        destructiveButtonIndex: 4,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setShowModal(true);
        } else if (buttonIndex === 2) {
          props.navigation.navigate("JobApplicants", item);
        } else if (buttonIndex === 3) {
          props.navigation.navigate("EditJob", item);
        } else if (buttonIndex === 4) {
          Alert.alert(
            "Delete Job Posting",
            "Are you sure you want to remove this job listing?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Delete",
                onPress: () => deleteJobListing(item),
              },
            ]
          );
        }
      }
    );
  };

  return (
    <>
      <Header
        title="My Job Listings"
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: HP(7),
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {job.length ? (
          job.map((item, i) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedJob(item);
                showActionSheet(item);
                //actionSheet.current.show();
              }}
              key={i}
            >
              <RenderJob item={item} hideBook={true} />
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
            <Text style={styles.H1}>No Job Listings</Text>
            <Text style={styles.H2}>Post a new job on the Jobs page</Text>
          </View>
        )}
      </ScrollView>
      <JobModal
        show={showModal}
        setShow={setShowModal}
        selectedJob={selectedJob}
      />
    </>
  );
};
export default JobListing;
