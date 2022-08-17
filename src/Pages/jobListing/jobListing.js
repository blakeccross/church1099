import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import fontFamily from "../../Assets/config/fontFamily";
import { Header } from "../../Components/header/header";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { JobListingStyle as Styles } from "./jobListing.style";
import { GlobalStyles } from "../../global/global.styles";
import { API } from "../../services/api.services";
const JobListing = (props) => {
  const [mod, setMod] = useState(false);
  const [job, setJob] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  useEffect(() => {
    getJobList();
  }, []);
  const getJobList = async () => {
    let j = await API.JobList();
    setJob(j);
  };
  let actionSheet = useRef();
  var optionArray = ["View", "Applicants", "Edit", "End Listing", "Cancel"];
  const showActionSheet = (item) => {
    //To show the Bottom ActionSheet
    actionSheet.current.show();
    setSelectedJob(item);
    //console.log({item: item})
  };
  const onActionSelect = (index) => {
    if (index === 0) {
      props.navigation.navigate("JobApply", { data: selectedJob });
    } else if (index === 1) {
      props.navigation.navigate("JobApplicant", { data: selectedJob });
    } else if (index === 2) {
      props.navigation.navigate("EditJob", { item: selectedJob });
    } else if (index === 3) {
      props.navigation.navigate("JobApplicant", { data: item });
    }
  };
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <SafeAreaView style={{ ...Styles.container }}>
        <Header
          title="My Job Listings"
          onPress={() => props.navigation.goBack()}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: WP(6),
            paddingBottom: HP(5),
          }}
        >
          {job.map((item, key) => (
            <TouchableOpacity
              onPress={() => showActionSheet(item)}
              key={key}
              style={{
                paddingVertical: HP(2),
              }}
            >
              <View
                style={{
                  ...GlobalStyles.row,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...Styles.titleTxt }}>{item["Job Title"]}</Text>
              </View>
              <View style={Styles.applicantViewContainer}>
                <Text
                  style={{
                    ...Styles.createTxt,
                    fontSize: 14,
                    color: "#666666",
                  }}
                >
                  {item?.Category}
                </Text>
              </View>
              <Text
                numberOfLines={4}
                style={{
                  ...Styles.createTxt,
                  fontSize: 14,
                  color: "#666666",
                  paddingTop: HP(1),
                  fontFamily: fontFamily.light,
                }}
              >
                {item["Job Description"]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ActionSheet
          ref={actionSheet}
          // Title of the Bottom Sheet
          title={"What would you like to do?"}
          // Options Array to show in bottom sheet
          options={optionArray}
          // Define cancel button index in the option array
          // This will take the cancel option in bottom
          // and will highlight it
          cancelButtonIndex={4}
          // Highlight any specific option
          destructiveButtonIndex={3}
          //data={item}
          //setJob={item}
          onPress={onActionSelect}
          // Clicking on the option will give you alert
          //alert(optionArray[index]);
          //}}
        />
      </SafeAreaView>
    </>
  );
};
export default JobListing;
