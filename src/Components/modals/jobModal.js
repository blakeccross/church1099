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
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../global/global.styles";
import { useEffect } from "react";

const JobModal = ({ show, setShow, selectedJob, user }) => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState("");
  console.log(saved);

  const applyForJob = async (selectedJob) => {
    setLoading(true);
    let jobId = selectedJob._id;
    await API.jobApply(jobId);
    setLoading(false);
    setShow(false);
  };
  const saveJob = async (item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    let job = item._id;
    await API.saveJob(job);
    setSaved(true);
  };
  const removeJob = async (item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    let job = item._id;
    await API.removeJob(job);
    setSaved(false);
  };
  return (
    <Modal
      animationType={"slide"}
      visible={show}
      presentationStyle={"FullScreen"}
      selectedJob={selectedJob}
      onRequestClose={() => setShow(false)}
      onBackButtonPress={() => setShow(false)}
      onBackdropPress={() => setShow(false)}
    >
      <View
        style={{
          marginHorizontal: WP(6),
          marginTop: HP(5),
          borderBottomColor: "#e0e0e0",
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => setShow(false)}
          style={{
            paddingBottom: HP(2),
          }}
        >
          <Ionicons name="ios-close-sharp" size={35} color="#333333" />
        </TouchableOpacity>
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
          <Text style={{ ...GlobalStyles.H2, marginVertical: WP(2) }}>
            {selectedJob["Job Title"]}
          </Text>
          <Text style={styles.church}>{selectedJob.Church}</Text>
          <Text style={styles.church}>Category: {selectedJob.Category}</Text>
          <View
            style={{
              ...GlobalStyles.row,
              marginVertical: HP(3),
              justifyContent: "space-between",
            }}
          >
            {selectedJob.Applicants?.includes(user._id) ? (
              <Button
                btnStyle={{ alignSelf: "center", width: WP(45) }}
                btnCol="grey"
                onPress={() => applyForJob(selectedJob)}
                btnTxt={"Remove Application"}
                disable={loading}
              />
            ) : (
              <Button
                btnStyle={{ alignSelf: "center", width: WP(45) }}
                onPress={() => applyForJob(selectedJob)}
                btnTxt={"Apply"}
                disable={loading}
              />
            )}
            {selectedJob?.Saved?.includes(user._id) ? (
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
                disable={loading}
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
                disable={loading}
              />
            )}
          </View>
          <Text style={{ ...GlobalStyles.H3 }}>Job Description</Text>
          <Text style={{ ...GlobalStyles.P1 }}>
            {selectedJob["Job Description"]}
          </Text>
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
  church: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  modView: {
    backgroundColor: "white",
    //position: "absolute",
    //bottom: "3%",
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
