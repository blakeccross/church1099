import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Alert,
  ActionSheetIOS,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import fontFamily from "../../Assets/config/fontFamily";
import { Header } from "../../Components/header/header";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { JobListingStyle as Styles } from "./jobListing.style";
import { GlobalStyles } from "../../global/global.styles";
import AlertService from "../../services/alertService";
import { API } from "../../services/api.services";
import RenderJob from "../../Components/renderMethods/job";
import JobModal from "../../Components/modals/jobModal";

const JobListing = (props) => {
  const [mod, setMod] = useState(false);
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
          props.navigation.navigate("JobApplicant", item);
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
        {job.map((item, i) => (
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
        ))}
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
