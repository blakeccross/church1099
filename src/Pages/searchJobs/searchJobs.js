import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { SearchStyle as Styles } from "./search.style";
import { GlobalStyles } from "../../global/global.styles";
import { API } from "../../services/api.services";
import { MaterialIcons } from "@expo/vector-icons";
import AlertService from "../../services/alertService";
import RenderJob from "../../Components/renderMethods/job";
import JobModal from "../../Components/modals/jobModal";

const SearchJobs = ({ route, navigation }) => {
  const [job, setJob] = useState([]);
  const [searchTxt, setSearchTxt] = useState(route?.params?.searchTxt);
  const [Loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    searchJob();
  }, []);

  const searchJob = async () => {
    const query = searchTxt;
    let j = await API.searchJob(query);
    setJob(j);
    setLoading(false);
  };
  const onSearch = () => {
    setLoading(true);
    if (searchTxt != "") {
      searchJob();
    } else AlertService.show("", "Enter Text to Search Something");
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#2b47fc" }} />
      <SafeAreaView style={{ ...Styles.container }}>
        <View
          style={{
            ...GlobalStyles.row,
            justifyContent: "center",
            paddingTop: HP(1),
            paddingBottom: HP(2),
            backgroundColor: "#2b47fc",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: WP(3) }}
          >
            <Icon name={"chevron-back"} color={"white"} size={24} />
          </TouchableOpacity>
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
              value={searchTxt}
              onSubmitEditing={() => onSearch()}
            />
          </View>
        </View>
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
            {job.length > 0 ? null : (
              <View
                style={{
                  marginTop: HP(35),
                  width: WP(60),
                  alignSelf: "center",
                }}
              >
                <Text style={Styles.H1}>No Jobs Found</Text>
                <Text style={Styles.H2}>Try searching something else</Text>
              </View>
            )}
            <ScrollView showsVerticalScrollIndicator={false}>
              {job.map((item, i) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedJob(item);
                    setShowModal(true);
                  }}
                  key={i}
                >
                  <RenderJob item={item} refresh={() => searchJob()} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
        <JobModal
          show={showModal}
          setShow={setShowModal}
          selectedJob={selectedJob}
        />
      </SafeAreaView>
    </>
  );
};
export default SearchJobs;
