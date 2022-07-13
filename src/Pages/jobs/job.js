import React, { useEffect, useState } from "react";
import { BottomSheet } from "react-native-btr";
import JobModal from "../../Components/modals/jobModal";
import { BlurView } from "expo-blur";
import {
  Image,
  RefreshControl,
  SafeAreaView,
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
import { ChangeBackgroundColor, GetUser } from "../../root/action";
import { connect } from "react-redux";
import AlertService from "../../services/alertService";
const Job = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEmp, setEmp] = useState(true);
  const [searchTxt, setSearchTxt] = useState("");
  const [job, setJob] = useState([]);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "None", value: "" },
    { label: "Communication", value: "Communication" },
    { label: "Video", value: "Video" },
    { label: "Design", value: "Design" },
    { label: "Production", value: "Production" },
  ]);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [visible, setVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const toggleBottomNavigationView = (item) => {
    setSelectedJob(item);
    //Toggling the visibility state of the bottom sheet
    //setVisible(!visible);
    setdropdownModal(true);
  };
  const [dropdownModal, setdropdownModal] = useState(false);

  useEffect(() => {
    getJobList();
    getUser();
  }, []);
  const getJobList = async () => {
    let j = await API.JobList();
    setJob(j);
  };
  const getUser = async () => {
    let data = await API.getUser();
    props.getUser(data);
  };
  const onSearch = () => {
    if (searchTxt != "" || value != "") {
      let filteredData = job.filter(function (item) {
        if (
          item["Job Title"].toLowerCase().includes(searchTxt?.toLowerCase())// &&
          //item["Category"].toLowerCase().includes(value?.toLowerCase())
        )
          return item;
      });

      props.navigation.navigate("Search", {
        obj: filteredData,
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
            style={{...GlobalStyles.input, backgroundColor: 'white'}}
            placeholderTextColor="#666666"
            returnKeyType={"search"}
            placeholder="Search"
            onChangeText={(e) => setValue(e)}
            onSubmitEditing={() => onSearch()}
          />
        </View>
        <View style={{ width: WP(70), alignSelf: "center" }}>
          {isEmp ? (
            <View>
              <Button
                onPress={() => props.navigation.navigate("JobListing")}
                btnCol={"transparent"}
                btnTxt={"My Job Listings"}
              />
            </View>
          ) : (
            <Button btnTxt={"Post a Job-as low as $50/mo"} />
          )}
        </View>
      </BlurView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: HP(7) }}
      >
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
                toggleBottomNavigationView(item);
              }}
              //props.navigation.navigate('JobApply', {data: item})}
              key={i}
              style={{
                marginTop: HP(2),
                borderBottomColor: "#e0e0e0",
                borderBottomWidth: 1,
              }}
            >
              <View style={Styles.item}>
              <Image source={{uri: item?.Photo}} style={{...Styles.dp}} />
              <View style={{marginHorizontal: WP(4)}}>
              <Text style={{ ...Styles.keyTxt }}>{item["Job Title"]}</Text>
              <Text
                style={{ ...Styles.conTxt, color: "#666666", fontSize: 16, paddingHorizontal: 0, fontSize: 14, marginTop: 2 }}
              >
                {item?.Church}
              </Text>
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
              <View style={{...GlobalStyles.row, marginVertical: HP(1)}}>
              <View
                style={{
                  ...GlobalStyles.row,
                  backgroundColor: "white",
                  alignSelf: "flex-start",
                  paddingHorizontal: WP(3),
                  paddingVertical: HP(1),
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: '#F5F5F5'
                }}
              >
                <MaterialIcons name="location-on" size={15} color={"#666666"}/>
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
                {item['Remote Friendly'] && (
                  <View
                    style={{
                      ...GlobalStyles.row,
                      backgroundColor: "white",
                      alignSelf: "flex-start",
                      paddingHorizontal: WP(3),
                      paddingVertical: HP(1),
                      borderRadius: 10,
                      justifyContent: "center",
                      backgroundColor: '#F5F5F5',
                      marginLeft: 7,
                    }}>
                      <MaterialIcons name="wifi" size={15} color="#666666" />
                    <Text
                      style={{
                        ...Styles.conTxt,
                        paddingHorizontal: 3,
                        fontSize: 14,
                        color: 'rgb(102, 102, 102)',
                      }}>
                      Remote Friendly
                    </Text>
                  </View>
                )}
                </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {selectedJob ? (
        <JobModal
          show={dropdownModal}
          setShow={setdropdownModal}
          selectedJob={selectedJob}
        />
      ) : null}
    </View>
  );
};
const mapStateToProps = (state) => {
  const { backgroundColor } = state;
  const { user } = state;

  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeBackgroundColor: (bg) => dispatch(ChangeBackgroundColor(bg)),
    getUser: (userInfo) => dispatch(GetUser(userInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Job);
