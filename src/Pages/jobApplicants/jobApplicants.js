import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styles from "./jobApplicants.styles";
import { API } from "../../services/api.services";
import { Header } from "../../Components/header/header";

const JobApplicants = ({ navigation, route }) => {
  var data = route.params;
  const [applicants, setapplicants] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setloading(true);
    const jobId = data.id;
    let res = await API.getApplicantList(jobId);
    setapplicants(res);
    setloading(false);
  };

  const noApplicants = () => {
    <Text style={styles.conditionText}>No applicants</Text>;
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("ProfileView", { user: { userId: item._id } })
        }
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.image}
            source={{ uri: "https:" + item.profilePhoto }}
          />
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              marginLeft: 10,
            }}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.viewProfile}>
          <Text style={styles.viewProfileText}>View Profile</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <Header title="Applicants" onPress={() => navigation.goBack()} />
      {loading ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator color={"black"} size={"large"} />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.flatlist}
          //numColumns={2}
          data={applicants}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={noApplicants}
        />
      )}
    </>
  );
};

export default JobApplicants;
