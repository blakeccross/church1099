import React, { Component, useState } from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { API } from "../../services/api.services";
import { HP, WP } from "../../Assets/config/screen-ratio";
import * as Haptics from "expo-haptics";
import { Button } from "../Button/Button";
import fontFamily from "../../Assets/config/fontFamily";
import { GlobalStyles } from "../../global/global.styles";
import { useEffect } from "react";
import moment from "moment";

const JobModal = ({ show, setShow, selectedJob }) => {
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setSaved(selectedJob.saved);
    setApplied(selectedJob.applied);
  }, [selectedJob]);

  const applyForJob = async (selectedJob) => {
    setLoading(true);
    let jobId = selectedJob.id;
    await API.apply(jobId);
    setApplied("yes");
    console.log(applied);
    setLoading(false);
  };
  // const removeApp = async (selectedJob) => {
  //   setLoading(true);
  //   let jobId = selectedJob.id;
  //   await API.removeApply(jobId);
  //   setLoading(false);
  //   setShow(false);
  // };
  const saveJob = async (selectedJob) => {
    setSaveLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    let job = selectedJob.id;
    await API.saveJob(job);
    setSaveLoading(false);
    setSaved(true);
  };
  const removeJob = async (selectedJob) => {
    setSaveLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    let job = selectedJob.id;
    await API.removeJob(job);
    setSaveLoading(false);
    setSaved(false);
  };
  return (
    <Modal
      animationType={"slide"}
      visible={show}
      presentationStyle={"pageSheet"}
      selectedJob={selectedJob}
      onRequestClose={() => setShow(false)}
      onBackButtonPress={() => setShow(false)}
      onBackdropPress={() => setShow(false)}
    >
      <View
        style={{
          marginHorizontal: WP(6),
          paddingVertical: HP(2),
          borderBottomColor: "#e0e0e0",
          borderBottomWidth: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "grey",
            width: 50,
            height: 5,
            borderRadius: 10,
          }}
        />
      </View>
      <View>
        <ScrollView
          renderItem={({ item }) => renderItem(item)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: WP(4),
            paddingBottom: HP(20),
          }}
        >
          <Text style={{ ...GlobalStyles.H2, marginVertical: HP(1) }}>
            {selectedJob.title}
          </Text>
          <Text style={styles.subTxt}>{selectedJob.church}</Text>
          <Text style={styles.subTxt}>Category: {selectedJob.category}</Text>
          <Text
            style={{
              ...styles.subTxt,
              color: "grey",
              marginVertical: HP(1),
              fontSize: 14,
            }}
          >
            {moment(selectedJob.postDate, "MMM DD, YYYY h:mm a")
              .startOf("day")
              .fromNow()}
            <Text> • {selectedJob.applicants} applicants</Text>
          </Text>
          <View
            style={{
              ...GlobalStyles.row,
              marginVertical: HP(3),
              justifyContent: "space-between",
            }}
          >
            {applied == "yes" ? (
              <Text style={styles.appliedTxt}>Application sent!</Text>
            ) : (
              <Button
                btnStyle={{ alignSelf: "center", width: WP(45) }}
                onPress={() => applyForJob(selectedJob)}
                btnTxt={"Apply"}
                disable={loading}
              />
            )}
            {saved ? (
              <Button
                btnStyle={{
                  alignSelf: "center",
                  width: WP(45),
                  borderWidth: 2,
                  borderColor: "#2b47fc",
                }}
                textCol={"#2b47fc"}
                btnCol={"white"}
                onPress={() => removeJob(selectedJob)}
                btnTxt={"Saved"}
                loadCol={"#2b47fc"}
                disable={saveLoading}
              />
            ) : (
              <Button
                btnStyle={{
                  alignSelf: "center",
                  width: WP(45),
                  borderWidth: 2,
                  borderColor: "#2b47fc",
                }}
                textCol={"#2b47fc"}
                btnCol={"white"}
                onPress={() => saveJob(selectedJob)}
                btnTxt={"Save"}
                loadCol={"#2b47fc"}
                disable={saveLoading}
              />
            )}
          </View>
          <Text style={{ ...GlobalStyles.H3 }}>Job Description</Text>
          <Text style={{ ...GlobalStyles.P1 }}>{selectedJob.description}</Text>
        </ScrollView>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  subTxt: {
    fontSize: 16,
    color: "#333333",
  },
  appliedTxt: {
    fontSize: 16,
    color: "#2b47fc",
    fontFamily: fontFamily.bold,
    textAlign: "center",
    width: WP(45),
  },
  modView: {
    backgroundColor: "white",
    paddingVertical: HP(1),
    paddingHorizontal: WP(5),
    alignSelf: "center",
    borderRadius: 15,
  },
  item: {
    borderBottomWidth: 0.5,
    height: HP(6),
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skillText: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
    paddingHorizontal: 10,
  },
  jobTxt: {
    color: "#333333",
    fontSize: 30,
    fontFamily: fontFamily.bold,
  },
});

//make this component available to the app
export default JobModal;
